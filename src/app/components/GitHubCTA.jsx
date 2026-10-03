"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { profile } from "@/data/portfolioData";
import { fadeInUp, staggerContainer, viewportOnce, springHover } from "./animations";

export default function GitHubCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div
            variants={fadeInUp}
            className="relative overflow-hidden rounded-3xl bg-[#171717] px-8 py-14 md:px-14 md:py-16"
          >
            {/* Background texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(#292524 0.8px, transparent 0.8px)",
                backgroundSize: "20px 20px",
                opacity: 0.4,
              }}
            />
            {/* Cobalt radial accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-[0.07]"
              style={{
                background: "radial-gradient(circle, #2457D6, transparent 70%)",
              }}
            />

            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              {/* Left */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <GithubIcon className="h-8 w-8 text-[#F7F3EC]" />
                  <span className="font-mono text-sm text-[#6B665E]">
                    github.com/terhemeniorwua-png
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-[#F7F3EC] sm:text-3xl">
                  More experiments, APIs, and{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #4A73E8, #2457D6)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    full-stack projects
                  </span>{" "}
                  live on GitHub.
                </h2>
                <p className="max-w-lg text-sm leading-relaxed text-[#6B665E]">
                  Repositories, side projects, and code experiments. The work that
                  doesn&apos;t always make it into a portfolio card but still shows how I
                  think about building things.
                </p>
              </div>

              {/* Right — CTA */}
              <motion.a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springHover}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#292524] bg-[#292524] px-6 py-3.5 text-sm font-semibold text-[#F7F3EC] transition-all hover:border-[#2457D6]/60 hover:bg-[#2457D6] hover:shadow-lg hover:shadow-[#2457D6]/20"
              >
                <GithubIcon className="h-4 w-4" />
                View GitHub Profile
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
