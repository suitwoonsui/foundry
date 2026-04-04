"use client";

import { useMemo, useState } from "react";
import type { FoundryTitle } from "@/lib/types";
import { CONTRIBUTION_PATHS } from "@/lib/contribution-paths";
import { TitleCard } from "./title-card";

export function TitlesDirectory({ titles }: { titles: readonly FoundryTitle[] }) {
  const [pathFilter, setPathFilter] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    if (pathFilter === "all") return titles;
    if (pathFilter === "cross") return titles.filter((t) => !t.primaryPathSlug);
    return titles.filter((t) => t.primaryPathSlug === pathFilter);
  }, [titles, pathFilter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter titles by path">
        <button
          type="button"
          onClick={() => setPathFilter("all")}
          aria-pressed={pathFilter === "all"}
          className={`min-h-[44px] rounded-full border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] ${
            pathFilter === "all"
              ? "border-[var(--foundry-ember)]/60 bg-[var(--foundry-ember)]/15 text-[var(--foundry-ember-bright)]"
              : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setPathFilter("cross")}
          aria-pressed={pathFilter === "cross"}
          className={`min-h-[44px] rounded-full border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] ${
            pathFilter === "cross"
              ? "border-[var(--foundry-ember)]/60 bg-[var(--foundry-ember)]/15 text-[var(--foundry-ember-bright)]"
              : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
          }`}
        >
          Cross-path
        </button>
        {CONTRIBUTION_PATHS.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setPathFilter(p.slug)}
            aria-pressed={pathFilter === p.slug}
            className={`min-h-[44px] rounded-full border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] ${
              pathFilter === p.slug
                ? "border-[var(--foundry-ember)]/60 bg-[var(--foundry-ember)]/15 text-[var(--foundry-ember-bright)]"
                : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
            }`}
          >
            {p.shortLabel}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-zinc-400" role="status">
          No titles for this filter yet.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {filtered.map((t) => (
            <li key={t.slug}>
              <TitleCard title={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
