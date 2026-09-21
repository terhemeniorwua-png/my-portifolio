"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Database, Layout, Server, Wrench } from "lucide-react";
import { stack, stats } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import { fadeInUp, staggerContainer, viewportOnce } from "./animations";

const groupIcon = { layout: Layout, server: Server, database: Database, wrench: Wrench };

function StatCounter({ value, suffix, inView }) {
  const [display, setDisplay] = useState(0);
  const didRun = useRef(false);

  useEffect(() => {
    if (!inView || didRun.current) return;
    didRun.current = true;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {display}
      <span className="text-zinc-400">{suffix}</span>
    </span>
  );
}

export default function Stack() {
  const statGroupRef = useRef(null);
  const statsInView = useInView(statGroupRef, { once: true, margin: "-80px" });
  const groups = Object.values(stack);

  return (
    <section id="stack" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Tech Stack"
          title={
            <>
              Weapons of choice,<br />
              <span className="text-gradient">sharpened daily.</span>
            </>
          }
          description="A pragmatic stack for shipping full-stack products — no cargo culting, just tools that earn their place."
        />

        <div ref={statGroupRef} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <GlowCard key={s.label} className="flex flex-col items-center justify-center py-6 text-center">
              <span className="text-gradient text-3xl font-extrabold">
                <StatCounter value={s.value} suffix={s.suffix} inView={statsInView} />
              </span>
              <span className="mt-2 text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                {s.label}
              </span>
            </GlowCard>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {groups.map((group, gi) => {
            const Icon = groupIcon[group.icon] || Wrench;
            return (
              <motion.div key={group.label} variants={fadeInUp} custom={gi}>
                <GlowCard className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 border border-zinc-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-semibold text-zinc-950">{group.label}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{ y: -3, scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        className="font-mono text-xs uppercase tracking-wider cursor-default rounded-full bg-zinc-100 px-3 py-1 text-zinc-800 border border-zinc-300/80 transition-colors hover:border-zinc-400 hover:text-zinc-950 hover:shadow-sm"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}