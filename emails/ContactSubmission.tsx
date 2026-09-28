import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ContactFields } from "@/lib/contact";

/**
 * The notification that lands in the studio inbox.
 *
 * Email clients are not browsers: no external stylesheet, no custom fonts worth
 * relying on, and layout that has to survive Outlook. So this mirrors the site's
 * vocabulary — mono metadata labels, hairline rules, no shadows — using inline
 * styles and system stacks rather than importing anything from globals.css.
 */

export type ContactSubmissionProps = ContactFields & {
  /** ISO string; rendered in the studio's own timezone. */
  submittedAt: string;
};

const ink = "#11161A";
const muted = "#66727A";
const line = "#D9E0E5";
const accent = "#2F6E93";
const surfaceAlt = "#F6F8FA";

const mono =
  "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";
const sans =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const metaStyle = {
  margin: "0",
  fontFamily: mono,
  fontSize: "11px",
  lineHeight: "1",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: muted,
};

const valueStyle = {
  margin: "10px 0 0",
  fontFamily: sans,
  fontSize: "15px",
  lineHeight: "1.6",
  color: ink,
  whiteSpace: "pre-wrap" as const,
};

const rowStyle = {
  padding: "20px 24px",
  borderBottom: `1px solid ${line}`,
};

function Row({ label, children }: { label: string; children: string }) {
  return (
    <Section style={rowStyle}>
      <Text style={metaStyle}>{label}</Text>
      <Text style={valueStyle}>{children}</Text>
    </Section>
  );
}

export function ContactSubmission({
  name,
  email,
  building,
  problem,
  detail,
  budget,
  submittedAt,
}: ContactSubmissionProps) {
  const stamp = new Date(submittedAt).toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  });

  return (
    <Html lang="en">
      <Head />
      {/* Shown in the inbox list next to the subject. */}
      <Preview>{`${name} — ${building}`}</Preview>
      <Body
        style={{
          margin: "0",
          padding: "24px 0",
          backgroundColor: surfaceAlt,
          fontFamily: sans,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            border: `1px solid ${line}`,
          }}
        >
          <Section
            style={{
              padding: "20px 24px",
              borderBottom: `1px solid ${line}`,
            }}
          >
            <Text
              style={{
                ...metaStyle,
                color: accent,
                fontWeight: 500,
              }}
            >
              MARK-V / NEW ENQUIRY
            </Text>
            <Text style={{ ...metaStyle, marginTop: "10px" }}>{stamp}</Text>
          </Section>

          <Row label="FROM">{name}</Row>

          <Section style={rowStyle}>
            <Text style={metaStyle}>EMAIL</Text>
            <Text style={valueStyle}>
              <Link
                href={`mailto:${email}`}
                style={{ color: accent, textDecoration: "underline" }}
              >
                {email}
              </Link>
            </Text>
          </Section>

          <Row label="LOOKING TO BUILD">{building}</Row>
          <Row label="PROBLEM TO SOLVE">{problem}</Row>

          {detail.trim() ? <Row label="ANYTHING ELSE">{detail}</Row> : null}

          <Row label="BUDGET RANGE">{budget || "Not specified"}</Row>

          <Section style={{ padding: "20px 24px" }}>
            <Text style={{ ...metaStyle, fontSize: "10px" }}>
              REPLY TO THIS EMAIL TO REACH {name.toUpperCase()} DIRECTLY
            </Text>
          </Section>
        </Container>

        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Hr style={{ border: "none", margin: "0" }} />
          <Text
            style={{
              ...metaStyle,
              fontSize: "10px",
              padding: "14px 24px",
              textAlign: "center" as const,
            }}
          >
            SENT BY THE MARK-V CONTACT FORM
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/** react-email's preview server renders the default export. */
export default function Preview_() {
  return (
    <ContactSubmission
      name="Rosa Delgado"
      email="rosa@kilnsupply.example"
      building="An internal dashboard for our dispatch team"
      problem={
        "Dispatch runs on three spreadsheets and a group chat. Nobody can answer where a shipment is without calling someone."
      }
      detail="We have an existing Postgres database. Two people would use it daily."
      budget="$6,000 – $15,000"
      submittedAt={new Date("2026-09-28T09:30:00+08:00").toISOString()}
    />
  );
}
