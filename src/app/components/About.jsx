"use client";

import { motion } from "framer-motion";
import { Code2, Server, Workflow } from "lucide-react";
import { profile, stats } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import { fadeInUp, staggerContainer, viewportOnce, springHover } from "./animations";

const focusCards = [
  {
    icon: Code2,
    title: "Front-End",
    text: "Pixel-perfect React interfaces with fluid motion, accessible markup and obsessive performance budgets.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    glow: "cyan",
  },
  {
    icon: Server,
    title: "Back-End",
    text: "Node.js services and REST/GraphQL APIs built for clear contract design, observability and resilience.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    glow: "violet",
  },
  {
    icon: Workflow,
    title: "System Architecture",
    text: "From monolith to event-driven microservices — caching, queues, replicas and the trade-offs that matter.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    glow: "emerald",
  },
];

const statColors = ["text-cyan-400", "text-violet-400", "text-emerald-400", "text-pink-400"];
const statGlows = ["cyan", "violet", "emerald", "pink"];

function AnimatedNumber({ value, suffix, colorClass }) {
  return (
    <span className={`text-4xl font-extrabold tabular-nums ${colorClass}`}>
      {value}
      <span className="text-slate-500 text-2xl">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Engineer by trade,{" "}
              <span className="text-gradient">craftsman by mindset.</span>
            </>
          }
          description={`${profile.name} — building production software for ${stats[0].value}+ years across fintech, analytics and ops.`}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {/* Bio card — spans 2 cols */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <GlowCard className="h-full" glowColor="cyan">
              <h3 className="text-lg font-semibold text-white">Who I am</h3>
              {profile.bio.map((para) => (
                <p key={para} className="mt-3 leading-relaxed text-slate-400">
                  {para}
                </p>
              ))}
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.focus.map((f) => (
                  <span
                    key={f}
                    className="font-mono text-xs uppercase tracking-wider rounded-full border border-cyan-500/20 bg-cyan-500/[0.07] px-3 py-1 text-cyan-300"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* Stat cards */}
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <GlowCard className="h-full flex flex-col justify-center" glowColor={statGlows[i % statGlows.length]}>
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  colorClass={statColors[i % statColors.length]}
                />
                <span className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                  {stat.label}
                </span>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Focus area cards */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-6 grid gap-6 md:grid-cols-3"
        >
          {focusCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -6 }}
              transition={springHover}
            >
              <GlowCard className="h-full" glowColor={card.glow}>
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${card.bg}`}
                >
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </span>
                <h4 className={`mt-4 font-semibold ${card.color}`}>{card.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.text}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
