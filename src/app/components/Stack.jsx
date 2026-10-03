"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { Database, Layout, Server, Wrench } from "lucide-react";
import { stack, stats } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import { fadeInUp, staggerContainer, viewportOnce } from "./animations";

const groupIcon = { layout: Layout, server: Server, database: Database, wrench: Wrench };

const groupColors = [
  { text: "text-cyan-400", chip: "border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_16px_rgba(34,211,238,0.2)]", glow: "cyan" },
  { text: "text-violet-400", chip: "border-violet-500/25 bg-violet-500/[0.07] text-violet-300 hover:border-violet-500/50 hover:shadow-[0_0_16px_rgba(167,139,250,0.2)]", glow: "violet" },
  { text: "text-emerald-400", chip: "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-300 hover:border-emerald-500/50 hover:shadow-[0_0_16px_rgba(52,211,153,0.2)]", glow: "emerald" },
];

const statColors = ["text-cyan-400", "text-violet-400", "text-emerald-400", "text-pink-400"];
const statGlows = ["cyan", "violet", "emerald", "pink"];

function StatCounter({ value, suffix, inView, colorClass }) {
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
    <span className={`text-3xl font-extrabold tabular-nums ${colorClass}`}>
      {display}
      <span className="text-slate-600 text-xl">{suffix}</span>
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
              Weapons of choice,{" "}
              <span className="text-gradient">sharpened daily.</span>
            </>
          }
          description="A pragmatic stack for shipping full-stack products — no cargo culting, just tools that earn their place."
        />

        <div ref={statGroupRef} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <GlowCard key={s.label} className="flex flex-col items-center justify-center py-6 text-center" glowColor={statGlows[i % statGlows.length]}>
              <StatCounter value={s.value} suffix={s.suffix} inView={statsInView} colorClass={statColors[i % statColors.length]} />
              <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-600">
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
            const c = groupColors[gi % groupColors.length];
            return (
              <motion.div key={group.label} variants={fadeInUp} custom={gi}>
                <GlowCard className="h-full" glowColor={c.glow}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-[#0d0d14]`}>
                      <Icon className={`h-5 w-5 ${c.text}`} />
                    </span>
                    <h3 className={`font-semibold ${c.text}`}>{group.label}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-default rounded-full border px-3 py-1 font-mono text-xs transition-all duration-200 ${c.chip}`}
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
