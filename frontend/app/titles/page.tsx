import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { TitlesDirectory } from "@/components/titles-directory";
import { COMMUNITY_TITLES } from "@/lib/community-titles";

export const metadata = {
  title: "Recognition titles",
  description: "Earned honorifics tied to contribution depth — not ranks you buy.",
};

export default function TitlesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--foundry-ember-bright)]">Titles</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white sm:text-5xl">
          Recognition titles
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Titles are <strong className="font-medium text-zinc-300">earned</strong> through sustained, visible work on a
          path (or across paths). They are story and reputation — not a shop SKU, not governance weight by default.
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          New here? Start with{" "}
          <Link href="/paths" className="text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]">
            contribution paths
          </Link>{" "}
          to see how people plug in.
        </p>

        <TitlesDirectory titles={COMMUNITY_TITLES} />
      </div>
    </SiteShell>
  );
}
