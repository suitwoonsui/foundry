import type { ContributionPath } from "./types";

/** The seven named paths (Seven Pillars of the Foundry). Slugs and routes use `paths`. */
export const CONTRIBUTION_PATHS: readonly ContributionPath[] = [
  {
    slug: "heralds",
    name: "The Heralds",
    shortLabel: "Heralds",
    tagline: "Rally attention, sharpen the message, bring the right eyes to our work.",
    homeCue: "Reach & raids",
    whatYouDo:
      "You speak with signal and care. You coordinate lifts in public, carry our narrative, and help curious strangers become the people who were meant to find us.",
    accentClass: "from-rose-500/20 to-orange-500/10 ring-rose-500/25",
    levels: [
      { id: "herald-1", name: "Spark", summary: "Arrive curious, learn our voice, and join the push." },
      { id: "herald-2", name: "Signal", summary: "Lead short bursts and keep the crew in rhythm." },
      { id: "herald-3", name: "Beacon", summary: "Own the tone, coach others, and land the story." },
    ],
  },
  {
    slug: "council",
    name: "The Council",
    shortLabel: "Council",
    tagline: "Challenge the plan, tighten the story, so launch day carries the narrative you chose.",
    homeCue: "Strategy",
    whatYouDo:
      "You read roadmaps the way a mentor reads a speech: line by line, for the audience. You pressure-test strategy, refine positioning, and name the blind spot before the world does.",
    accentClass: "from-violet-500/20 to-indigo-500/10 ring-violet-500/25",
    levels: [
      { id: "c1", name: "Scribe", summary: "Leave sharp notes on direction, decks, and docs." },
      { id: "c2", name: "Sage", summary: "Thread reviews and connect workstreams across the whole picture." },
      { id: "c3", name: "Oracle", summary: "Set the bar and walk others through hard judgment calls." },
    ],
  },
  {
    slug: "orators",
    name: "The Orators",
    shortLabel: "Orators",
    tagline: "Hold the room, host the moment, welcome newcomers with warmth and purpose.",
    homeCue: "Voice & stages",
    whatYouDo:
      "You open the meeting on time, on purpose, and with room for questions. You run Spaces, AMAs, and public beats so our ecosystem stays legible, human, and worth returning to.",
    accentClass: "from-sky-500/20 to-cyan-500/10 ring-sky-500/25",
    levels: [
      { id: "o1", name: "Voice", summary: "Co-host with warmth, ask sharp questions, hold attention." },
      { id: "o2", name: "Harbinger", summary: "Run the series and own every beat of show flow." },
      { id: "o3", name: "Chorus", summary: "Train hosts, lock cadence, tie stages to shipped work." },
    ],
  },
  {
    slug: "diplomats",
    name: "The Diplomats",
    shortLabel: "Diplomats",
    tagline: "Open doors, keep both sides heard, turn introductions into lasting tracks.",
    homeCue: "Partnerships",
    whatYouDo:
      "You build handshakes that survive the inbox. You prepare integrations and listings, follow through with care, and grow relationships that pay the community back over time.",
    accentClass: "from-emerald-500/20 to-teal-500/10 ring-emerald-500/25",
    levels: [
      { id: "d1", name: "Envoy", summary: "Offer warm intros and follow up like you mean it." },
      { id: "d2", name: "Emissary", summary: "Own the partner track and keep alignment with care." },
      { id: "d3", name: "Ambassador", summary: "Frame how we partner and coach others to do the same." },
    ],
  },
  {
    slug: "forge",
    name: "The Forge",
    shortLabel: "Forge",
    tagline: "Shape the artifact, ship the tool, hold the standard others build on.",
    homeCue: "Build & ship",
    whatYouDo:
      "You turn ideas into something we can touch: interfaces, contracts, and glue code. You make the rest of us faster, safer, and proud to point at what is live.",
    accentClass: "from-amber-500/25 to-[var(--foundry-ember)]/15 ring-[var(--foundry-ember)]/35",
    levels: [
      { id: "f1", name: "Apprentice", summary: "Ship fixes, small features, and honest prototypes." },
      { id: "f2", name: "Engineer", summary: "Own slices end-to-end that others rely on." },
      { id: "f3", name: "Architect", summary: "Define structure, standards, and technical direction." },
    ],
  },
  {
    slug: "vault",
    name: "The Vault",
    shortLabel: "Vault",
    tagline: "Fund the milestone, stay visible, back the work with clear roles and plain intent.",
    homeCue: "Fuel runway",
    whatYouDo:
      "You put capital where the next release can breathe: campaigns, liquidity, runway. You support builders with clear intent—backing the craft while keeping accountability and roles easy for everyone to read.",
    accentClass: "from-zinc-500/25 to-zinc-600/10 ring-zinc-400/20",
    levels: [
      { id: "v1", name: "Patron", summary: "Put fuel where the next milestone can run." },
      { id: "v2", name: "Steward", summary: "Back projects steadily with transparent wallets." },
      { id: "v3", name: "Cornerstone", summary: "Anchor bigger pushes with public, plain alignment." },
    ],
  },
  {
    slug: "hearth",
    name: "The Hearth",
    shortLabel: "Hearth",
    tagline: "Come back, belong, and let real use prove what the forge built.",
    homeCue: "Live products",
    whatYouDo:
      "You belong at the heart of the story: you play the game, use the tool, open the wallet. Return visits, deep loops, and belonging are how we know the work earned its fire.",
    accentClass: "from-orange-500/20 to-amber-950/20 ring-orange-400/30",
    levels: [
      { id: "hearth-1", name: "Visitor", summary: "Cross the threshold with real onboarding and first honest time in the product." },
      { id: "hearth-2", name: "Resident", summary: "Return often, learn the loops, and take your seat at the Hearth." },
      { id: "hearth-3", name: "Fixture", summary: "Become essential—the Hearth is fuller because you keep showing up." },
    ],
  },
] as const;

export function getPathBySlug(slug: string): ContributionPath | undefined {
  return CONTRIBUTION_PATHS.find((p) => p.slug === slug);
}

export function getAllPathSlugs(): string[] {
  return CONTRIBUTION_PATHS.map((p) => p.slug);
}
