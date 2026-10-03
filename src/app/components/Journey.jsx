"use client";

import { motion } from "framer-motion";
import { journey } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer, viewportOnce } from "./animations";

export default function Journey() {
  return (
    <section id="journey" className="scroll-mt-20 py-24 bg-[#F0E8DA]/40">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Journey"
          title={
            <>
              From curiosity to
              <br />
              <span className="text-cobalt-gradient">full-stack development.</span>
            </>
          }
          description="Not a career timeline — a learning timeline. Every step is a real skill learned by actually using it."
        />

        <div className="mt-14 relative">
          {/* Center line — desktop */}
          <div
            aria-hidden
            className="absolute left-1/2 top-3 bottom-3 hidden w-px -translate-x-1/2 bg-gradient-to-b from-[#DED5C8] via-[#C4B9AB] to-transparent md:block"
          />
          {/* Left line — mobile */}
          <div
            aria-hidden
            className="absolute left-4 top-3 bottom-3 w-px bg-gradient-to-b from-[#DED5C8] via-[#C4B9AB] to-transparent md:hidden"
          />

          <div className="flex flex-col gap-8 md:gap-6">
            {journey.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              const isFinal = i === journey.length - 1;

              return (
                <motion.div
                  key={milestone.id}
                  variants={fadeInUp}
                  custom={i * 0.4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Mobile: spacer for left line */}
                  <div className="flex w-8 shrink-0 justify-center pt-1 md:hidden">
                    <span
                      className={`relative z-10 h-4 w-4 rounded-full border-2 ${
                        isFinal
                          ? "border-[#2457D6] bg-[#2457D6]"
                          : "border-[#C4B9AB] bg-[#F7F3EC]"
                      }`}
                    />
                  </div>

                  {/* Card — mobile full width, desktop half */}
                  <div
                    className={`flex-1 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-10 md:text-right" : "md:pl-10"
                    }`}
                  >
                    <div
                      className={`group rounded-2xl border bg-[#FFFDF9] p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
                        isFinal
                          ? "border-[#2457D6]/30 hover:border-[#2457D6]/50"
                          : "border-[#DED5C8] hover:border-[#C4B9AB]"
                      }`}
                    >
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${
                          isFinal
                            ? "bg-[#2457D6]/10 text-[#2457D6]"
                            : "bg-[#F0E8DA] text-[#9A938A]"
                        }`}
                      >
                        {milestone.phase}
                      </span>
                      <h3
                        className={`mt-2 font-display text-base font-bold ${
                          isFinal ? "text-[#2457D6]" : "text-[#171717]"
                        }`}
                      >
                        {milestone.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#6B665E]">
                        {milestone.description}
                      </p>
                      <div
                        className={`mt-3 flex flex-wrap gap-1.5 ${
                          isLeft ? "md:justify-end" : ""
                        }`}
                      >
                        {milestone.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-[#DED5C8] bg-[#F7F3EC] px-2.5 py-0.5 font-mono text-[10px] text-[#9A938A]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot — desktop */}
                  <div className="hidden md:flex w-16 shrink-0 justify-center pt-5">
                    <span
                      className={`relative z-10 h-4 w-4 rounded-full border-2 ${
                        isFinal
                          ? "border-[#2457D6] bg-[#2457D6]"
                          : "border-[#C4B9AB] bg-[#F7F3EC]"
                      }`}
                    >
                      {isFinal && (
                        <span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-[#2457D6]" />
                      )}
                    </span>
                  </div>

                  {/* Right side placeholder — desktop alternate layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
