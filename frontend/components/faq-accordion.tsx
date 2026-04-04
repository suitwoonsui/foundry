"use client";

import { useId, useState } from "react";

export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10">
      {items.map((item, i) => {
        const id = `${baseId}-faq-${i}`;
        const expanded = open === i;
        return (
          <div key={id} className="bg-white/[0.02]">
            <h3>
              <button
                type="button"
                id={`${id}-btn`}
                aria-expanded={expanded}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full min-h-[44px] items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--foundry-ember)]"
              >
                {item.q}
                <span className="text-zinc-500" aria-hidden>
                  {expanded ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-btn`}
              hidden={!expanded}
              className={expanded ? "px-4 pb-4 text-sm text-zinc-400" : "hidden"}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
