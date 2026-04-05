/**
 * RGBA layers aligned with pillar/path accents in `contribution-paths.ts` (Tailwind palette + brand ember).
 * Used for project cards keyed by optional `pathSlugs` on each project.
 */

export const PATH_SLUGS = [
  "heralds",
  "council",
  "orators",
  "diplomats",
  "forge",
  "vault",
  "hearth",
] as const;

export type PathSlug = (typeof PATH_SLUGS)[number];

export type PathAccentLayer = {
  /** Gradient start (card wash) */
  from: string;
  /** Gradient end (card wash) */
  to: string;
  /** Inset ring / edge */
  ring: string;
  /** Progress bar start */
  progressFrom: string;
  /** Progress bar end */
  progressTo: string;
};

export const PATH_ACCENT_LAYERS: Record<PathSlug, PathAccentLayer> = {
  heralds: {
    from: "rgba(244, 63, 94, 0.2)",
    to: "rgba(249, 115, 22, 0.1)",
    ring: "rgba(244, 63, 94, 0.28)",
    progressFrom: "#f43f5e",
    progressTo: "#f97316",
  },
  council: {
    from: "rgba(139, 92, 246, 0.2)",
    to: "rgba(99, 102, 241, 0.1)",
    ring: "rgba(139, 92, 246, 0.28)",
    progressFrom: "#8b5cf6",
    progressTo: "#6366f1",
  },
  orators: {
    from: "rgba(14, 165, 233, 0.2)",
    to: "rgba(6, 182, 212, 0.1)",
    ring: "rgba(14, 165, 233, 0.28)",
    progressFrom: "#0ea5e9",
    progressTo: "#06b6d4",
  },
  diplomats: {
    from: "rgba(16, 185, 129, 0.2)",
    to: "rgba(20, 184, 166, 0.1)",
    ring: "rgba(16, 185, 129, 0.28)",
    progressFrom: "#10b981",
    progressTo: "#14b8a6",
  },
  forge: {
    from: "rgba(245, 158, 11, 0.22)",
    to: "rgba(196, 92, 42, 0.14)",
    ring: "rgba(196, 92, 42, 0.38)",
    progressFrom: "#f59e0b",
    progressTo: "#c45c2a",
  },
  vault: {
    from: "rgba(113, 113, 122, 0.22)",
    to: "rgba(82, 82, 91, 0.1)",
    ring: "rgba(161, 161, 170, 0.22)",
    progressFrom: "#a1a1aa",
    progressTo: "#71717a",
  },
  hearth: {
    from: "rgba(249, 115, 22, 0.2)",
    to: "rgba(120, 53, 15, 0.18)",
    ring: "rgba(251, 146, 60, 0.32)",
    progressFrom: "#fb923c",
    progressTo: "#c2410c",
  },
};

function normalizePathSlugs(slugs: readonly string[] | undefined): PathSlug[] {
  if (!slugs?.length) return [];
  const set = new Set(PATH_SLUGS);
  return slugs.filter((s): s is PathSlug => set.has(s as PathSlug));
}

export type ProjectPathAccent =
  | { mode: "none" }
  | { mode: "single"; layer: PathAccentLayer }
  | { mode: "dual"; a: PathAccentLayer; b: PathAccentLayer };

export function getProjectPathAccent(pathSlugs: readonly string[] | undefined): ProjectPathAccent {
  const norm = normalizePathSlugs(pathSlugs);
  if (norm.length === 0) return { mode: "none" };
  if (norm.length === 1) return { mode: "single", layer: PATH_ACCENT_LAYERS[norm[0]] };
  return { mode: "dual", a: PATH_ACCENT_LAYERS[norm[0]], b: PATH_ACCENT_LAYERS[norm[1]] };
}

export function getProjectAccentRingColor(pathSlugs: readonly string[] | undefined): string | undefined {
  const accent = getProjectPathAccent(pathSlugs);
  if (accent.mode === "none") return undefined;
  if (accent.mode === "single") return accent.layer.ring;
  return accent.a.ring;
}

export function getProjectProgressGradient(pathSlugs: readonly string[] | undefined): {
  from: string;
  to: string;
} {
  const accent = getProjectPathAccent(pathSlugs);
  if (accent.mode === "none") {
    return { from: "var(--foundry-ember)", to: "var(--foundry-gold)" };
  }
  if (accent.mode === "single") {
    return { from: accent.layer.progressFrom, to: accent.layer.progressTo };
  }
  return {
    from: accent.a.progressFrom,
    to: accent.b.progressTo,
  };
}
