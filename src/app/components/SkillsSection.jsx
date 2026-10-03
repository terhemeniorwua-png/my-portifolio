"use client";

import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench } from "lucide-react";
import { skillCategories } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer, viewportOnce, springHover } from "./animations";

const iconMap = {
  layout: Layout,
  server: Server,
  database: Database,
  wrench: Wrench,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-20 py-24 bg-[#F0E8DA]/40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              A full-stack toolkit,
              <br />
              <span className="text-cobalt-gradient">engineered layer by layer.</span>
            </>
          }
          description="Four areas, each learned by shipping real projects."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Layout;
            return (
              <motion.div
                key={cat.id}
                variants={fadeInUp}
                custom={i}
                whileHover={{ y: -4 }}
                transition={springHover}
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[#DED5C8] bg-[#FFFDF9] p-7 shadow-sm transition-all duration-300 hover:border-[#2457D6]/25 hover:shadow-lg hover:shadow-[#2457D6]/5">
                  {/* Sheen line */}
                  <span
                    aria-hidden
                    className="sheen pointer-events-none absolute inset-x-0 top-0 h-px"
                  />

                  {/* Card header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2457D6]">
                        {cat.number}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#171717]">
                        {cat.label}
                      </h3>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#DED5C8] bg-[#F0E8DA] text-[#6B665E] transition-all duration-300 group-hover:border-[#2457D6]/30 group-hover:bg-[#2457D6]/8 group-hover:text-[#2457D6]">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-[#6B665E]">
                    {cat.description}
                  </p>

                  {/* Skills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ y: -2, scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={springHover}
                        className="cursor-default rounded-full border border-[#DED5C8] bg-[#F7F3EC] px-3 py-1 font-mono text-xs text-[#6B665E] transition-all duration-200 hover:border-[#2457D6]/40 hover:bg-[#2457D6]/5 hover:text-[#2457D6]"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
