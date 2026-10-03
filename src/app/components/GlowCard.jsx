"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * WarmCard — the base card surface for the portfolio.
 * Warm ivory background, sand border, subtle cobalt glow on hover.
 */
export default function GlowCard({
  children,
  className = "",
  as = "div",
  variant = "card",  // 'card' | 'sand' | 'flat'
}) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const variantClasses = {
    card: "bg-[#FFFDF9] border border-[#DED5C8] hover:border-[#2457D6]/25 hover:shadow-lg hover:shadow-[#2457D6]/5",
    sand: "bg-[#F0E8DA] border border-[#DED5C8] hover:border-[#2457D6]/20 hover:shadow-md hover:shadow-[#2457D6]/5",
    flat: "bg-transparent border border-[#DED5C8] hover:border-[#2457D6]/25",
  };

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-300 ${variantClasses[variant] ?? variantClasses.card} ${className}`}
    >
      {/* Subtle cobalt radial on cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(36,87,214,0.04), transparent 70%)",
        }}
      />
      {/* Sheen sweep */}
      <span
        aria-hidden
        className="sheen pointer-events-none absolute inset-x-0 top-0 h-px"
      />
      {children}
    </Tag>
  );
}
