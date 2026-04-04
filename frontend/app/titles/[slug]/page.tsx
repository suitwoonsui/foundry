import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getPathBySlug } from "@/lib/contribution-paths";
import { getAllTitleSlugs, getTitleBySlug } from "@/lib/community-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTitleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) return { title: "Title · Foundry" };
  return {
    title: `${title.name} · Titles`,
    description: title.description,
  };
}

export default async function TitleDetailPage({ params }: Props) {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) notFound();

  const path = title.primaryPathSlug ? getPathBySlug(title.primaryPathSlug) : undefined;

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
          <Link
            href="/titles"
            className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            Titles
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-zinc-300">{title.name}</span>
        </nav>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">{title.name}</h1>
            {path ? (
              <Link
                href={`/paths/${path.slug}`}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300 hover:border-[var(--foundry-ember)]/40 hover:text-[var(--foundry-ember-bright)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
              >
                {path.name}
              </Link>
            ) : (
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-400">
                Cross-path
              </span>
            )}
          </div>
          <p className="mt-3 text-lg italic text-zinc-500">&ldquo;{title.epithet}&rdquo;</p>
          <p className="mt-6 text-zinc-300">{title.description}</p>
        </header>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">How it&apos;s earned</h2>
          <p className="mt-2 text-zinc-300">{title.howEarned}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Where it shows</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-400">
            {title.shownOn.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-center text-sm text-zinc-500">
          <Link href="/titles" className="text-[var(--foundry-ember-bright)] hover:underline">
            ← All titles
          </Link>
        </p>
      </article>
    </SiteShell>
  );
}
