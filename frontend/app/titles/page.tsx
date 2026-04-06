import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { MOCK_USER } from "@/lib/mock-user";

export const metadata = {
  title: "My titles",
  description: "Titles and honorifics you have earned in the Foundry — shown here when your account is connected.",
};

export default function MyTitlesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--foundry-ember-bright)]">Titles</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-white sm:text-5xl">My titles</h1>
        <p className="mt-4 text-lg text-zinc-400">
          Earned names and badges tied to your profile or wallet. Nothing here is pay-to-rank; leads and peers grant
          honorifics according to each path&apos;s rules.
        </p>
        <p className="mt-3 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/90">
          Preview: showing data for <strong className="font-medium">{MOCK_USER.handle}</strong> from{" "}
          <code className="text-amber-200/80">lib/mock-user.ts</code> until auth is wired.
        </p>
        <ul className="mt-8 space-y-3" aria-label="Your recognition">
          {MOCK_USER.recognitionItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {item.kind === "badge" ? "Badge" : "Title"}
                </p>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-1 block truncate font-medium text-white hover:text-[var(--foundry-ember-bright)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <p className="mt-1 font-medium text-white">{item.label}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-zinc-500">
          What each honorific means and how it&apos;s earned lives on the matching{" "}
          <Link
            href="/paths"
            className="text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            path
          </Link>{" "}
          (levels + earned honorifics). Old links to <code className="text-zinc-400">/titles/…</code> still open the right
          section on that path.
        </p>
      </div>
    </SiteShell>
  );
}
