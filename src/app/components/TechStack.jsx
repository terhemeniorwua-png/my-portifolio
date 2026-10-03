"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "./animations";

const layers = [
  {
    label: "React / Next.js",
    sublabel: "UI Layer",
    description: "Component architecture, routing, server rendering",
    accent: "cobalt",
  },
  {
    label: "Node.js / Express",
    sublabel: "API Layer",
    description: "REST endpoints, middleware, request validation",
    accent: "neutral",
  },
  {
    label: "JWT / bcrypt",
    sublabel: "Auth Layer",
    description: "Secure tokens, password hashing, protected routes",
    accent: "neutral",
  },
  {
    label: "PostgreSQL / MongoDB",
    sublabel: "Data Layer",
    description: "Schema design, queries, ORMs, data persistence",
    accent: "neutral",
  },
  {
    label: "Vercel / Render",
    sublabel: "Deploy Layer",
    description: "Continuous deployment, environment config, live URLs",
    accent: "neutral",
  },
];

export default function TechStack() {
  return (
    <section className="section-dark py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center"
        >
          {/* Left — heading + copy */}
          <div>
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2457D6]"
            >
              <span className="h-px w-6 rounded-full bg-[#2457D6]" />
              The Stack
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F7F3EC] sm:text-4xl"
            >
              The technology behind
              <br />
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #4A73E8, #2457D6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                every project.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              custom={2}
              className="mt-4 text-base leading-relaxed text-[#9A938A]"
            >
              I build applications as connected systems — each layer has a clear
              responsibility and communicates cleanly with the others. That's what makes
              full-stack development more than just writing code for two different places.
            </motion.p>

            <motion.div variants={fadeInUp} custom={3} className="mt-8 flex flex-wrap gap-3">
              {["REST APIs", "JWT Auth", "CRUD", "Deployment", "PostgreSQL"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#292524] bg-[#292524] px-3 py-1 font-mono text-xs text-[#9A938A]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — stack layers */}
          <div className="flex flex-col gap-2">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.label}
                variants={fadeInUp}
                custom={i * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="group relative"
              >
                {/* Connector line */}
                {i < layers.length - 1 && (
                  <div className="absolute left-5 top-full h-2 w-px bg-[#292524] z-10" />
                )}

                <div
                  className={`relative flex items-center gap-4 rounded-xl border px-5 py-4 transition-all duration-300 ${
                    layer.accent === "cobalt"
                      ? "border-[#2457D6]/40 bg-[#2457D6]/10"
                      : "border-[#292524] bg-[#171717] hover:border-[#3a3632]"
                  }`}
                >
                  {/* Dot */}
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      layer.accent === "cobalt" ? "bg-[#2457D6]" : "bg-[#3a3632]"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm font-semibold ${
                          layer.accent === "cobalt" ? "text-[#4A73E8]" : "text-[#F7F3EC]"
                        }`}
                      >
                        {layer.label}
                      </p>
                      <span className="rounded-full border border-[#292524] px-2 py-0.5 font-mono text-[9px] text-[#6B665E]">
                        {layer.sublabel}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#6B665E]">{layer.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#292524] transition-colors group-hover:text-[#9A938A]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
