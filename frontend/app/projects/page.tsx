import { ProjectHub } from "@/components/project-hub";
import { SiteShell } from "@/components/site-shell";
import { PROJECTS } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description:
    "Browse Community Foundry projects—missions, milestones, and transparent funding lanes on Sui.",
};

export default function ProjectsPage() {
  return (
    <SiteShell>
      <ProjectHub initialProjects={PROJECTS} />
    </SiteShell>
  );
}
