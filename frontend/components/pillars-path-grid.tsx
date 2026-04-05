import Link from "next/link";
import type { ContributionPath } from "@/lib/types";
import { CONTRIBUTION_PATHS } from "@/lib/contribution-paths";

/** Hearth centered in the row: three paths, Hearth, three paths. */
const HOME_PILLAR_ORDER = ["heralds", "council", "orators", "hearth", "diplomats", "forge", "vault"] as const;

function orderedHomePaths(): ContributionPath[] {
  return HOME_PILLAR_ORDER.map((slug) => CONTRIBUTION_PATHS.find((p) => p.slug === slug)).filter(
    (p): p is ContributionPath => p != null,
  );
}

/**
 * Single row of seven pillars: compact title (`shortLabel`) + very short `homeCue`.
 * Horizontal scroll on small viewports; seven equal columns from `lg` up.
 */
export function PillarsPathGrid() {
  const paths = orderedHomePaths();

  return (
    <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
      <ul
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 pt-1 sm:gap-3 lg:grid lg:snap-none lg:grid-cols-7 lg:gap-3 lg:overflow-visible lg:pb-0"
        role="list"
        aria-label="Seven paths"
      >
        {paths.map((p) => (
          <li
            key={p.slug}
            className="relative z-0 w-[min(100%,11rem)] shrink-0 snap-start hover:z-20 sm:w-40 lg:w-auto lg:min-w-0"
          >
            <Link
              href={`/paths/${p.slug}`}
              className={`group flex min-h-[4.5rem] flex-col justify-between rounded-xl border border-white/10 bg-gradient-to-br px-3 py-2.5 text-left ring-1 ring-inset transition-[transform,box-shadow,border-color,ring-color] duration-300 ease-out will-change-transform motion-reduce:transition-colors motion-reduce:duration-200 hover:-translate-y-1 hover:border-[var(--foundry-ember-bright)]/45 hover:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.65),0_0_36px_-8px_rgba(232,160,106,0.18)] hover:ring-[var(--foundry-ember)]/35 motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] active:translate-y-0 active:shadow-md active:duration-150 motion-reduce:active:shadow-none ${p.accentClass}`}
            >
              <span className="font-[family-name:var(--font-display)] text-sm font-medium leading-tight text-white transition-colors duration-300 group-hover:text-[var(--foundry-ember-bright)] motion-reduce:group-hover:text-white">
                {p.shortLabel}
              </span>
              <span className="mt-1.5 text-xs leading-tight text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                {p.homeCue}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-1 text-xs text-zinc-600 lg:hidden" aria-hidden="true">
        Scroll sideways for all seven →
      </p>
    </div>
  );
}
