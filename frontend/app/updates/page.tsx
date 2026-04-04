import { SiteShell } from "@/components/site-shell";

export const metadata = {
  title: "Updates · Community Foundry",
  description: "Weekly recaps and milestone notes from the Foundry.",
};

export default function UpdatesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">Roadmap & updates</h1>
        <p className="mt-4 text-zinc-400">
          Lightweight blog roll for weekly Spaces recaps and milestone movement. Content will appear here once the cadence
          is live.
        </p>
        <div
          className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center"
          role="status"
        >
          <p className="text-white">No posts yet</p>
          <p className="mt-2 text-sm text-zinc-500">Check back after the first weekly recap is published.</p>
        </div>
      </div>
    </SiteShell>
  );
}
