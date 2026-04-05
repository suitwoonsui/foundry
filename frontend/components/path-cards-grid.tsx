"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { PathCard } from "@/components/path-card";
import { CONTRIBUTION_PATHS } from "@/lib/contribution-paths";

const HEARTH_SLUG = "hearth";

const pathsWithoutHearth = CONTRIBUTION_PATHS.filter((p) => p.slug !== HEARTH_SLUG);
const hearthPath = CONTRIBUTION_PATHS.find((p) => p.slug === HEARTH_SLUG);

/**
 * All path cards share one min-height: tallest natural height among the seven.
 * Hearth occupies the full first grid row alone (empty flanks), centered at one column width.
 */
export function PathCardsGrid() {
  const rootRef = useRef<HTMLUListElement>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const cards = [...root.querySelectorAll<HTMLElement>("li.path-card-equalize [data-path-card]")];
      if (cards.length === 0) return;
      const max = Math.max(...cards.map((el) => el.getBoundingClientRect().height), 0);
      if (max <= 0) return;
      setMinHeight((prev) => (prev === max ? prev : max));
    };

    measure();

    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(root);
    for (const el of root.querySelectorAll("li.path-card-equalize [data-path-card]")) {
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const cardStyle: CSSProperties | undefined =
    minHeight !== undefined ? { minHeight } : undefined;

  return (
    <ul ref={rootRef} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hearthPath != null ? (
        <li className="path-card-equalize col-span-full flex justify-center">
          <div className="w-full sm:max-w-[calc((100%-1.5rem)/2)] lg:max-w-[calc((100%-3rem)/3)]">
            <PathCard path={hearthPath} className="w-full flex-1" style={cardStyle} />
          </div>
        </li>
      ) : null}
      {pathsWithoutHearth.map((p) => (
        <li key={p.slug} className="path-card-equalize flex h-full min-h-0">
          <PathCard path={p} className="w-full flex-1" style={cardStyle} />
        </li>
      ))}
    </ul>
  );
}
