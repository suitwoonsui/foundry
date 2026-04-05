import Link from "next/link";
import { ProjectPathAccentBg } from "@/components/project-path-accent-bg";
import { getProjectAccentRingColor, getProjectProgressGradient } from "@/lib/path-accents";
import type { FoundryProject } from "@/lib/types";
import { RewardIcons } from "./reward-icons";

function highlightText(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q.toLowerCase());
  if (idx < 0) return text;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return (
    <>
      {before}
      <mark className="rounded bg-[var(--foundry-ember)]/25 px-0.5 text-white">{match}</mark>
      {after}
    </>
  );
}

export function ProjectCard({ project, query }: { project: FoundryProject; query: string }) {
  const pct = Math.min(100, Math.round((project.raisedSui / Math.max(1, project.targetSui)) * 100));
  const ring = getProjectAccentRingColor(project.pathSlugs);
  const progress = getProjectProgressGradient(project.pathSlugs);

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] ring-1 ring-inset transition-transform hover:-translate-y-0.5 hover:border-[var(--foundry-ember)]/35 ${ring ? "ring-transparent" : "ring-white/5"}`}
      style={ring ? { boxShadow: `inset 0 0 0 1px ${ring}` } : undefined}
    >
      <ProjectPathAccentBg pathSlugs={project.pathSlugs} opacityClass="opacity-40" />
      <div className="relative z-[1] flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-[family-name:var(--font-display)] text-lg text-white sm:text-xl">
            {highlightText(project.name, query)}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{project.shortGoal}</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
          {project.category}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-200 ring-1 ring-emerald-500/20">
          {project.status}
        </span>
        <span className="rounded-md bg-sky-500/10 px-2 py-1 text-sky-200 ring-1 ring-sky-500/20">{project.impact}</span>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-2 text-sm">
          <span className="text-zinc-400">Raised</span>
          <span className="font-mono text-white">
            {project.raisedSui.toLocaleString()} / {project.targetSui.toLocaleString()} SUI
          </span>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label={`Funding ${pct} percent`}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${progress.from}, ${progress.to})`,
            }}
          />
        </div>
        <p className="mt-1 text-xs text-zinc-500">Phase 1 — illustrative until live wallet sync.</p>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">Rewards</p>
        <RewardIcons types={project.rewardTypes} />
      </div>

      {project.walletLabel ? (
        <p className="mt-3 truncate font-mono text-xs text-zinc-500" title={project.walletLabel}>
          {project.walletLabel}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={`/p/${project.slug}`}
          className="inline-flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] sm:flex-none"
        >
          View
        </Link>
        <Link
          href={`/p/${project.slug}#contribute`}
          className="inline-flex min-h-[44px] min-w-[44px] flex-1 items-center justify-center rounded-xl border border-[var(--foundry-ember)]/50 bg-[var(--foundry-ember)]/10 px-4 py-2 text-sm font-medium text-[var(--foundry-ember-bright)] transition-colors hover:bg-[var(--foundry-ember)]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] sm:flex-none"
        >
          Contribute
        </Link>
      </div>
      </div>
    </article>
  );
}
