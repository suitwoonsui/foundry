import type { HomeRecognitionItem } from "@/components/home-recognition-strip";
import { getTitleBySlug, honorificPathHref } from "@/lib/community-titles";

function honorificItem(slug: string): HomeRecognitionItem {
  const title = getTitleBySlug(slug);
  if (!title) {
    throw new Error(`mock-user: unknown honorific slug "${slug}"`);
  }
  return {
    id: `honorific-${slug}`,
    label: title.name,
    href: honorificPathHref(title),
    kind: "title",
  };
}

/**
 * Phase 1 stand-in until profile / wallet data exists.
 * Replace `recognitionItems` (and optional `handle`) with session or API results.
 */
export const MOCK_USER = {
  handle: "preview-neighbor",
  recognitionItems: [
    honorificItem("maestro-orator"),
    honorificItem("beacon-herald"),
    { id: "badge-weekly-space", label: "Weekly Space host", kind: "badge" as const },
  ] satisfies readonly HomeRecognitionItem[],
} as const;
