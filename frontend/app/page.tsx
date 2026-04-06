import { FoundryHomeHero } from "@/components/foundry-home-hero";
import { HomeRecognitionStrip } from "@/components/home-recognition-strip";
import { SiteShell } from "@/components/site-shell";
import { MOCK_USER } from "@/lib/mock-user";

export const metadata = {
  title: "Home",
  description:
    "Seven pillars, earned paths, and recognition—where your commitments meet the work at Community Foundry.",
};

export default function HomePage() {
  return (
    <SiteShell>
      <HomeRecognitionStrip items={MOCK_USER.recognitionItems} />
      <FoundryHomeHero />
    </SiteShell>
  );
}
