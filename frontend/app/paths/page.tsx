import Link from "next/link";
import { HonorificSection } from "@/components/honorific-section";
import { PathCardsGrid } from "@/components/path-cards-grid";
import { SiteShell } from "@/components/site-shell";
import { getCrossPathTitles } from "@/lib/community-titles";

export const metadata = {
  title: "Contribution paths",
  description:
    "Seven Pillars of the Foundry: paths for contribution and for living in our apps. The Hearth, Vault, Forge, and more—ranks earned, not bought.",
};

export default function PathsPage() {
  const crossPathHonorifics = getCrossPathTitles();

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--foundry-ember-bright)]">Paths</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white sm:text-5xl">
          Seven Pillars of the Foundry
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Seven <strong className="font-medium text-zinc-300">paths</strong>: how you contribute, fund, or{" "}
          <strong className="font-medium text-zinc-300">use what we ship</strong>. Each path is a <em>style</em> of showing
          up—not a rank above another. You can walk more than one. Recognition on a path is{" "}
          <strong className="font-medium text-zinc-300">earned</strong>, not purchased.
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          Each path page lists its <strong className="font-medium text-zinc-400">recognition levels</strong> and any{" "}
          <strong className="font-medium text-zinc-400">earned honorifics</strong> for that lane. Titles you personally hold
          live on{" "}
          <Link
            href="/titles"
            className="text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            My titles
          </Link>{" "}
          (when accounts are wired).
        </p>

        <PathCardsGrid />

        {crossPathHonorifics.length > 0 ? (
          <section className="mx-auto mt-16 max-w-3xl" aria-labelledby="cross-path-honorifics-heading">
            <h2
              id="cross-path-honorifics-heading"
              className="font-[family-name:var(--font-display)] text-xl text-white sm:text-2xl"
            >
              Cross-path honorifics
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              These recognitions are not tied to a single pillar; they show up here so nothing hides in a separate catalog.
            </p>
            <div className="mt-6 space-y-6">
              {crossPathHonorifics.map((t) => (
                <HonorificSection key={t.slug} title={t} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </SiteShell>
  );
}
