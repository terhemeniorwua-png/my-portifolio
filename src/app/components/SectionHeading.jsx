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
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
        <span className="h-px w-6 bg-gradient-to-r from-zinc-950 to-zinc-400" />
        {eyebrow}
        {align === "center" && (
          <span className="h-px w-6 bg-gradient-to-l from-zinc-950 to-zinc-400" />
        )}
      </span>
      <h2 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600">{description}</p>
      )}
    </motion.div>
  );
}