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
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 sm:px-6">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-1 sm:flex-row sm:items-center sm:gap-4">
          <p className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Your recognition
          </p>
          <div className="flex min-h-8 min-w-0 flex-wrap items-center gap-2 overflow-hidden sm:min-w-0 sm:flex-1">
            {items.length > 0 ? (
              items.map((item) => {
                const chip = (
                  <span
                    className={`inline-flex max-w-[min(200px,100%)] truncate rounded-full border px-2.5 py-1 text-xs ${
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
                    className="min-w-0 max-w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundry-void)]"
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
        </div>
        <nav
          className="flex shrink-0 items-center gap-3 border-t border-white/10 pt-2 text-xs sm:border-t-0 sm:pt-0"
          aria-label="Recognition shortcuts"
        >
          <Link
            href="/titles"
            className="inline-flex min-h-[44px] min-w-[44px] items-center font-medium text-[var(--foundry-ember-bright)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] sm:min-h-0 sm:min-w-0"
          >
            My titles
          </Link>
          <span className="text-zinc-600" aria-hidden>
            ·
          </span>
          <Link
            href="/paths"
            className="inline-flex min-h-[44px] min-w-[44px] items-center text-zinc-400 hover:text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)] sm:min-h-0 sm:min-w-0"
          >
            How to earn
          </Link>
        </nav>
      </div>
    </div>
  );
}
