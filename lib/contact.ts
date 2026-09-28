/**
 * The contact form's shape and rules, shared by the client form and the route
 * handler. The browser copy is a convenience — the server runs the same checks
 * on its own, because nothing arriving over the wire can be trusted to have
 * been through the form at all.
 */

export type ContactFields = {
  name: string;
  email: string;
  building: string;
  problem: string;
  detail: string;
  budget: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const EMPTY_CONTACT: ContactFields = {
  name: "",
  email: "",
  building: "",
  problem: "",
  detail: "",
  budget: "",
};

export const BUDGETS = [
  "Not sure yet",
  "Under $2,000",
  "$2,000 – $6,000",
  "$6,000 – $15,000",
  "$15,000+",
] as const;

/**
 * Upper bounds, enforced server-side. These are generous enough that no honest
 * submission hits them and tight enough that the endpoint cannot be used to
 * push a megabyte of text into an inbox.
 */
const LIMITS: Record<keyof ContactFields, number> = {
  name: 120,
  email: 200,
  building: 300,
  problem: 4000,
  detail: 4000,
  budget: 60,
};

/**
 * Deliberately permissive. Real addresses defeat any regex worth reading, so
 * this only rejects what is obviously not an address and leaves the actual
 * verdict to whether the reply bounces.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Insertion order matters: the form focuses the first key it finds here, so
 * these run in the order the fields appear on screen.
 */
export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Tell me who I am talking to.";
  } else if (fields.name.length > LIMITS.name) {
    errors.name = "That is longer than a name needs to be.";
  }

  const email = fields.email.trim();
  if (!email) {
    errors.email = "I need an email address to reply to.";
  } else if (email.length > LIMITS.email || !EMAIL.test(email)) {
    errors.email = "That does not look like a complete email address.";
  }

  if (!fields.building.trim()) {
    errors.building = "A few words is enough — a site, a tool, an integration.";
  } else if (fields.building.length > LIMITS.building) {
    errors.building = "Keep this to a line — the detail belongs below.";
  }

  if (fields.problem.trim().length < 10) {
    errors.problem = "Give me a sentence on what is going wrong today.";
  } else if (fields.problem.length > LIMITS.problem) {
    errors.problem = "That is past the limit — send the rest once I reply.";
  }

  if (fields.detail.length > LIMITS.detail) {
    errors.detail = "That is past the limit — send the rest once I reply.";
  }

  // Not surfaced next to a field: the budget is a fixed set of chips, so the
  // only way to fail it is to bypass the form.
  if (fields.budget && !BUDGETS.includes(fields.budget as (typeof BUDGETS)[number])) {
    errors.budget = "Unrecognised budget range.";
  }

  return errors;
}

/**
 * Coerce an unknown JSON body into the field shape. Returns null when the body
 * is not an object at all; anything else is normalised to strings so that
 * `validateContact` only ever sees the type it expects.
 */
export function parseContactPayload(input: unknown): ContactFields | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return null;
  }

  const body = input as Record<string, unknown>;
  const read = (key: keyof ContactFields) =>
    typeof body[key] === "string" ? (body[key] as string) : "";

  return {
    name: read("name"),
    email: read("email"),
    building: read("building"),
    problem: read("problem"),
    detail: read("detail"),
    budget: read("budget"),
  };
}
