"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import {
  BUDGETS,
  EMPTY_CONTACT,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

type Status = "idle" | "sending" | "sent";

export function ContactForm() {
  const id = useId();
  const [fields, setFields] = useState<ContactFields>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  /** Transport-level failure, as opposed to a per-field problem. */
  const [failure, setFailure] = useState<string | null>(null);
  // Honeypot. Kept out of React state so a re-render can never clear what a bot
  // typed into it, which is the whole point of the trap.
  const honeypot = useRef<HTMLInputElement>(null);

  const update = (key: keyof ContactFields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    // Clear a field's error as soon as the person starts fixing it.
    setErrors((current) =>
      current[key] ? { ...current, [key]: undefined } : current,
    );
  };

  /**
   * Not every field has somewhere to put an error: `budget` is a set of chips
   * that cannot produce an invalid value from this UI, so a rejection naming it
   * has no input to focus and no slot to render into. Report whether anything
   * was actually shown, so the caller can fall back to the banner rather than
   * leaving the form looking like the button did nothing.
   */
  function focusFirst(found: ContactErrors): boolean {
    for (const key of Object.keys(found) as (keyof ContactFields)[]) {
      const node = document.getElementById(`${id}-${key}`);
      if (node) {
        node.focus();
        return true;
      }
    }
    return false;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setFailure(null);

    const found = validateContact(fields);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen reader users
      // are taken to it rather than having to hunt.
      focusFirst(found);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          company: honeypot.current?.value ?? "",
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus("idle");

        // The server revalidates from scratch, so it can reject something the
        // browser let through. Show those against their own fields.
        if (payload?.fields) {
          setErrors(payload.fields);
          if (focusFirst(payload.fields)) return;
          // Nothing on screen could show it — say so at form level instead.
        }

        setFailure(
          payload?.error ?? "The message did not send. Try again in a moment.",
        );
        return;
      }

      setStatus("sent");
    } catch {
      // Offline, DNS, or the connection dropped mid-flight.
      setStatus("idle");
      setFailure(
        "That did not reach the server. Check your connection and try again.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        className="panel panel-marks p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <p className="meta text-accent">STATUS</p>
        <p className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Project initialized.
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Thanks, {fields.name.trim().split(" ")[0]}. I read every one of these
          myself and reply within two working days — usually with questions
          before an estimate.
        </p>

        <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
          <div className="bg-surface px-4 py-3">
            <dt className="meta">BUILDING</dt>
            <dd className="mt-1.5 text-sm text-ink">{fields.building}</dd>
          </div>
          <div className="bg-surface px-4 py-3">
            <dt className="meta">BUDGET</dt>
            <dd className="mt-1.5 text-sm text-ink">
              {fields.budget || "Not specified"}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => {
            setFields(EMPTY_CONTACT);
            setErrors({});
            setFailure(null);
            setStatus("idle");
          }}
          className="mt-8 border border-line-strong px-5 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-surface-alt"
        >
          SUBMIT ANOTHER
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form noValidate onSubmit={onSubmit} className="panel panel-marks p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          label="YOUR NAME"
          error={errors.name}
          value={fields.name}
          onChange={update("name")}
          autoComplete="name"
        />
        <Field
          id={`${id}-email`}
          label="EMAIL"
          type="email"
          error={errors.email}
          value={fields.email}
          onChange={update("email")}
          autoComplete="email"
        />
      </div>

      <div className="mt-6">
        <Field
          id={`${id}-building`}
          label="WHAT ARE YOU LOOKING TO BUILD?"
          error={errors.building}
          value={fields.building}
          onChange={update("building")}
          placeholder="A booking site, an internal dashboard, an integration…"
        />
      </div>

      <div className="mt-6">
        <Field
          id={`${id}-problem`}
          label="WHAT PROBLEM ARE YOU TRYING TO SOLVE?"
          error={errors.problem}
          value={fields.problem}
          onChange={update("problem")}
          multiline
          rows={3}
          placeholder="What happens today that shouldn’t, or doesn’t happen that should."
        />
      </div>

      <div className="mt-6">
        <Field
          id={`${id}-detail`}
          label="ANYTHING ELSE"
          optional
          error={errors.detail}
          value={fields.detail}
          onChange={update("detail")}
          multiline
          rows={3}
          placeholder="Deadlines, existing systems, who else is involved."
        />
      </div>

      <fieldset className="mt-6">
        <legend className="meta">BUDGET RANGE (OPTIONAL)</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {BUDGETS.map((budget) => {
            const active = fields.budget === budget;
            return (
              <label
                key={budget}
                className={`cursor-pointer border px-3 py-2 font-mono text-[0.6875rem] tracking-[0.1em] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-accent ${
                  active
                    ? "border-accent bg-accent text-surface"
                    : "border-line-strong text-muted hover:border-ink hover:text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={budget}
                  checked={active}
                  onChange={() => update("budget")(budget)}
                  className="sr-only"
                />
                {budget.toUpperCase()}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Honeypot. Positioned off-screen rather than display:none, which the
          less naive bots know to skip, and hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${id}-company`}>Company (leave this empty)</label>
        <input
          ref={honeypot}
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {failure ? (
        <p
          role="alert"
          className="mt-6 border border-[#B4392F] bg-[#B4392F]/5 px-4 py-3 text-sm leading-relaxed text-[#B4392F]"
        >
          {failure}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="group inline-flex items-center gap-2.5 border border-ink bg-ink px-6 py-3.5 font-mono text-xs tracking-[0.14em] text-surface transition-colors hover:border-accent-strong hover:bg-accent-strong disabled:cursor-not-allowed disabled:border-line-strong disabled:bg-line-strong"
        >
          {sending ? "SENDING…" : "INITIALIZE PROJECT"}
          <span
            aria-hidden="true"
            className={
              sending
                ? "opacity-0"
                : "transition-transform duration-300 group-hover:translate-x-1"
            }
          >
            →
          </span>
        </button>
        <p className="text-xs text-muted">
          No newsletter, no CRM sequence. It goes to one inbox.
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  optional?: boolean;
  autoComplete?: string;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  multiline,
  rows,
  placeholder,
  optional,
  autoComplete,
}: FieldProps) {
  const errorId = `${id}-error`;

  const shared = {
    id,
    value,
    placeholder,
    autoComplete,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(event.target.value),
    className: `mt-2.5 w-full border bg-surface-alt px-3.5 py-3 text-sm text-ink transition-colors placeholder:text-muted/70 focus:bg-surface ${
      error ? "border-[#B4392F]" : "border-line-strong"
    }`,
  };

  return (
    <div>
      <label htmlFor={id} className="meta">
        {label}
        {optional ? <span className="text-line-strong"> · OPTIONAL</span> : null}
      </label>

      {multiline ? (
        <textarea {...shared} rows={rows ?? 3} />
      ) : (
        <input {...shared} type={type} />
      )}

      {error ? (
        <p id={errorId} className="mt-2 text-xs text-[#B4392F]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
