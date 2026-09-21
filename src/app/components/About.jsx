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
    accent: "from-zinc-100 to-zinc-50 text-zinc-800",
  },
  {
    icon: Server,
    title: "Back-End",
    text: "Node.js services and REST/GraphQL APIs built for clear contract design, observability and resilience.",
    accent: "from-zinc-100 to-zinc-50 text-zinc-800",
  },
  {
    icon: Workflow,
    title: "System Architecture",
    text: "From monolith to event-driven microservices — caching, queues, replicas and the trade-offs that matter.",
    accent: "from-zinc-100 to-zinc-50 text-zinc-800",
  },
];

function AnimatedNumber({ value, suffix }) {
  return (
    <span className="tabular-nums">
      {value}
      <span className="text-zinc-400">{suffix}</span>
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
              Engineer by trade,
              <br />
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
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <GlowCard className="h-full">
              <h3 className="text-lg font-semibold text-zinc-950">Who I am</h3>
              {profile.bio.map((para) => (
                <p key={para} className="mt-3 leading-relaxed text-zinc-600">
                  {para}
                </p>
              ))}
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.focus.map((f) => (
                  <span
                    key={f}
                    className="font-mono text-xs uppercase tracking-wider rounded-full bg-zinc-100 px-3 py-1 text-zinc-800 border border-zinc-300/80"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <GlowCard className="h-full flex flex-col justify-center">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <span className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-500">
                  {stat.label}
                </span>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

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
              <GlowCard className="h-full">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent}`}
                >
                  <card.icon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 font-semibold text-zinc-950">{card.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{card.text}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}