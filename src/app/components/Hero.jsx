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
        {/* Ambient soft shadow behind the headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[420px] w-[min(720px,90vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(9,9,11,0.05),transparent_70%)]"
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xl font-medium tracking-wide text-zinc-700 shadow-xs backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-zinc-800" />
              {profile.greeting} {profile.firstName} — {profile.role}
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-gradient text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-5xl"
            >
              Full-Stack Engineer — Crafting Fluid Front-Ends &amp; Scalable Back-Ends.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-lg leading-relaxed text-zinc-600"
            >
              I ship product-grade experiences end to end — polished React interfaces,
              thoughtfully architected Node.js services, and databases that stay fast under pressure.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={springHover}
                className="group inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(9,9,11,0.5)] transition-colors hover:bg-zinc-800 hover:shadow-[0_12px_48px_-10px_rgba(9,9,11,0.6)]"
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
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 hover:border-zinc-400"
              >
                Get in Touch
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-4 flex items-center gap-6 text-xs text-zinc-500"
            >
              <span><span className="font-semibold text-zinc-950">6+</span> yrs experience</span>
              <span className="h-3 w-px bg-zinc-300" />
              <span><span className="font-semibold text-zinc-950">48+</span> projects</span>
              <span className="h-3 w-px bg-zinc-300" />
              <span><span className="font-semibold text-zinc-950">27+</span> APIs engineered</span>
            </motion.div>
          </motion.div>

          {/* Profile portrait — minimalist double-ring frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.3 }}
            className="relative mx-auto flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={springHover}
              className="relative group"
            >
              {/* Outer ring: slow rotating light metallic conic border */}
              <motion.span
                aria-hidden
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #09090b, #52525b, #d4d4d8, #e4e4e7, #f4f4f5, #09090b)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 60%), black calc(100% - 58%))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 60%), black calc(100% - 58%))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner hairline ring */}
              <span
                aria-hidden
                className="absolute -inset-0.5 rounded-full border border-zinc-300"
              />

              {/* White ring + soft shadow */}
              <span aria-hidden className="glow-ring absolute -inset-2 rounded-full" />

              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border border-zinc-300 bg-white p-1 shadow-md sm:h-[340px] sm:w-[340px]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-zinc-100">
                  <Image
                    src={profile.avatar}
                    alt={`${profile.name} — portrait`}
                    width={340}
                    height={340}
                    className="h-full w-full object-cover "
                    priority
                  />
                  <span className="scanline absolute inset-0" />
                </div>
              </div>

              {/* Pulsing charcoal live dot on the ring */}
              <span className="absolute right-3 top-3 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900 opacity-30" />
                <span className="relative inline-flex h-3 w-3 rounded-full border border-white bg-zinc-900 shadow-[0_0_12px_rgba(9,9,11,0.35)]" />
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 20 }}
              className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.status}
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-zinc-500 transition-colors hover:text-zinc-800 md:flex"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        </motion.a>
      </AnimatedBackground>
    </section>
  );
}