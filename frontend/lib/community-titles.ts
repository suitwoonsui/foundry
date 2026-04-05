import type { FoundryTitle } from "./types";

export const COMMUNITY_TITLES: readonly FoundryTitle[] = [
  {
    slug: "beacon-herald",
    name: "Beacon of the Heralds",
    epithet: "The message finds shore because you kept lighting it.",
    description:
      "Reserved for Heralds who consistently elevate others’ voices and keep raids humane, focused, and on-story.",
    primaryPathSlug: "heralds",
    howEarned: "Recognition from leads after sustained Signal → Beacon depth; not purchasable.",
    shownOn: ["Site profile (future)", "Discord role", "Contributor spotlights"],
  },
  {
    slug: "architect-forge",
    name: "Architect of the Forge",
    epithet: "The system bends but does not break where you touched it.",
    description:
      "For builders who set standards others adopt — reviews, patterns, and mentorship that outlast any one PR.",
    primaryPathSlug: "forge",
    howEarned: "Nomination by core team + peer attestations; reviewed quarterly.",
    shownOn: ["Site profile (future)", "Release notes credits", "NFT credential (later)"],
  },
  {
    slug: "warden-vault",
    name: "Warden of the Vault",
    epithet: "Runway held steady when the work needed room to breathe.",
    description:
      "Honors Vault contributors whose support is transparent, patient, and aligned with public milestones — not back-room deals.",
    primaryPathSlug: "vault",
    howEarned: "Acknowledgment when funding unlocked a named milestone; culture fit review.",
    shownOn: ["Project pages (optional opt-in)", "Annual recap"],
  },
  {
    slug: "oracle-council",
    name: "Oracle of the Council",
    epithet: "The plan survived contact with reality because you saw the edge cases.",
    description:
      "For strategic thinkers whose written or live critique repeatedly changed outcomes before launch.",
    primaryPathSlug: "council",
    howEarned: "Council leads + product sign-off after a documented impact trail.",
    shownOn: ["Private Council roster", "AMA intros"],
  },
  {
    slug: "chorus-orator",
    name: "Chorus of the Orators",
    epithet: "The room always knew why the work mattered when you held the mic.",
    description:
      "For hosts who run repeatable, high-signal public calls that tie narrative to shipped work.",
    primaryPathSlug: "orators",
    howEarned: "Program owner + community feedback after a series of hosted sessions.",
    shownOn: ["Spaces descriptions", "Site /updates bylines"],
  },
  {
    slug: "ambassador-diplomat",
    name: "Ambassador of the Diplomats",
    epithet: "Partnerships that lasted started with your handshake.",
    description:
      "For diplomats who close and maintain integrations or listings prep with both sides still smiling.",
    primaryPathSlug: "diplomats",
    howEarned: "Partnerships lead + counterparty nod; conflict-of-interest check.",
    shownOn: ["Partner recap posts", "Internal deal desk"],
  },
  {
    slug: "foundry-kin",
    name: "Kin of the Foundry",
    epithet: "You showed up in more than one way, and the work noticed.",
    description:
      "Cross-path recognition for people who contribute credibly across two or more paths without grinding for rank.",
    howEarned: "Manual award for multi-path depth; rare by design.",
    shownOn: ["Site profile (future)", "Seasonal community post"],
  },
] as const;

export function getTitleBySlug(slug: string): FoundryTitle | undefined {
  return COMMUNITY_TITLES.find((t) => t.slug === slug);
}

export function getAllTitleSlugs(): string[] {
  return COMMUNITY_TITLES.map((t) => t.slug);
}
