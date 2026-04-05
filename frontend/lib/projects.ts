import type { FoundryProject } from "./types";

export const PROJECTS: readonly FoundryProject[] = [
  {
    slug: "weekly-spaces-boost",
    pathSlugs: ["orators", "heralds"],
    name: "Weekly Spaces boost",
    shortGoal: "Launch a four-week Spaces cadence to keep shipping visible and community-led.",
    description:
      "A focused marketing push: recurring Spaces, recap threads, and aligned messaging so supporters see momentum every week—not a one-off announcement.",
    category: "Marketing",
    status: "Funding Open",
    rewardTypes: ["NFT", "Title"],
    tags: ["Sui", "community", "Spaces", "narrative"],
    impact: "Community",
    risk: "Low",
    timeline: "Short",
    fundingBand: "1k-5k",
    targetSui: 1500,
    raisedSui: 860,
    walletLabel: "wallet_marketing_push_march2026.sui",
    whyItMatters: [
      "Keeps progress legible without hiding behind a single treasury.",
      "Pairs live conversation with transparent funding so trust stays high.",
    ],
    tiers: [
      {
        minSui: 25,
        label: "Spark",
        perks: ["Foundry Supporter badge (display)", "Early recap links"],
      },
      {
        minSui: 100,
        label: "Signal",
        perks: ["Dynamic badge NFT (Phase 2)", "Priority AMA questions"],
      },
      {
        minSui: 200,
        label: "Beacon",
        perks: ["Title in contributor spotlight", "Whitelist-first drops"],
      },
    ],
    milestones: [
      { id: "m1", title: "Run of show + weekly calendar", done: true, eta: "Week 1" },
      { id: "m2", title: "First 4 Spaces shipped", done: false, eta: "Week 2–5" },
      { id: "m3", title: "Public recap hub live", done: false, eta: "Week 5" },
    ],
    team: [
      { name: "Ops lead", role: "Program owner", handle: "@foundry.ops" },
      { name: "Community", role: "Hosts & moderation", handle: "@foundry.comm" },
    ],
    faqs: [
      {
        q: "Is this a donation?",
        a: "It is direct support with planned perks—wallet transparency comes in Phase 2; perks start manual and high-signal.",
      },
      {
        q: "Where does the SUI go?",
        a: "To this project’s dedicated wallet once live. For now, numbers on the hub are illustrative (Phase 1).",
      },
    ],
    updatedAt: "2026-03-28",
    trendingScore: 92,
  },
  {
    slug: "recon-tactics-prototype",
    pathSlugs: ["forge", "hearth"],
    name: "Recon Tactics prototype",
    shortGoal: "Ship a playable vertical slice for a tactics mini-game with on-chain identity hooks.",
    description:
      "A scoped game slice to validate feel, session length, and wallet moments before scaling art and content.",
    category: "Games",
    status: "Building",
    rewardTypes: ["NFT", "Reduced Price", "Mixed"],
    tags: ["Sui", "shooter game", "prototype", "NFT"],
    impact: "Tech",
    risk: "Medium",
    timeline: "Medium",
    fundingBand: "5k-25k",
    targetSui: 8000,
    raisedSui: 3200,
    walletLabel: "wallet_recon_tactics.sui",
    whyItMatters: [
      "Proves out loop + wallet UX without betting the whole roadmap.",
      "Creates a clean surface for early believers to follow real commits.",
    ],
    tiers: [
      { minSui: 50, label: "Playtester", perks: ["Closed build access", "Credits in patch notes"] },
      { minSui: 250, label: "Patron", perks: ["Lifetime discount on cosmetics", "Badge NFT"] },
      { minSui: 750, label: "Architect", perks: ["Roadmap voting session", "Unique soulbound marker (later)"] },
    ],
    milestones: [
      { id: "m1", title: "Core loop greybox", done: true },
      { id: "m2", title: "Wallet connect + guest mode", done: true },
      { id: "m3", title: "First public playtest", done: false, eta: "Apr 2026" },
    ],
    team: [{ name: "Game lead", role: "Design & direction" }],
    faqs: [
      { q: "Will perks auto-grant?", a: "Phase 1 is display-only; fulfillment becomes automated in later phases." },
    ],
    updatedAt: "2026-03-30",
    trendingScore: 88,
  },
  {
    slug: "crypto-tracker-dashboard",
    pathSlugs: ["forge", "hearth"],
    name: "Crypto tracker dashboard",
    shortGoal: "A lightweight portfolio + Sui activity view for power users and creators.",
    description:
      "Read-first balances and activity with a path toward alerts, labels, and creator-focused workflows.",
    category: "Apps",
    status: "Ideation",
    rewardTypes: ["Token", "Reduced Price"],
    tags: ["dashboard", "indexer", "tools"],
    impact: "Revenue",
    risk: "Medium",
    timeline: "Long",
    fundingBand: "25k+",
    targetSui: 30000,
    raisedSui: 1200,
    walletLabel: "wallet_crypto_tracker.sui",
    whyItMatters: [
      "Reduces context switching for people already in your ecosystem.",
      "Creates a reusable component layer for future apps.",
    ],
    tiers: [
      { minSui: 100, label: "Insider", perks: ["Private beta", "Reduced Pro tier"] },
      { minSui: 500, label: "Backer", perks: ["Token allocation (project policy)", "Feature voting"] },
    ],
    milestones: [
      { id: "m1", title: "UX spec + API map", done: false },
      { id: "m2", title: "MVP read-only balances", done: false },
    ],
    team: [{ name: "Product", role: "Owner" }],
    faqs: [{ q: "Why so early?", a: "Phase 1 is visibility-only; funding activates when the wallet is wired." }],
    updatedAt: "2026-03-20",
    trendingScore: 40,
  },
  {
    slug: "contributor-portal-v1",
    pathSlugs: ["council", "hearth"],
    name: "Contributor portal v1",
    shortGoal: "Central place for paths (Heralds, Forge, Vault…) with clear next steps—no pay-to-rank.",
    description:
      "Explains how to plug in as a Herald, Forge, Vault, or other path—without conflating money with rank.",
    category: "Community Tools",
    status: "In Review",
    rewardTypes: ["Title", "NFT"],
    tags: ["onboarding", "identity", "Discord"],
    impact: "Community",
    risk: "Low",
    timeline: "Sprint",
    fundingBand: "<1k",
    targetSui: 800,
    raisedSui: 0,
    whyItMatters: [
      "Makes “choose your path” real on the site, not just in docs.",
      "Keeps funding as one path among equals.",
    ],
    tiers: [
      { minSui: 10, label: "Supporter", perks: ["Name in launch notes"] },
      { minSui: 75, label: "Pillar seed", perks: ["Early portal theme NFT"] },
    ],
    milestones: [{ id: "m1", title: "IA + copy deck", done: false }],
    team: [],
    faqs: [],
    updatedAt: "2026-03-25",
    trendingScore: 55,
  },
  {
    slug: "dex-listing-readiness",
    pathSlugs: ["diplomats", "vault"],
    name: "DEX listing readiness",
    shortGoal: "Liquidity, routing checks, and comms pack for a disciplined listing push.",
    description:
      "Coordinates liquidity depth, routing sanity checks, and a calm comms narrative so listings land cleanly.",
    category: "Partnerships & Listings",
    status: "Paused",
    rewardTypes: ["Mixed"],
    tags: ["DEX", "liquidity", "marketing"],
    impact: "Growth",
    risk: "High",
    timeline: "Medium",
    fundingBand: "5k-25k",
    targetSui: 12000,
    raisedSui: 5400,
    whyItMatters: [
      "Coordinates technical and narrative readiness so listings do not feel rushed.",
    ],
    tiers: [{ minSui: 500, label: "Sponsor", perks: ["Co-branded recap", "Behind-the-scenes call"] }],
    milestones: [
      { id: "m1", title: "Routing simulations", done: true },
      { id: "m2", title: "Comms freeze", done: false },
    ],
    team: [{ name: "Partnerships", role: "Lead" }],
    faqs: [],
    updatedAt: "2026-02-10",
    trendingScore: 30,
  },
] as const;

/** Top projects for the home dashboard (by trending score). */
export function getHomeHighlightProjects(max = 6): FoundryProject[] {
  return [...PROJECTS]
    .sort((a, b) => (b.trendingScore ?? 0) - (a.trendingScore ?? 0))
    .slice(0, max);
}

/** All projects for the home carousel, newest momentum first. */
export function getAllProjectsSortedByTrending(): FoundryProject[] {
  return [...PROJECTS].sort((a, b) => (b.trendingScore ?? 0) - (a.trendingScore ?? 0));
}

export function countProjectsFundingOpen(): number {
  return PROJECTS.filter((p) => p.status === "Funding Open").length;
}

export function getProjectCount(): number {
  return PROJECTS.length;
}

export function getProjectBySlug(slug: string): FoundryProject | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
