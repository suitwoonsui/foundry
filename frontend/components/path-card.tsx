import Link from "next/link";
import type { CSSProperties } from "react";
import type { ContributionPath } from "@/lib/types";

export function PathCard({
  path,
  className = "",
  style,
}: {
  path: ContributionPath;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      data-path-card
      style={style}
      className={[
        "group flex min-h-0 flex-col rounded-2xl border border-white/10 bg-gradient-to-br p-5 ring-1 ring-inset transition-colors hover:border-white/20",
        path.accentClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-white">{path.name}</h2>
        <span className="shrink-0 rounded-md bg-black/30 px-2 py-0.5 text-xs text-zinc-400">{path.shortLabel}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-[var(--foundry-ember-bright)]">{path.tagline}</p>
      <p className="mt-3 flex-1 text-sm text-zinc-400">{path.whatYouDo}</p>
      <p className="mt-4 border-t border-white/10 pt-4 text-xs font-medium leading-snug text-zinc-300">
        {path.levels.map((lvl) => lvl.name).join(" · ")}
      </p>
      <Link
        href={`/paths/${path.slug}`}
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
      >
        View path
      </Link>
    </article>
  );
}
