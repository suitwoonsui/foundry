import Link from "next/link";
import { PathCardsGrid } from "@/components/path-cards-grid";
import { SiteShell } from "@/components/site-shell";

export const metadata = {
  title: "Contribution paths",
  description:
    "Seven Pillars of the Foundry: paths for contribution and for living in our apps. The Hearth, Vault, Forge, and more—ranks earned, not bought.",
};

export default function PathsPage() {
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
          Looking for honorifics and story titles? See{" "}
          <Link href="/titles" className="text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]">
            Recognition titles
          </Link>
          .
        </p>

        <PathCardsGrid />
      </div>
    </SiteShell>
  );
}
