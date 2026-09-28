import { Resend } from "resend";
import { ContactSubmission } from "@/emails/ContactSubmission";
import {
  parseContactPayload,
  validateContact,
  type ContactErrors,
} from "@/lib/contact";
import { site } from "@/content/site";

/**
 * Contact form transport.
 *
 * The form POSTs here, this validates again from scratch, and Resend delivers
 * the result to one inbox with `replyTo` set to the sender — so replying to the
 * notification reaches the person who filled the form, and no CRM sits between.
 */

// Reads the request and talks to a third party, so it must never be prerendered.
export const dynamic = "force-dynamic";

type Payload = { ok: true } | { error: string; fields?: ContactErrors };

function json(body: Payload, status: number) {
  return Response.json(body, { status });
}

/* -------------------------------------------------------------------------
   Rate limiting

   In-memory and therefore per-instance: a serverless deployment that scales to
   four instances allows four times this budget, and a cold start clears it.
   That is the honest tradeoff for keeping the dependency count at zero — it
   stops a script hammering one endpoint, not a determined distributed abuser.
   Swap the two functions below for Upstash or Vercel KV if that day comes.
-------------------------------------------------------------------------- */

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  // The left-most entry is the original client; the rest are proxies.
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // The map would otherwise grow for the life of the instance.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}

export async function POST(request: Request) {
  // Constructed per request, not at module scope: `new Resend()` throws when
  // the key is missing, which would take down the build rather than one route.
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey || !from) {
    console.error(
      "[contact] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL — see .env.example",
    );
    return json(
      { error: "The form is not configured to send yet. Email me directly." },
      500,
    );
  }

  if (rateLimited(clientKey(request))) {
    return json(
      { error: "That is a few too many in a row. Try again later, or email me." },
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "That request could not be read." }, 400);
  }

  // Honeypot: a field hidden from people and irresistible to form bots. Answer
  // 200 so the bot records a success and does not come back to retry.
  if (typeof (body as Record<string, unknown>)?.company === "string" &&
      (body as Record<string, unknown>).company !== "") {
    return json({ ok: true }, 200);
  }

  const fields = parseContactPayload(body);
  if (!fields) {
    return json({ error: "That request could not be read." }, 400);
  }

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return json({ error: "Some fields need another look.", fields: errors }, 422);
  }

  const submittedAt = new Date().toISOString();
  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: fields.email.trim(),
    subject: `New enquiry — ${fields.name.trim()}`,
    react: ContactSubmission({ ...fields, submittedAt }),
    // Plain-text alternative. Clients that refuse HTML still get the whole
    // submission, and having one measurably helps deliverability.
    text: [
      `New enquiry via mark-v.dev`,
      ``,
      `From:     ${fields.name.trim()}`,
      `Email:    ${fields.email.trim()}`,
      `Building: ${fields.building.trim()}`,
      ``,
      `Problem to solve:`,
      fields.problem.trim(),
      ...(fields.detail.trim() ? [``, `Anything else:`, fields.detail.trim()] : []),
      ``,
      `Budget:   ${fields.budget || "Not specified"}`,
      `Received: ${submittedAt}`,
    ].join("\n"),
  });

  if (error) {
    // Resend reports API failures in the payload rather than by throwing, so
    // this branch is the one that actually catches a bad key or domain.
    console.error("[contact] Resend refused the send:", error);
    return json(
      { error: "The message did not send. Email me directly and I will see it." },
      502,
    );
  }

  console.log(`[contact] Sent ${data?.id} for ${fields.email.trim()}`);
  return json({ ok: true }, 200);
}
