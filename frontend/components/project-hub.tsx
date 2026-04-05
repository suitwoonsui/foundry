"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { FoundryProject, ProjectCategory, ProjectStatus } from "@/lib/types";
import { ProjectCard } from "./project-card";

type SortKey = "recent" | "fundingPct" | "fundingLeft" | "trending";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Most recent" },
  { key: "fundingPct", label: "Funding %" },
  { key: "fundingLeft", label: "Funding left" },
  { key: "trending", label: "Trending" },
];

function uniq<T>(items: readonly T[]): T[] {
  return Array.from(new Set(items));
}

function matchesSearch(project: FoundryProject, q: string): boolean {
  if (!q.trim()) return true;
  const needle = q.toLowerCase();
  const hay = [
    project.name,
    project.shortGoal,
    project.description,
    ...project.tags,
    ...project.rewardTypes,
    ...project.team.map((t) => `${t.name} ${t.role} ${t.handle ?? ""}`),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(needle);
}

export function ProjectHub({ initialProjects }: { initialProjects: readonly FoundryProject[] }) {
  const categories = useMemo(
    () => uniq(initialProjects.map((p) => p.category)).sort() as ProjectCategory[],
    [initialProjects],
  );
  const statuses = useMemo(
    () => uniq(initialProjects.map((p) => p.status)).sort() as ProjectStatus[],
    [initialProjects],
  );

  const [categorySel, setCategorySel] = useState<Set<ProjectCategory>>(new Set());
  const [statusSel, setStatusSel] = useState<Set<ProjectStatus>>(new Set());
  const [sort, setSort] = useState<SortKey>("recent");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filtered = useMemo(() => {
    let list = initialProjects.filter((p) => matchesSearch(p, deferredSearch));
    if (categorySel.size) list = list.filter((p) => categorySel.has(p.category));
    if (statusSel.size) list = list.filter((p) => statusSel.has(p.status));

    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "recent") return b.updatedAt.localeCompare(a.updatedAt);
      if (sort === "trending") return (b.trendingScore ?? 0) - (a.trendingScore ?? 0);
      const pa = a.raisedSui / Math.max(1, a.targetSui);
      const pb = b.raisedSui / Math.max(1, b.targetSui);
      if (sort === "fundingPct") return pb - pa;
      const la = a.targetSui - a.raisedSui;
      const lb = b.targetSui - b.raisedSui;
      return la - lb;
    });
    return sorted;
  }, [initialProjects, deferredSearch, categorySel, statusSel, sort]);

  function toggleCategory(c: ProjectCategory) {
    setCategorySel((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }

  function toggleStatus(s: ProjectStatus) {
    setStatusSel((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  function clearFilters() {
    setCategorySel(new Set());
    setStatusSel(new Set());
    setSearch("");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--foundry-ember-bright)]">Projects</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">
          Fund the initiatives you believe in
        </h2>
        <p className="mt-3 text-sm text-zinc-400">
          Each project has its own lane—mission, milestones, and (soon) a dedicated Sui wallet for transparent progress.
          One way to commit among many; your path and ranks matter just as much.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor="foundry-search" className="sr-only">
            Search projects
          </label>
          <input
            id="foundry-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, tags, rewards…"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-500 focus:border-[var(--foundry-ember)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--foundry-ember)]/40"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="foundry-sort" className="text-sm text-zinc-400">
            Sort
          </label>
          <select
            id="foundry-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-12 min-h-[44px] rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white focus:border-[var(--foundry-ember)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--foundry-ember)]/40"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key} className="bg-zinc-900">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className="mt-8" aria-labelledby="filter-categories">
        <h2 id="filter-categories" className="text-sm font-medium text-zinc-300">
          Category
        </h2>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => {
            const on = categorySel.has(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className={`min-h-[44px] rounded-full border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] ${
                  on
                    ? "border-[var(--foundry-ember)]/60 bg-[var(--foundry-ember)]/15 text-[var(--foundry-ember-bright)]"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
                }`}
                aria-pressed={on}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6" aria-labelledby="filter-status">
        <h2 id="filter-status" className="text-sm font-medium text-zinc-300">
          Status
        </h2>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {statuses.map((s) => {
            const on = statusSel.has(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleStatus(s)}
                className={`min-h-[44px] rounded-full border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] ${
                  on
                    ? "border-[var(--foundry-ember)]/60 bg-[var(--foundry-ember)]/15 text-[var(--foundry-ember-bright)]"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20"
                }`}
                aria-pressed={on}
              >
                {s}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
        >
          Clear filters
        </button>
        <span className="text-sm text-zinc-500">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div
          className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center"
          role="status"
        >
          <p className="text-lg text-white">No projects match your filters.</p>
          <p className="mt-2 text-sm text-zinc-400">Try fewer filters or clear search.</p>
        </div>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {filtered.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} query={deferredSearch} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
