"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectPathAccentBg } from "@/components/project-path-accent-bg";
import { getProjectAccentRingColor, getProjectProgressGradient } from "@/lib/path-accents";
import type { FoundryProject } from "@/lib/types";

function HighlightCard({ project }: { project: FoundryProject }) {
  const pct = Math.min(100, Math.round((project.raisedSui / Math.max(1, project.targetSui)) * 100));
  const ring = getProjectAccentRingColor(project.pathSlugs);
  const progress = getProjectProgressGradient(project.pathSlugs);

  return (
    <li
      data-carousel-item
      className="w-[min(280px,calc(100vw-5rem))] shrink-0 snap-start sm:w-[280px]"
    >
      <Link
        href={`/p/${project.slug}`}
        className={`group relative flex h-full min-h-[12rem] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4 ring-1 ring-inset transition-colors hover:border-[var(--foundry-ember)]/35 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)] ${ring ? "ring-transparent" : "ring-white/5"}`}
        style={ring ? { boxShadow: `inset 0 0 0 1px ${ring}` } : undefined}
      >
        <ProjectPathAccentBg pathSlugs={project.pathSlugs} opacityClass="opacity-55" />
        <span className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <h3 className="font-[family-name:var(--font-display)] text-sm font-medium leading-snug text-white group-hover:text-[var(--foundry-ember-bright)]">
          <span className="line-clamp-2">{project.name}</span>
        </h3>
        <span className="mt-1.5 inline-flex self-start rounded-md border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
          {project.category}
        </span>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-500">{project.shortGoal}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
          <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-emerald-200/90 ring-1 ring-emerald-500/20">
            {project.status}
          </span>
          <span className="tabular-nums text-zinc-400">{pct}%</span>
          <span className="text-zinc-600">·</span>
          <span className="tabular-nums text-zinc-400">
            {project.raisedSui.toLocaleString()} / {project.targetSui.toLocaleString()} SUI
          </span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${progress.from}, ${progress.to})`,
            }}
          />
        </div>
        </span>
      </Link>
    </li>
  );
}

function scrollGapPx(el: HTMLElement): number {
  const g = getComputedStyle(el).gap;
  if (g.endsWith("px")) return parseFloat(g) || 12;
  return 12;
}

export function HomeProjectCarousel({ projects }: { projects: readonly FoundryProject[] }) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setCanPrev(left > 4);
    setCanNext(left < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows, projects.length]);

  const step = useCallback((dir: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-carousel-item]");
    if (!card) return;
    const gap = scrollGapPx(scroller);
    const w = card.getBoundingClientRect().width;
    scroller.scrollBy({ left: dir * (w + gap), behavior: "smooth" });
  }, []);

  if (projects.length === 0) return null;

  const showArrows = projects.length > 1;

  return (
    <div className="mt-8" role="region" aria-label="Project highlights carousel">
      <div className="flex items-center gap-2 sm:gap-3">
        {showArrows ? (
          <button
            type="button"
            aria-label="Previous project"
            disabled={!canPrev}
            onClick={() => step(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-lg text-white transition-colors hover:border-[var(--foundry-ember)]/40 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
          >
            <span aria-hidden className="-mt-0.5 block font-[family-name:var(--font-display)] text-xl leading-none">
              ‹
            </span>
          </button>
        ) : null}

        <ul
          ref={scrollerRef}
          className="flex min-h-0 min-w-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] focus:outline-none [&::-webkit-scrollbar]:hidden"
          tabIndex={-1}
        >
          {projects.map((p) => (
            <HighlightCard key={p.slug} project={p} />
          ))}
        </ul>

        {showArrows ? (
          <button
            type="button"
            aria-label="Next project"
            disabled={!canNext}
            onClick={() => step(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-lg text-white transition-colors hover:border-[var(--foundry-ember)]/40 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
          >
            <span aria-hidden className="-mt-0.5 block font-[family-name:var(--font-display)] text-xl leading-none">
              ›
            </span>
          </button>
        ) : null}
      </div>
      {showArrows ? (
        <p className="mt-2 text-center text-xs text-zinc-600 sm:text-left">
          Each arrow moves one project. Swipe the row on touch screens.
        </p>
      ) : null}
    </div>
  );
}
