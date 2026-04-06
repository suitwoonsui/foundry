import Link from "next/link";

/** Wire from profile / wallet when available. */
export type HomeRecognitionItem = {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly kind?: "title" | "badge";
};

type Props = {
  /** When empty, shows placeholder copy. */
  readonly items?: readonly HomeRecognitionItem[];
};

/**
 * Thin bar directly under the site header on the home page: earned titles and (later) badges.
 */
export function HomeRecognitionStrip({ items = [] }: Props) {
  return (
    <div className="border-b border-white/10 bg-black/35 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">Your recognition</p>
        <div className="flex min-h-8 min-w-0 flex-1 flex-wrap items-center gap-2">
          {items.length > 0 ? (
            items.map((item) => {
              const chip = (
                <span
                  className={`inline-flex max-w-[200px] truncate rounded-full border px-2.5 py-1 text-xs ${
                    item.kind === "badge"
                      ? "border-[var(--foundry-ember)]/35 bg-[var(--foundry-ember)]/10 text-[var(--foundry-ember-bright)]"
                      : "border-white/15 bg-white/5 text-zinc-200"
                  }`}
                  title={item.label}
                >
                  {item.label}
                </span>
              );
              return item.href ? (
                <Link
                  key={item.id}
                  href={item.href}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
                >
                  {chip}
                </Link>
              ) : (
                <span key={item.id}>{chip}</span>
              );
            })
          ) : (
            <p className="text-sm text-zinc-500">
              Earned <span className="text-zinc-400">titles</span> and{" "}
              <span className="text-zinc-400">badges</span> will show here once your account or wallet is linked.
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs">
          <Link
            href="/titles"
            className="font-medium text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            My titles
          </Link>
          <span className="text-zinc-600" aria-hidden>
            ·
          </span>
          <Link
            href="/paths"
            className="text-zinc-400 hover:text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            How to earn
          </Link>
        </div>
      </div>
    </div>
  );
}
