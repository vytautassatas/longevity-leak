import Link from "next/link";

export function EvidenceRiskGuide(): JSX.Element {
  return (
    <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 sm:p-6">
      <h2 className="text-2xl">How to Read Evidence and Risk</h2>
      <p className="mt-3 text-sm text-[var(--muted)] sm:text-base">
        These labels are directional research signals, not medical advice. Use them to compare options faster, then validate decisions with a qualified clinician.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Evidence Levels</h3>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <strong>A:</strong> Multiple strong human datasets with repeatable outcomes.
            </li>
            <li>
              <strong>B:</strong> Promising human evidence, but endpoint quality/consistency still evolving.
            </li>
            <li>
              <strong>C:</strong> Early or translational evidence; use exploratory caution.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Risk Levels</h3>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <strong>Low Risk:</strong> Generally well-tolerated in common protocols.
            </li>
            <li>
              <strong>Moderate Risk:</strong> Potential interactions or dose sensitivity; monitor use.
            </li>
            <li>
              <strong>Needs Monitoring:</strong> Physician-guided only; labs and clinical oversight expected.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export function EvidenceRiskNote(): JSX.Element {
  return (
    <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5 sm:p-6">
      <h2 className="text-xl">Evidence and Risk Labels</h2>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Evidence A/B/C reflects research maturity, and risk levels reflect monitoring needs. These labels support comparison, not diagnosis or treatment decisions.
      </p>
      <Link className="mt-3 inline-flex text-sm font-semibold underline underline-offset-2" href="/supplements">
        See full scoring guide
      </Link>
    </section>
  );
}
