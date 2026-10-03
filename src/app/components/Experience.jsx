"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import { fadeInUp, viewportOnce } from "./animations";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              The road{" "}
              <span className="text-gradient">so far.</span>
            </>
          }
          description="A walk through the teams, products and problems I've had the privilege to build for."
        />

        <div className="relative mt-16">
          {/* Timeline line */}
          <span
            aria-hidden
            className="absolute left-4 top-0 h-full w-px md:left-1/2"
            style={{ background: "linear-gradient(180deg, #22d3ee40, #a78bfa40, transparent)" }}
          />

          <div className="flex flex-col gap-12">
            {experience.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={`${job.company}-${i}`}
                  variants={fadeInUp}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${
                    left ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"
                  }`}
                >
                  {/* Timeline dot */}
                  <span
                    className={`absolute top-1.5 left-4 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-white/[0.09] bg-[#111118] shadow-lg md:left-auto ${
                      left ? "md:-right-[18px] md:translate-x-0" : "md:-left-[18px] md:translate-x-0"
                    }`}
                    style={{ boxShadow: "0 0 16px rgba(34,211,238,0.15)" }}
                  >
                    <Briefcase className="h-4 w-4 text-cyan-400" />
                  </span>

                  {/* Card */}
                  <div className="group rounded-2xl border border-white/[0.07] bg-[#111118]/80 p-6 shadow-xl shadow-black/40 transition-all duration-300 hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)]">
                    <span className="inline-block rounded-full border border-cyan-500/20 bg-cyan-500/[0.07] px-3 py-1 font-mono text-xs text-cyan-400">
                      {job.period}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-white">{job.role}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.company} · {job.location}
                    </p>
                    <ul className={`mt-4 flex flex-col gap-2 text-sm text-slate-400 ${left ? "md:items-end" : ""}`}>
                      {job.points.map((point) => (
                        <li key={point} className="leading-relaxed">
                          {left ? point : <><span className="text-cyan-500/50">— </span>{point}</>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
