import { CommunityHomeStrip } from "@/components/community-home-strip";
import { ProjectHub } from "@/components/project-hub";
import { SiteShell } from "@/components/site-shell";
import { PROJECTS } from "@/lib/projects";

export default function HomePage() {
  return (
    <SiteShell>
      <ProjectHub initialProjects={PROJECTS} />
      <CommunityHomeStrip />
    </SiteShell>
  );
}
