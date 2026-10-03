"use client";

import { motion } from "framer-motion";
import {
  Atom, Braces, Diamond, FileCode, GitBranch, Hexagon,
  Palette, Plug, Server, Triangle, Zap,
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

// Cycling accent colors for skill chips
const chipColors = [
  { icon: "text-cyan-400", border: "hover:border-cyan-500/40", bg: "hover:bg-cyan-500/[0.06]", glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]" },
  { icon: "text-violet-400", border: "hover:border-violet-500/40", bg: "hover:bg-violet-500/[0.06]", glow: "hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]" },
  { icon: "text-emerald-400", border: "hover:border-emerald-500/40", bg: "hover:bg-emerald-500/[0.06]", glow: "hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]" },
  { icon: "text-pink-400", border: "hover:border-pink-500/40", bg: "hover:bg-pink-500/[0.06]", glow: "hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              Tools I build{" "}
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
            const c = chipColors[i % chipColors.length];

            return (
              <motion.div key={skill.name} variants={fadeInUp} custom={i}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springHover}
                  className={`group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#111118]/80 p-4 shadow-lg shadow-black/30 transition-all duration-300 ${c.border} ${c.bg} ${c.glow} cursor-default`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-[#0d0d14]`}>
                    <Icon className={`h-5 w-5 ${c.icon}`} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-slate-200">
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs text-slate-500">{skill.category}</span>
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
