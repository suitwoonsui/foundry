import type { ReactNode } from "react";
import type { RewardType } from "@/lib/types";

const iconClass = "h-5 w-5 shrink-0 text-[var(--foundry-ember)]";

function IconNft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
      <path d="M8 11h8M8 15h5" strokeLinecap="round" />
    </svg>
  );
}

function IconTicket({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 9V7a2 2 0 012-2h12a2 2 0 012 2v2M4 15v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      <path d="M4 12h3a2 2 0 012 2v0a2 2 0 002 2h0a2 2 0 002-2v0a2 2 0 012-2h3" strokeLinecap="round" />
    </svg>
  );
}

function IconToken({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 10h6M9 14h6" strokeLinecap="round" />
    </svg>
  );
}

function IconBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3l2.2 4.5L19 8.3l-3.5 3.4.8 4.8L12 14.9 7.7 16.5l.8-4.8L5 8.3l4.8-.8L12 3z" strokeLinejoin="round" />
    </svg>
  );
}

function IconMixed({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="16" r="3" />
      <path d="M13 8h5M6 16h5" strokeLinecap="round" />
    </svg>
  );
}

const LABELS: Record<RewardType, string> = {
  NFT: "NFT perks",
  "Reduced Price": "Reduced price or access",
  Token: "Token rewards",
  Title: "Title or role recognition",
  Mixed: "Mixed rewards",
};

export function RewardIcons({ types }: { types: readonly RewardType[] }) {
  const map: Record<RewardType, ReactNode> = {
    NFT: <IconNft className={iconClass} />,
    "Reduced Price": <IconTicket className={iconClass} />,
    Token: <IconToken className={iconClass} />,
    Title: <IconBadge className={iconClass} />,
    Mixed: <IconMixed className={iconClass} />,
  };

  return (
    <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Reward types">
      {types.map((t) => (
        <span
          key={t}
          role="listitem"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-2"
          title={LABELS[t]}
        >
          <span className="sr-only">{LABELS[t]}</span>
          {map[t]}
        </span>
      ))}
    </div>
  );
}
