import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/faq-accordion";
import { ProjectCard } from "@/components/project-card";
import { RewardIcons } from "@/components/reward-icons";
import { SiteShell } from "@/components/site-shell";
import { getAllSlugs, getProjectBySlug, PROJECTS } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project · Foundry" };
  return {
    title: `${project.name} · Community Foundry`,
    description: project.shortGoal,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const pct = Math.min(100, Math.round((project.raisedSui / Math.max(1, project.targetSui)) * 100));
  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <SiteShell>
      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="text-sm text-zinc-500" aria-label="Breadcrumb">
          <Link
            href="/"
            className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foundry-ember)]"
          >
            Projects
          </Link>
          <span className="mx-2" aria-hidden>
            /
          </span>
          <span className="text-zinc-300">{project.name}</span>
        </nav>

        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {project.category}
            </span>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              {project.status}
            </span>
            <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
              {project.impact}
            </span>
          </div>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-white sm:text-5xl">{project.name}</h1>
          <p className="mt-3 text-lg text-zinc-400">{project.shortGoal}</p>
          <p className="mt-4 text-sm text-zinc-500">Last updated {project.updatedAt}</p>
        </header>

        <section id="contribute" className="mt-10 scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-white">Funding</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Target and raised values are illustrative in Phase 1. Live wallet balance and explorer links arrive with
            platform integration.
          </p>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm text-zinc-400">Progress</span>
            <span className="font-mono text-white">
              {project.raisedSui.toLocaleString()} / {project.targetSui.toLocaleString()} SUI ({pct}%)
            </span>
          </div>
          <div
            className="mt-2 h-4 w-full overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={`Funding ${pct} percent`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--foundry-ember)] to-[var(--foundry-gold)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          {project.walletLabel ? (
            <p className="mt-3 font-mono text-xs text-zinc-500">{project.walletLabel}</p>
          ) : null}
          <button
            type="button"
            disabled
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-zinc-500"
            title="Coming when wallets are wired"
          >
            Donate (Phase 2)
          </button>
        </section>

        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-white">Rewards</h2>
          <p className="mt-2 text-sm text-zinc-400">Types for this project</p>
          <div className="mt-3">
            <RewardIcons types={project.rewardTypes} />
          </div>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-zinc-400">
                <tr>
                  <th className="px-4 py-3">From (SUI)</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Perks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {project.tiers.map((t) => (
                  <tr key={t.label} className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-white">≥ {t.minSui}</td>
                    <td className="px-4 py-3 text-zinc-200">{t.label}</td>
                    <td className="px-4 py-3 text-zinc-400">
                      <ul className="list-disc pl-4">
                        {t.perks.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-white">Why this matters</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-400">
            {project.whyItMatters.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-zinc-500">{project.description}</p>
        </section>

        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-white">Milestones</h2>
          <ol className="mt-4 space-y-3">
            {project.milestones.map((m) => (
              <li
                key={m.id}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-300"
              >
                <span className="mt-0.5 font-mono text-[var(--foundry-ember-bright)]" aria-hidden>
                  {m.done ? "✓" : "○"}
                </span>
                <div>
                  <p className="text-white">{m.title}</p>
                  {m.eta ? <p className="text-xs text-zinc-500">{m.eta}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {project.team.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-white">Team & leads</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.team.map((m) => (
                <li key={m.name} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <p className="font-medium text-white">{m.name}</p>
                  <p className="text-sm text-zinc-400">{m.role}</p>
                  {m.handle ? <p className="mt-1 font-mono text-xs text-zinc-500">{m.handle}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-white">Transparency</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Recent transactions and a Sui explorer deep link will appear here once the per-project wallet API is
            connected.
          </p>
          <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-black/20 px-4 py-8 text-center text-sm text-zinc-500">
            No on-chain activity to show yet (Phase 1).
          </div>
        </section>

        {project.faqs.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-white">FAQs</h2>
            <div className="mt-4">
              <FaqAccordion items={project.faqs} />
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-white">Related projects</h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} query="" />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </SiteShell>
  );
}
