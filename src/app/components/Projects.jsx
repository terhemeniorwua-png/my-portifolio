"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projects } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer, viewportOnce, springHover } from "./animations";

// Filter categories
const FILTERS = ["All", "Frontend", "Full Stack", "Backend"];

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      variants={fadeInUp}
      custom={index % 3}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#DED5C8] bg-[#FFFDF9] shadow-sm transition-all duration-300 hover:border-[#2457D6]/25 hover:shadow-xl hover:shadow-[#2457D6]/5 hover:-translate-y-1"
    >
      {/* Screenshot */}
      <div className="relative h-52 overflow-hidden bg-[#F0E8DA] sm:h-56">
        <Image
          src={project.screenshot}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category chip on image */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full border border-white/30 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-[#171717] backdrop-blur-sm">
            {project.category}
          </span>
        </div>
        {/* Corner link icon */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live demo`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/80 text-[#171717] backdrop-blur-sm transition-colors hover:bg-[#2457D6] hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-lg font-bold text-[#171717] transition-colors group-hover:text-[#2457D6]">
            {project.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-[#2457D6]">{project.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#6B665E]">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-1.5">
          {project.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#2457D6]" />
              <span className="text-xs text-[#9A938A]">{h}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#DED5C8] bg-[#F7F3EC] px-2.5 py-0.5 font-mono text-[10px] text-[#6B665E]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-4 py-2 text-xs font-semibold text-[#F7F3EC] transition-all hover:bg-[#2457D6] hover:shadow-md hover:shadow-[#2457D6]/20"
          >
            Live Demo
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#DED5C8] bg-[#FFFDF9] px-4 py-2 text-xs font-semibold text-[#6B665E] transition-all hover:border-[#171717] hover:text-[#171717]"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              Things I&apos;ve built
              <br />
              <span className="text-cobalt-gradient">and shipped.</span>
            </>
          }
          description="Real projects, deployed to the web. No fake demos, no invented links."
        />

        {/* Filter tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "border-[#2457D6] bg-[#2457D6] text-white shadow-md shadow-[#2457D6]/20"
                  : "border-[#DED5C8] bg-[#FFFDF9] text-[#6B665E] hover:border-[#2457D6]/40 hover:text-[#2457D6]"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 py-16 text-center text-[#9A938A]"
            >
              No projects in this category yet.
            </motion.p>
          )}
        </motion.div>

        {/* GitHub CTA inline */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/terhemeniorwua-png"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#6B665E] transition-colors hover:text-[#2457D6]"
          >
            <GithubIcon className="h-4 w-4" />
            More projects on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
