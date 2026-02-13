import Link from "next/link";
import type { ReactNode } from "react";
import type { ClinicEntry, ConditionEntry, EvidenceLevel, SupplementEntry } from "@/lib/directory";

function evidenceDot(level: EvidenceLevel): string {
  if (level === "A") return "bg-emerald-500";
  if (level === "B") return "bg-amber-500";
  return "bg-rose-500";
}

function safetyColor(safety: SupplementEntry["safety"]): string {
  if (safety === "Low Risk") return "text-[#0f766e]";
  if (safety === "Moderate Risk") return "text-[#b45309]";
  return "text-[#be123c]";
}

function Card({ children }: { children: ReactNode }): JSX.Element {
  return <article className="directory-card flex h-full min-h-[360px] flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">{children}</article>;
}

function EvidenceBadge({ level }: { level: EvidenceLevel }): JSX.Element {
  const tone = evidenceDot(level);
  return (
    <span className="inline-flex h-10 min-w-[108px] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-soft)]">
      <span className={`w-1.5 ${tone}`} />
      <span className="flex flex-1 items-center justify-between px-2.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Grade</span>
        <span className="text-base font-semibold leading-none">{level}</span>
      </span>
    </span>
  );
}

function TopMeta({ label, level }: { label: string; level: EvidenceLevel }): JSX.Element {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="max-w-[62%] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
      <EvidenceBadge level={level} />
    </div>
  );
}

function TitleBlock({ title, summary }: { title: string; summary: string }): JSX.Element {
  return (
    <>
      <h3 className="mt-4 font-sans text-[2rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-[2.12rem]">{title}</h3>
      <p className="mt-2 line-clamp-2 text-[1rem] leading-[1.42] text-[var(--muted)]">{summary}</p>
    </>
  );
}

function FactRows({ children }: { children: ReactNode }): JSX.Element {
  return <div className="mt-4 rounded-md border border-[var(--border)] bg-[var(--surface-soft)]">{children}</div>;
}

function FactRow({ label, value, valueClassName }: { label: string; value: ReactNode; valueClassName?: string }): JSX.Element {
  return (
    <div className="grid grid-cols-[98px_minmax(0,1fr)] gap-3 border-b border-[var(--border)] px-3 py-3 last:border-b-0 sm:grid-cols-[110px_minmax(0,1fr)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
      <p className={valueClassName ?? "line-clamp-2 text-[0.97rem] leading-[1.35]"}>{value}</p>
    </div>
  );
}

function TagList({ tags }: { tags: string[] }): JSX.Element {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[11px] font-semibold">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function CardFooter({ href, tags, aux }: { href: string; tags?: string[]; aux?: string }): JSX.Element {
  return (
    <div className="mt-auto pt-4">
      {aux && <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{aux}</p>}
      {tags && tags.length > 0 && <TagList tags={tags} />}
      <Link className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--text)] underline underline-offset-4" href={href}>
        Open profile
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export function SupplementCard({ supplement }: { supplement: SupplementEntry }): JSX.Element {
  return (
    <Card>
      <TopMeta label={supplement.focus} level={supplement.evidenceLevel} />
      <TitleBlock summary={supplement.evidenceSummary} title={supplement.name} />

      <FactRows>
        <FactRow label="Dose" value={supplement.dosing.typicalDailyDose} />
        <FactRow label="Effect" value={supplement.effectSize} />
        <FactRow label="Safety" value={supplement.safety} valueClassName={`text-[1.02rem] font-semibold leading-[1.3] ${safetyColor(supplement.safety)}`} />
      </FactRows>

      <CardFooter
        aux={`Mentioned in ${supplement.articleRefs.length} article${supplement.articleRefs.length > 1 ? "s" : ""}`}
        href={`/supplements/${supplement.slug}`}
        tags={supplement.conditionTags.slice(0, 4)}
      />
    </Card>
  );
}

export function ConditionCard({ condition }: { condition: ConditionEntry }): JSX.Element {
  return (
    <Card>
      <TopMeta label="Condition strategy" level={condition.evidenceLevel} />
      <TitleBlock summary={condition.goal} title={condition.name} />

      <FactRows>
        <FactRow label="Guidance" value={condition.guidanceSummary} valueClassName="line-clamp-3 text-[0.96rem] leading-[1.35]" />
        <FactRow label="Top steps" value={condition.topInterventions.slice(0, 3).join(" • ")} valueClassName="line-clamp-2 text-[0.95rem] leading-[1.35]" />
      </FactRows>

      <CardFooter href={`/conditions/${condition.slug}`} />
    </Card>
  );
}

export function ClinicCard({ clinic }: { clinic: ClinicEntry }): JSX.Element {
  return (
    <Card>
      <TopMeta label={clinic.location} level={clinic.evidenceLevel} />
      <TitleBlock summary={clinic.specialization} title={clinic.name} />

      <FactRows>
        <FactRow label="Notes" value={clinic.notes} valueClassName="line-clamp-3 text-[0.96rem] leading-[1.35]" />
        <FactRow label="Focus" value={clinic.protocolFocus.slice(0, 3).join(" • ")} valueClassName="line-clamp-2 text-[0.95rem] leading-[1.35]" />
      </FactRows>

      <CardFooter href={`/clinics/${clinic.slug}`} />
    </Card>
  );
}
