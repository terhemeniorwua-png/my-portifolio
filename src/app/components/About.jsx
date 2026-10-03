"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import { fadeInUp, fadeInLeft, staggerContainer, viewportOnce, springHover } from "./animations";

// The progression shown in the About section
const progression = [
  { step: "HTML & CSS", detail: "Layout, semantics, responsive design" },
  { step: "JavaScript", detail: "Language fundamentals, async, DOM" },
  { step: "React", detail: "Components, hooks, state management" },
  { step: "Next.js", detail: "SSR, routing, deployment" },
  { step: "Node.js + Express", detail: "REST APIs, middleware, validation" },
  { step: "Auth + Security", detail: "JWT, bcrypt, role-based access" },
  { step: "PostgreSQL + MongoDB", detail: "Schema design, queries, ORMs" },
  { step: "Full-Stack Applications", detail: "UI → API → Database → Deploy" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Learning by building.
              <br />
              <span className="text-cobalt-gradient">Building to understand.</span>
            </>
          }
          description="Every skill I have came from building something real with it."
          align="left"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left — bio and approach */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {profile.bio.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeInUp}
                custom={i}
                className="text-base leading-relaxed text-[#6B665E]"
              >
                {para}
              </motion.p>
            ))}

            <motion.div variants={fadeInUp} custom={2}>
              <GlowCard variant="sand" className="mt-2">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#9A938A] mb-3">
                  What I build
                </p>
                <div className="space-y-2">
                  {[
                    "Complete frontend UIs with React and Next.js",
                    "Structured REST APIs with Node.js and Express",
                    "JWT authentication and role-based authorization",
                    "PostgreSQL and MongoDB database integration",
                    "Deployed applications on Vercel and Render",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2457D6]" />
                      <span className="text-sm text-[#6B665E]">{item}</span>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </motion.div>

            <motion.div variants={fadeInUp} custom={3}>
              <div className="flex flex-wrap gap-2">
                {["React / Next.js", "Node.js / APIs", "PostgreSQL / MongoDB"].map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-[#DED5C8] bg-[#FFFDF9] px-3 py-1 font-mono text-xs text-[#6B665E]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — progression timeline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col"
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[#9A938A]">
              Learning progression
            </p>
            <div className="relative flex flex-col gap-0">
              {/* Vertical line */}
              <div className="absolute left-[9px] top-3 bottom-3 w-px bg-[#DED5C8]" />

              {progression.map((item, i) => {
                const isFinal = i === progression.length - 1;
                return (
                  <motion.div
                    key={item.step}
                    variants={fadeInUp}
                    custom={i * 0.5}
                    className="relative flex items-start gap-4 pb-5"
                  >
                    {/* Node */}
                    <span
                      className={`relative z-10 mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        isFinal
                          ? "border-[#2457D6] bg-[#2457D6]"
                          : "border-[#C4B9AB] bg-[#F7F3EC]"
                      }`}
                    >
                      {isFinal && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F7F3EC]" />
                      )}
                    </span>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          isFinal ? "text-[#2457D6]" : "text-[#171717]"
                        }`}
                      >
                        {item.step}
                      </p>
                      <p className="mt-0.5 text-xs text-[#9A938A]">{item.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
