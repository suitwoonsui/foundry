import Link from "next/link";
import { CONTRIBUTION_PATHS } from "@/lib/contribution-paths";
import { COMMUNITY_TITLES } from "@/lib/community-titles";

export function CommunityHomeStrip() {
  const pathPreview = CONTRIBUTION_PATHS.slice(0, 3);
  const titlePreview = COMMUNITY_TITLES.slice(0, 3);

  return (
    <section className="border-t border-white/10 bg-black/25" aria-labelledby="community-strip-heading">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="community-strip-heading" className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">
          Beyond funding: pillars, paths & titles
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-400">
          Projects are one lane. <strong className="font-medium text-zinc-300">Six Pillars of the Foundry</strong> frame how
          we talk about contribution; <strong className="font-medium text-zinc-300">paths</strong> are how you actually
          show up and progress. <strong className="font-medium text-zinc-300">Titles</strong> are earned recognition for
          depth on a path—not ranks you buy.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--foundry-ember-bright)]">
              Contribution paths
            </h3>
            <ul className="mt-4 space-y-3">
              {pathPreview.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/paths/${p.slug}`}
                    className="flex min-h-[44px] flex-col justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-[var(--foundry-ember)]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium text-white">{p.name}</span>
                    <span className="text-sm text-zinc-500">{p.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/paths"
              className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
            >
              All paths →
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--foundry-ember-bright)]">
              Recognition titles
            </h3>
            <ul className="mt-4 space-y-3">
              {titlePreview.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/titles/${t.slug}`}
                    className="flex min-h-[44px] flex-col justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-[var(--foundry-ember)]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
                  >
                    <span className="font-medium text-white">{t.name}</span>
                    <span className="line-clamp-1 text-sm text-zinc-500">{t.epithet}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/titles"
              className="mt-4 inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
            >
              All titles →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
