import Link from "next/link";
import type { FoundryTitle } from "@/lib/types";
import { getPathBySlug } from "@/lib/contribution-paths";

export function TitleCard({ title }: { title: FoundryTitle }) {
  const path = title.primaryPathSlug ? getPathBySlug(title.primaryPathSlug) : undefined;

  return (
    <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[var(--foundry-ember)]/30">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="font-[family-name:var(--font-display)] text-lg text-white sm:text-xl">{title.name}</h2>
        {path ? (
          <Link
            href={`/paths/${path.slug}`}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-zinc-300 hover:border-[var(--foundry-ember)]/40 hover:text-[var(--foundry-ember-bright)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            {path.shortLabel}
          </Link>
        ) : (
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-zinc-400">
            Cross-path
          </span>
        )}
      </div>
      <p className="mt-2 text-sm italic text-zinc-500">&ldquo;{title.epithet}&rdquo;</p>
      <p className="mt-3 line-clamp-3 text-sm text-zinc-400">{title.description}</p>
      <Link
        href={`/titles/${title.slug}`}
        className="mt-4 inline-flex min-h-[44px] items-center self-start rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-[var(--foundry-ember)]/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
      >
        How it&apos;s earned
      </Link>
    </article>
  );
}
