import type { ContributionPath } from "./types";

/** The six named paths (Six Pillars of the Foundry). Slugs and routes use `paths`. */
export const CONTRIBUTION_PATHS: readonly ContributionPath[] = [
  {
    slug: "heralds",
    name: "The Heralds",
    shortLabel: "Heralds",
    tagline: "Social reach, raids, and narrative lift.",
    whatYouDo:
      "Spread the word: memes, threads, coordinated raids, and clear messaging so the right people find the work.",
    accentClass: "from-rose-500/20 to-orange-500/10 ring-rose-500/25",
    levels: [
      { id: "h1", name: "Spark", summary: "Shows up, learns the voice, joins pushes." },
      { id: "h2", name: "Signal", summary: "Leads micro-raids and keeps tempo with the crew." },
      { id: "h3", name: "Beacon", summary: "Sets tone, trains others, shapes how the story lands." },
    ],
  },
  {
    slug: "council",
    name: "The Council",
    shortLabel: "Council",
    tagline: "Strategy, critique, and sharp thinking.",
    whatYouDo:
      "Pressure-test plans, refine positioning, and help the core team see blind spots before they ship.",
    accentClass: "from-violet-500/20 to-indigo-500/10 ring-violet-500/25",
    levels: [
      { id: "c1", name: "Scribe", summary: "Thoughtful feedback on docs, decks, and direction." },
      { id: "c2", name: "Sage", summary: "Owns review threads and connects dots across workstreams." },
      { id: "c3", name: "Oracle", summary: "Shapes standards and mentors others on judgment calls." },
    ],
  },
  {
    slug: "orators",
    name: "The Orators",
    shortLabel: "Orators",
    tagline: "Voice, stages, and onboarding energy.",
    whatYouDo:
      "Host Spaces, AMAs, and public moments that make the ecosystem legible to newcomers.",
    accentClass: "from-sky-500/20 to-cyan-500/10 ring-sky-500/25",
    levels: [
      { id: "o1", name: "Voice", summary: "Co-hosts, asks good questions, keeps rooms warm." },
      { id: "o2", name: "Harbinger", summary: "Runs series and owns run-of-show for recurring calls." },
      { id: "o3", name: "Chorus", summary: "Trains hosts, sets cadence, ties calls to shipped work." },
    ],
  },
  {
    slug: "diplomats",
    name: "The Diplomats",
    shortLabel: "Diplomats",
    tagline: "Partnerships, bridges, and trust at the edges.",
    whatYouDo:
      "Open doors: integrations, collabs, listings prep, and relationships that compound.",
    accentClass: "from-emerald-500/20 to-teal-500/10 ring-emerald-500/25",
    levels: [
      { id: "d1", name: "Envoy", summary: "Warm intros and clear follow-ups." },
      { id: "d2", name: "Envoy Prime", summary: "Owns partner tracks and keeps both sides aligned." },
      { id: "d3", name: "Pactkeeper", summary: "Shapes partnership thesis and coaches others on outreach." },
    ],
  },
  {
    slug: "forge",
    name: "The Forge",
    shortLabel: "Forge",
    tagline: "Builders — code, design, systems.",
    whatYouDo:
      "Ship pixels, contracts, tools, and glue that make everything else possible.",
    accentClass: "from-amber-500/25 to-[var(--foundry-ember)]/15 ring-[var(--foundry-ember)]/35",
    levels: [
      { id: "f1", name: "Apprentice", summary: "Small features, fixes, and prototypes." },
      { id: "f2", name: "Engineer", summary: "Owns meaningful chunks end-to-end." },
      { id: "f3", name: "Architect", summary: "Sets structure, standards, and technical vision." },
    ],
  },
  {
    slug: "vault",
    name: "The Vault",
    shortLabel: "Vault",
    tagline: "Capital that fuels milestones — one path among equals.",
    whatYouDo:
      "LP, campaign funding, DEX boosts — fuel without buying governance by default.",
    accentClass: "from-zinc-500/25 to-zinc-600/10 ring-zinc-400/20",
    levels: [
      { id: "v1", name: "Patron", summary: "Direct support that unlocks near-term runway." },
      { id: "v2", name: "Steward", summary: "Sustained backing tied to transparent project wallets." },
      { id: "v3", name: "Cornerstone", summary: "Anchors larger pushes with clear, public alignment." },
    ],
  },
] as const;

export function getPathBySlug(slug: string): ContributionPath | undefined {
  return CONTRIBUTION_PATHS.find((p) => p.slug === slug);
}

export function getAllPathSlugs(): string[] {
  return CONTRIBUTION_PATHS.map((p) => p.slug);
}
