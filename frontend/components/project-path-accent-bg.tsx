import { getProjectPathAccent } from "@/lib/path-accents";

type Props = {
  pathSlugs: readonly string[] | undefined;
  /** e.g. "opacity-50" — carousel uses slightly stronger wash */
  opacityClass?: string;
};

/**
 * Absolute inset gradient wash behind card content. Parent must be `relative overflow-hidden` with matching radius.
 */
export function ProjectPathAccentBg({ pathSlugs, opacityClass = "opacity-45" }: Props) {
  const accent = getProjectPathAccent(pathSlugs);

  if (accent.mode === "none") return null;

  if (accent.mode === "single") {
    const { from, to } = accent.layer;
    return (
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${opacityClass}`}
        style={{
          background: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
        }}
      />
    );
  }

  const { a, b } = accent;
  return (
    <span
      aria-hidden
      className={`project-path-accent-dual-animate pointer-events-none absolute inset-0 rounded-[inherit] ${opacityClass}`}
      style={{
        background: `linear-gradient(118deg, ${a.from} 0%, ${a.to} 34%, ${b.from} 66%, ${b.to} 100%)`,
      }}
    />
  );
}
