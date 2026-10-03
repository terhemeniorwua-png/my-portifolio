"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolioData";
import { fadeInUp, staggerContainer, springHover } from "./animations";
import { AnimatedBackground } from "./AnimatedBackground";
import { useUi } from "./UiProvider";

export default function Hero() {
  const { openContact } = useUi();

  return (
    <section id="top" className="relative flex min-h-svh items-center py-28 md:py-32">
      <AnimatedBackground>
        {/* Top radial ambient */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[500px] w-[min(800px,90vw)] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(34,211,238,0.08) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left column — text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6"
          >
            {/* Badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/[0.07] px-3.5 py-1.5 text-sm font-medium tracking-wide text-cyan-300 backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              {profile.greeting} {profile.firstName} — {profile.role}
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-5xl"
            >
              Full-Stack Engineer{" "}
              <span className="block text-gradient mt-1">
                Crafting Fluid Front-Ends &amp; Scalable Back-Ends.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-lg leading-relaxed text-slate-400"
            >
              I ship product-grade experiences end to end — polished React interfaces,
              thoughtfully architected Node.js services, and databases that stay fast under pressure.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={springHover}
                className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-[#050508] shadow-lg transition-all btn-glow-cyan"
                style={{ background: "linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)" }}
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={springHover}
                onClick={openContact}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-all hover:border-white/[0.2] hover:bg-white/[0.08] hover:text-white"
              >
                Get in Touch
              </motion.button>
            </motion.div>

            {/* Micro stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-4 flex items-center gap-6 font-mono text-xs text-slate-500"
            >
              <span>
                <span className="font-bold text-cyan-400">6+</span> yrs experience
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span>
                <span className="font-bold text-violet-400">48+</span> projects
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span>
                <span className="font-bold text-emerald-400">27+</span> APIs engineered
              </span>
            </motion.div>
          </motion.div>

          {/* Right column — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.3 }}
            className="relative mx-auto flex flex-col items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={springHover}
              className="relative group"
            >
              {/* Outer animated conic gradient ring */}
              <motion.span
                aria-hidden
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #22d3ee, #a78bfa, #f472b6, #34d399, #22d3ee)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner hairline */}
              <span
                aria-hidden
                className="absolute -inset-0.5 rounded-full border border-white/[0.06]"
              />

              {/* Glow halo */}
              <span
                aria-hidden
                className="absolute -inset-4 rounded-full opacity-40"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(167,139,250,0.1) 50%, transparent 70%)",
                  filter: "blur(16px)",
                }}
              />

              {/* Portrait */}
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border border-white/[0.08] bg-[#111118] p-1 shadow-2xl sm:h-[340px] sm:w-[340px]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1a1a28]">
                  <Image
                    src={profile.avatar}
                    alt={`${profile.name} — portrait`}
                    width={340}
                    height={340}
                    className="h-full w-full object-cover"
                    priority
                  />
                  <span className="scanline absolute inset-0" />
                </div>
              </div>

              {/* Live dot indicator */}
              <span className="absolute right-3 top-3 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-3 w-3 rounded-full border border-[#050508] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              </span>
            </motion.div>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 20 }}
              className="mt-4 flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.08] bg-[#111118]/90 px-3.5 py-1.5 text-xs font-semibold text-slate-200 shadow-lg backdrop-blur md:absolute md:left-1/2 md:top-auto md:-bottom-5 md:mt-0 md:-translate-x-1/2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.status}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-slate-600 transition-colors hover:text-cyan-400 md:flex"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        </motion.a>
      </AnimatedBackground>
    </section>
  );
}
