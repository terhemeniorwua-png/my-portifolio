"use client";

import { projects } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Featured Projects"
          title={
            <>
              Things I&apos;ve<br />
              <span className="text-gradient">built & shipped.</span>
            </>
          }
          description="Each card embeds a live preview (or a screenshot fallback) plus the architecture, API surface and database schema behind the product."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}