"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "./animations";

export default function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`flex flex-col gap-3 ${alignment}`}
    >
      <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400/80">
        <span
          className="h-px w-8"
          style={{ background: "linear-gradient(90deg, #22d3ee, #a78bfa44)" }}
        />
        {eyebrow}
        {align === "center" && (
          <span
            className="h-px w-8"
            style={{ background: "linear-gradient(270deg, #22d3ee, #a78bfa44)" }}
          />
        )}
      </span>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-slate-400">{description}</p>
      )}
    </motion.div>
  );
}
