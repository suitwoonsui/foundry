import Link from "next/link";
import { PathCard } from "@/components/path-card";
import { SiteShell } from "@/components/site-shell";
import { CONTRIBUTION_PATHS } from "@/lib/contribution-paths";

export const metadata = {
  title: "Contribution paths",
  description:
    "Six Pillars of the Foundry: six ways to contribute. Paths are how you show up and earn recognition—funding is the Vault path; these are the others.",
};

export default function PathsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--foundry-ember-bright)]">Paths</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white sm:text-5xl">
          Six Pillars of the Foundry
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Six pillars, six <strong className="font-medium text-zinc-300">paths</strong>: how you contribute and level up.
          Each path is a <em>style</em> of contribution, not a rank above another. You can walk more than one. Recognition
          on a path is <strong className="font-medium text-zinc-300">earned</strong>, not purchased.
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          Looking for honorifics and story titles? See{" "}
          <Link href="/titles" className="text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]">
            Recognition titles
          </Link>
          .
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTRIBUTION_PATHS.map((p) => (
            <li key={p.slug}>
              <PathCard path={p} />
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
