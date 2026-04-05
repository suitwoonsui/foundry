import Link from "next/link";
import { HomeDashboardProjects } from "@/components/home-dashboard-projects";
import { PillarsPathGrid } from "@/components/pillars-path-grid";

/**
 * Home intro: identity and commitments (pillars, paths, ranks). Projects live on /projects.
 */
export function FoundryHomeHero() {
  return (
    <>
    <div className="border-b border-white/10 bg-gradient-to-b from-[var(--foundry-ember)]/10 via-black/40 to-transparent">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--foundry-ember-bright)]">Community Foundry</p>
        <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl lg:text-5xl">
          Where your commitments meet the work
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-zinc-300">
          The Foundry is as much about <strong className="font-medium text-white">who you are here</strong>—the paths you
          walk and the recognition you earn—as it is about{" "}
          <strong className="font-medium text-white">backing projects</strong>. Seven pillars, seven ways to show up; each
          path has ranks earned over time, not bought for status.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-zinc-500">
          Explore every path below, then dive into{" "}
          <Link
            href="/paths"
            className="font-medium text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            how paths and ranks work
          </Link>
          ,{" "}
          <Link
            href="/titles"
            className="font-medium text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            recognition titles
          </Link>
          , or{" "}
          <Link
            href="/projects"
            className="font-medium text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            browse projects to fund
          </Link>
          .
        </p>

        <section className="mt-12" aria-labelledby="pillars-grid-heading">
          <h2 id="pillars-grid-heading" className="font-[family-name:var(--font-display)] text-xl text-white sm:text-2xl">
            Seven pillars — seven paths
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Each path is an identity lane (full names and ranks on each path’s page).{" "}
            <strong className="font-medium text-zinc-300">The Hearth</strong> sits in the center—everyone who lives in what
            we ship. On small screens, scroll the row sideways.
          </p>
          <div className="mt-8">
            <PillarsPathGrid />
          </div>
        </section>
      </div>
    </div>
    <HomeDashboardProjects />
    </>
  );
}
