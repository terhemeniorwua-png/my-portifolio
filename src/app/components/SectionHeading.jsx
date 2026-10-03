"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOnce } from "./animations";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}) {
  const isCenter = align === "center";

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`flex flex-col gap-3 ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      {/* Eyebrow */}
      <span
        className={`inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] ${
          dark ? "text-[#2457D6]" : "text-[#2457D6]"
        }`}
      >
        <span
          className="h-px w-6 rounded-full"
          style={{ background: "linear-gradient(90deg, #2457D6, #2457D620)" }}
        />
        {eyebrow}
        {isCenter && (
          <span
            className="h-px w-6 rounded-full"
            style={{ background: "linear-gradient(270deg, #2457D6, #2457D620)" }}
          />
        )}
      </span>

      {/* Title */}
      <h2
        className={`font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] leading-tight ${
          dark ? "text-[#F7F3EC]" : "text-[#171717]"
        }`}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed ${
            dark ? "text-[#9A938A]" : "text-[#6B665E]"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
