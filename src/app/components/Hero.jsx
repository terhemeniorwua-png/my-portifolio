"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { profile } from "@/data/portfolioData";
import { fadeInUp, fadeInRight, staggerContainer, springHover } from "./animations";
import { useUi } from "./UiProvider";

// Tech badge component
function TechBadge({ label, delay = 0, className = "" }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#DED5C8] bg-[#FFFDF9] px-3 py-1.5 font-mono text-[11px] font-medium text-[#6B665E] shadow-sm ${className}`}
    >
      {label}
    </motion.span>
  );
}

// Stack layer for the right visual panel
function StackLayer({ label, sublabel, index }) {
  const isAccent = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 ${
        isAccent
          ? "border-[#2457D6]/30 bg-[#2457D6]/6"
          : "border-[#DED5C8] bg-[#FFFDF9]"
      }`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${isAccent ? "bg-[#2457D6]" : "bg-[#DED5C8]"}`} />
      <div>
        <p className={`text-sm font-semibold ${isAccent ? "text-[#2457D6]" : "text-[#171717]"}`}>
          {label}
        </p>
        <p className="font-mono text-[10px] text-[#9A938A]">{sublabel}</p>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { openContact } = useUi();

  const layers = [
    { label: "React / Next.js", sublabel: "UI Layer" },
    { label: "Node.js / Express", sublabel: "API Layer" },
    { label: "JWT Auth", sublabel: "Security Layer" },
    { label: "PostgreSQL", sublabel: "Data Layer" },
    { label: "Vercel / Render", sublabel: "Deploy Layer" },
  ];

  return (
    <section
      id="top"
      className="relative min-h-svh pt-24 pb-16 md:pt-28 md:pb-24 flex items-center overflow-hidden"
    >
      {/* Warm radial background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, #E8DCCB 0%, #F7F3EC 55%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />
      {/* Cobalt accent top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[400px] w-[400px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, #2457D6 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left column ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6"
          >
            {/* Status badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#DED5C8] bg-[#FFFDF9] px-3.5 py-1.5 text-xs font-medium text-[#6B665E] shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.status}
            </motion.span>

            {/* Headline */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-2">
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#171717] sm:text-5xl md:text-[3.25rem]">
                {profile.greeting}{" "}
                <span className="text-cobalt-gradient">{profile.firstName}.</span>
              </h1>
              <p className="font-display text-xl font-semibold text-[#6B665E] sm:text-2xl leading-snug">
                {profile.headline}
              </p>
            </motion.div>

            {/* Sub-copy */}
            <motion.p
              variants={fadeInUp}
              className="max-w-lg text-base leading-relaxed text-[#6B665E]"
            >
              {profile.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={springHover}
                className="group inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-[#F7F3EC] shadow-md transition-all hover:bg-[#2457D6] hover:shadow-lg hover:shadow-[#2457D6]/20"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={springHover}
                onClick={openContact}
                className="inline-flex items-center gap-2 rounded-full border border-[#DED5C8] bg-[#FFFDF9] px-6 py-3 text-sm font-semibold text-[#171717] shadow-sm transition-all hover:border-[#2457D6]/40 hover:shadow-md"
              >
                Contact Me
              </motion.button>

              <motion.a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={springHover}
                aria-label="GitHub profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DED5C8] bg-[#FFFDF9] text-[#6B665E] shadow-sm transition-all hover:border-[#171717] hover:text-[#171717]"
              >
                <GithubIcon className="h-5 w-5" />
              </motion.a>
            </motion.div>

            {/* Tech badges row */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 pt-2">
              {["React", "Next.js", "Node.js", "PostgreSQL", "REST APIs"].map(
                (tech, i) => (
                  <TechBadge key={tech} label={tech} delay={0.8 + i * 0.07} />
                )
              )}
            </motion.div>
          </motion.div>

          {/* ── Right column ── */}
          <div className="relative flex items-center justify-center">
            {/* Sand shape behind portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
              className="absolute h-[380px] w-[380px] rounded-[40%_60%_55%_45%/45%_55%_45%_55%] bg-[#E8DCCB] sm:h-[440px] sm:w-[440px]"
            />

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 h-[300px] w-[240px] overflow-hidden rounded-3xl border border-[#DED5C8] shadow-2xl shadow-[#171717]/10 sm:h-[360px] sm:w-[290px]"
            >
              <Image
                src={profile.avatar}
                alt={`${profile.name} — Full-Stack Web Developer`}
                fill
                sizes="(max-width: 640px) 240px, 290px"
                className="object-cover object-top"
                priority
              />
            </motion.div>

            {/* Floating stack layers — desktop only */}
            <div className="absolute -right-4 top-8 hidden flex-col gap-2 xl:flex">
              {layers.map((layer, i) => (
                <StackLayer key={layer.label} {...layer} index={i} />
              ))}
            </div>

            {/* Stack preview — visible on tablet too, smaller */}
            <div className="absolute -bottom-4 left-0 hidden flex-col gap-1.5 lg:flex xl:hidden">
              {layers.slice(0, 3).map((layer, i) => (
                <StackLayer key={layer.label} {...layer} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          aria-label="Scroll to About section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[#9A938A] transition-colors hover:text-[#2457D6] md:flex"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        </motion.a>
      </div>
    </section>
  );
}
