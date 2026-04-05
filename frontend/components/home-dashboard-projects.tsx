import Link from "next/link";
import { HomeProjectCarousel } from "@/components/home-project-carousel";
import {
  countProjectsFundingOpen,
  getAllProjectsSortedByTrending,
  getProjectCount,
} from "@/lib/projects";

/**
 * Compact project strip for the home dashboard, below the pillars grid.
 */
export function HomeDashboardProjects() {
  const carouselProjects = getAllProjectsSortedByTrending();
  const total = getProjectCount();
  const open = countProjectsFundingOpen();

  if (carouselProjects.length === 0) return null;

  return (
    <section
      className="border-b border-white/10 bg-gradient-to-b from-zinc-950/80 to-[var(--foundry-void)]"
      aria-labelledby="home-dashboard-projects-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 ring-1 ring-inset ring-white/5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Dashboard</p>
              <h2
                id="home-dashboard-projects-heading"
                className="mt-2 font-[family-name:var(--font-display)] text-xl text-white sm:text-2xl"
              >
                Projects at a glance
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Highlights under the pillars—where paths meet the work that still needs fuel. Open any card for
                milestones, tiers, and (soon) live wallets.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-[var(--foundry-ember)]/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
            >
              Full project hub →
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md sm:grid-cols-3">
            <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Initiatives</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl tabular-nums text-white">{total}</dd>
            </div>
            <div className="rounded-lg border border-white/5 bg-black/20 px-4 py-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Funding open</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl tabular-nums text-[var(--foundry-ember-bright)]">
                {open}
              </dd>
            </div>
            <div className="col-span-2 rounded-lg border border-white/5 bg-black/20 px-4 py-3 sm:col-span-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Carousel</dt>
              <dd className="mt-1 text-sm text-zinc-300">
                All {carouselProjects.length} projects <span className="text-zinc-600">·</span>{" "}
                <span className="text-zinc-500">momentum order · filter on the hub</span>
              </dd>
            </div>
          </dl>

          <HomeProjectCarousel projects={carouselProjects} />
        </div>
      </div>
    </section>
  );
}
