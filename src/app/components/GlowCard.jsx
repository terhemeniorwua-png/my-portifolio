"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

// Pure-white glass card with cursor-tracked charcoal glow.
export default function GlowCard({ children, className = "", as = "div" }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition-all duration-300 hover:border-zinc-300 hover:shadow-md ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(9,9,11,0.045), transparent 65%)",
        }}
      />
      <span
        aria-hidden
        className="sheen pointer-events-none absolute inset-x-0 top-0 h-px"
      />
      {children}
    </Tag>
  );
}