"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Braces,
  Diamond,
  FileCode,
  GitBranch,
  Hexagon,
  Palette,
  Plug,
  Server,
  Triangle,
  Zap,
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { skills } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer, viewportOnce, springHover } from "./animations";

const skillIcons = {
  "HTML": FileCode,
  "Tailwind CSS": Palette,
  "JavaScript": Braces,
  "React": Atom,
  "Next.js": Triangle,
  "Node.js": Hexagon,
  "Express": Server,
  "API": Plug,
  "Git": GitBranch,
  "GitHub": GithubIcon,
  "Vercel": Zap,
  "Render": Diamond,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              Tools I build<br />
              <span className="text-gradient">with every day.</span>
            </>
          }
          description="A focused toolkit for shipping modern web applications — from semantic markup to deployed, production-grade APIs."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {skills.map((skill, i) => {
            const Icon = skillIcons[skill.name] || FileCode;
            return (
              <motion.div key={skill.name} variants={fadeInUp} custom={i}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springHover}
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-2xs transition-all duration-300 hover:border-zinc-400 hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-zinc-950">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{skill.category}</span>
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}