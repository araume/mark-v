"use client";

import { useId, useState, type FormEvent } from "react";

type Fields = {
  name: string;
  email: string;
  building: string;
  problem: string;
  detail: string;
  budget: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  email: "",
  building: "",
  problem: "",
  detail: "",
  budget: "",
};

const budgets = [
  "Not sure yet",
  "Under $2,000",
  "$2,000 – $6,000",
  "$6,000 – $15,000",
  "$15,000+",
];

function validate(fields: Fields): Errors {
  const errors: Errors = {};

  if (!fields.name.trim()) errors.name = "Tell me who I am talking to.";

  const email = fields.email.trim();
  if (!email) {
    errors.email = "I need an email address to reply to.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "That does not look like a complete email address.";
  }

  if (!fields.building.trim()) {
    errors.building = "A few words is enough — a site, a tool, an integration.";
  }

  if (fields.problem.trim().length < 10) {
    errors.problem = "Give me a sentence on what is going wrong today.";
  }

  return errors;
}

export function ContactForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof Fields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    // Clear a field's error as soon as the person starts fixing it.
    setErrors((current) =>
      current[key] ? { ...current, [key]: undefined } : current,
    );
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(fields);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen reader users
      // are taken to it rather than having to hunt.
      const firstKey = (Object.keys(found) as (keyof Fields)[])[0];
      document.getElementById(`${id}-${firstKey}`)?.focus();
      return;
    }

    // FRONTEND ONLY — no transport yet, by design.
    // The backend step is to POST `fields` to a route handler that forwards to
    // an email service. Everything below this line already assumes that shape,
    // so wiring it up means replacing this branch with the request and keeping
    // the same success/error states.
    setSubmitted(true);
  }

  if (submitted) {
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
            setFields(EMPTY);
            setSubmitted(false);
          }}
          className="mt-8 border border-line-strong px-5 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-surface-alt"
        >
          SUBMIT ANOTHER
        </button>
      </div>
    );
  }

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
          placeholder="What happens today that shouldn't, or doesn't happen that should."
        />
      </div>

      <div className="mt-6">
        <Field
          id={`${id}-detail`}
          label="ANYTHING ELSE"
          optional
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
          {budgets.map((budget) => {
            const active = fields.budget === budget;
            return (
              <label
                key={budget}
                className={`cursor-pointer border px-3 py-2 font-mono text-[0.6875rem] tracking-[0.1em] transition-colors ${
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

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
        <button
          type="submit"
          className="group inline-flex items-center gap-2.5 border border-ink bg-ink px-6 py-3.5 font-mono text-xs tracking-[0.14em] text-surface transition-colors hover:border-accent-strong hover:bg-accent-strong"
        >
          INITIALIZE PROJECT
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
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
