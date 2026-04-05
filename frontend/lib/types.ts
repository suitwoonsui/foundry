export type ProjectCategory =
  | "Apps"
  | "Games"
  | "Marketing"
  | "Community Tools"
  | "Content & Media"
  | "Partnerships & Listings"
  | "Events"
  | "Research & Exploration"
  | "Infrastructure"
  | "Treasury & Ops";

export type ProjectStatus =
  | "Ideation"
  | "In Review"
  | "Funding Open"
  | "Building"
  | "Paused"
  | "Complete";

export type RewardType = "NFT" | "Reduced Price" | "Token" | "Title" | "Mixed";

export type FundingGoalBand = "<1k" | "1k-5k" | "5k-25k" | "25k+";

export type TimelineBand = "Sprint" | "Short" | "Medium" | "Long";

export type ImpactArea = "Growth" | "Revenue" | "Community" | "Tech" | "Brand";

export type RiskLevel = "Low" | "Medium" | "High";

export interface FundingTier {
  readonly minSui: number;
  readonly label: string;
  readonly perks: readonly string[];
}

export interface Milestone {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
  readonly eta?: string;
}

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly handle?: string;
}

/** One step on a path’s recognition ladder — earned, not purchased. */
export interface PathRecognitionLevel {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
}

/**
 * A path under Seven Pillars of the Foundry: how someone contributes, uses our apps,
 * or both (Heralds, Forge, Vault, Hearth, …) and earns recognition along that path.
 */
export interface ContributionPath {
  readonly slug: string;
  readonly name: string;
  readonly shortLabel: string;
  /** One line for cards; home row uses `homeCue` for a shorter hook. */
  readonly tagline: string;
  /** One or two words (or a very short phrase) for the home pillars strip only. */
  readonly homeCue: string;
  readonly whatYouDo: string;
  readonly levels: readonly PathRecognitionLevel[];
  readonly accentClass: string;
}

/** Display / lore title granted for sustained contribution on a path (or cross-path). */
export interface FoundryTitle {
  readonly slug: string;
  readonly name: string;
  readonly epithet: string;
  readonly description: string;
  readonly primaryPathSlug?: string;
  readonly howEarned: string;
  readonly shownOn: readonly string[];
}

export interface FoundryProject {
  readonly slug: string;
  /**
   * Contribution path slugs this project aligns with (see `/paths`). First is primary for ring/progress.
   * Drives pillar-colored wash on cards; two slugs get a blended gradient with gentle motion.
   */
  readonly pathSlugs?: readonly string[];
  readonly name: string;
  readonly shortGoal: string;
  readonly description: string;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly rewardTypes: readonly RewardType[];
  readonly tags: readonly string[];
  readonly impact: ImpactArea;
  readonly risk: RiskLevel;
  readonly timeline: TimelineBand;
  readonly fundingBand: FundingGoalBand;
  readonly targetSui: number;
  readonly raisedSui: number;
  readonly walletLabel?: string;
  readonly whyItMatters: readonly string[];
  readonly tiers: readonly FundingTier[];
  readonly milestones: readonly Milestone[];
  readonly team: readonly TeamMember[];
  readonly faqs: readonly { q: string; a: string }[];
  readonly updatedAt: string;
  readonly trendingScore?: number;
}
