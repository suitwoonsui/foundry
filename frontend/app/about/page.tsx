import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export const metadata = {
  title: "How it works · Community Foundry",
  description: "Community-powered funding with transparent per-project wallets and participation paths.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">How it works</h1>
        <p className="mt-4 text-lg text-zinc-400">
          The Foundry is a hub where supporters choose which projects to fuel. Each project gets its own lane: mission,
          milestones, rewards, and—when live—a dedicated Sui wallet so funding stays traceable.
        </p>
        <ul className="mt-8 space-y-4 text-zinc-300">
          <li>
            <strong className="text-white">Visibility first.</strong> Phase 1 is the project grid and detail pages so the
            community always sees what is shipping.
          </li>
          <li>
            <strong className="text-white">Contribution ≠ charity.</strong> Perks are project-specific; fulfillment
            starts manual and becomes automated as the stack matures.
          </li>
          <li>
            <strong className="text-white">Paths, not ranks.</strong>{" "}
            <Link href="/paths" className="text-[var(--foundry-ember-bright)] hover:underline">
              Contribution paths
            </Link>{" "}
            under <strong className="text-white">Six Pillars of the Foundry</strong> describe <em>how</em> you show up.
            Funding is one of them (
            <Link href="/paths/vault" className="text-[var(--foundry-ember-bright)] hover:underline">
              the Vault
            </Link>
            ) alongside builders, hosts, and advocates.
          </li>
          <li>
            <strong className="text-white">Titles are earned.</strong>{" "}
            <Link href="/titles" className="text-[var(--foundry-ember-bright)] hover:underline">
              Recognition titles
            </Link>{" "}
            honor depth on a path; they are not something you buy for status or governance by default.
          </li>
        </ul>
        <p className="mt-10 text-sm text-zinc-500">
          Onboarding guides and weekly rhythm will expand here and on{" "}
          <Link href="/updates" className="text-[var(--foundry-ember-bright)] hover:underline">
            Updates
          </Link>
          .
        </p>
      </div>
    </SiteShell>
  );
}
