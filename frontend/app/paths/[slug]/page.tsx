import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { COMMUNITY_TITLES } from "@/lib/community-titles";
import { getAllPathSlugs, getPathBySlug } from "@/lib/contribution-paths";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPathSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const path = getPathBySlug(slug);
  if (!path) return { title: "Path · Foundry" };
  return {
    title: `${path.name} · Paths`,
    description: path.tagline,
  };
}

export default async function PathDetailPage({ params }: Props) {
  const { slug } = await params;
  const path = getPathBySlug(slug);
  if (!path) notFound();

  const relatedTitles = COMMUNITY_TITLES.filter((t) => t.primaryPathSlug === path.slug);

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
          <Link
            href="/paths"
            className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            Paths
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-zinc-300">{path.shortLabel}</span>
        </nav>

        <header className={`mt-6 rounded-2xl border border-white/10 bg-gradient-to-br p-6 ring-1 ring-inset sm:p-8 ${path.accentClass}`}>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">{path.name}</h1>
          <p className="mt-2 text-lg text-[var(--foundry-ember-bright)]">{path.tagline}</p>
          <p className="mt-4 text-zinc-300">{path.whatYouDo}</p>
        </header>

        <section className="mt-10" aria-labelledby="levels-heading">
          <h2 id="levels-heading" className="font-[family-name:var(--font-display)] text-xl text-white">
            Recognition levels
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Labels for depth on <em>this</em> path only. They are not a global leaderboard.
          </p>
          <ol className="mt-6 space-y-4">
            {path.levels.map((level, i) => (
              <li
                key={level.id}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-sm text-[var(--foundry-ember-bright)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-medium text-white">{level.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{level.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {relatedTitles.length > 0 ? (
          <section className="mt-10" aria-labelledby="titles-heading">
            <h2 id="titles-heading" className="font-[family-name:var(--font-display)] text-xl text-white">
              Related titles
            </h2>
            <p className="mt-2 text-sm text-zinc-500">Earned honorifics often associated with this path.</p>
            <ul className="mt-4 space-y-2">
              {relatedTitles.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/titles/${t.slug}`}
                    className="block min-h-[44px] rounded-xl border border-white/10 px-4 py-3 text-white transition-colors hover:border-[var(--foundry-ember)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
                  >
                    {t.name}
                    <span className="mt-0.5 block text-sm text-zinc-500">{t.epithet}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-10 text-center text-sm text-zinc-500">
          <Link href="/paths" className="text-[var(--foundry-ember-bright)] hover:underline">
            ← All paths
          </Link>
        </p>
      </article>
    </SiteShell>
  );
}
