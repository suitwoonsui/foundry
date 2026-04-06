import { notFound } from "next/navigation";
import { HonorificDeepLinkRedirect } from "@/components/honorific-deep-link-redirect";
import { SiteShell } from "@/components/site-shell";
import { getAllTitleSlugs, getTitleBySlug, honorificPathHref } from "@/lib/community-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTitleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) return { title: "Honorific · Foundry" };
  return {
    title: `${title.name} · Paths`,
    description: title.description,
  };
}

/** Deep links: honorific copy lives under Paths; fragment requires a client redirect. */
export default async function HonorificDeepLinkPage({ params }: Props) {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) notFound();

  return (
    <SiteShell>
      <HonorificDeepLinkRedirect href={honorificPathHref(title)} />
    </SiteShell>
  );
}
