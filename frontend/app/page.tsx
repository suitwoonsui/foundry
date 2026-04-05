import { FoundryHomeHero } from "@/components/foundry-home-hero";
import { SiteShell } from "@/components/site-shell";

export const metadata = {
  title: "Home",
  description:
    "Seven pillars, earned paths, and recognition—where your commitments meet the work at Community Foundry.",
};

export default function HomePage() {
  return (
    <SiteShell>
      <FoundryHomeHero />
    </SiteShell>
  );
}
