import type { FoundryTitle } from "@/lib/types";
import { honorificAnchorId } from "@/lib/community-titles";

export function HonorificSection({ title }: { title: FoundryTitle }) {
  const anchor = honorificAnchorId(title.slug);
  return (
    <section
      id={anchor}
      aria-labelledby={`${anchor}-heading`}
      className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
    >
      <h3 id={`${anchor}-heading`} className="font-[family-name:var(--font-display)] text-lg text-white sm:text-xl">
        {title.name}
      </h3>
      <p className="mt-2 text-sm italic text-zinc-500">&ldquo;{title.epithet}&rdquo;</p>
      <p className="mt-4 text-sm text-zinc-300">{title.description}</p>
      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">How it&apos;s earned</h4>
        <p className="mt-2 text-sm text-zinc-300">{title.howEarned}</p>
      </div>
      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Where it shows</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-400">
          {title.shownOn.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
