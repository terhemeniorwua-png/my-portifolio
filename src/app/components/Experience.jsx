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
              The road<br />
              <span className="text-gradient">so far.</span>
            </>
          }
          description="A walk through the teams, products and problems I've had the privilege to build for."
        />

        <div className="relative mt-16">
          <span
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-zinc-400 via-zinc-300 to-transparent md:left-1/2"
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
                  <span
                    className={`absolute top-1.5 left-4 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-zinc-300 bg-white shadow-sm md:left-auto ${
                      left ? "md:-right-[18px] md:translate-x-0" : "md:-left-[18px] md:translate-x-0"
                    }`}
                  >
                    <Briefcase className="h-4 w-4 text-zinc-800" />
                  </span>

                  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-zinc-300 hover:shadow-md">
                    <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-800 border border-zinc-300/80">
                      {job.period}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-zinc-950">{job.role}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-600">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      {job.company} · {job.location}
                    </p>
                    <ul className={`mt-4 flex flex-col gap-2 text-sm text-zinc-600 ${left ? "md:list-none md:items-end" : ""}`}>
                      {job.points.map((point) => (
                        <li key={point} className="leading-relaxed">
                          {left ? point : <>— {point}</>}
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