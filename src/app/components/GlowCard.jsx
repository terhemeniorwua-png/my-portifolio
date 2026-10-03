"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

// Dark glass card with cursor-tracked neon glow.
export default function GlowCard({ children, className = "", as = "div", glowColor = "cyan" }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const glowMap = {
    cyan: "rgba(34,211,238,0.06)",
    violet: "rgba(167,139,250,0.06)",
    emerald: "rgba(52,211,153,0.06)",
    pink: "rgba(244,114,182,0.06)",
  };

  const borderHoverMap = {
    cyan: "hover:border-cyan-500/30",
    violet: "hover:border-violet-500/30",
    emerald: "hover:border-emerald-500/30",
    pink: "hover:border-pink-500/30",
  };

  const glow = glowMap[glowColor] ?? glowMap.cyan;
  const borderHover = borderHoverMap[glowColor] ?? borderHoverMap.cyan;

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111118]/80 p-6 shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-300 ${borderHover} hover:shadow-2xl ${className}`}
    >
      {/* Cursor-tracked radial glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
        style={{
          background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 65%)`,
        }}
      />
      {/* Sheen line on top border */}
      <span
        aria-hidden
        className="sheen pointer-events-none absolute inset-x-0 top-0 h-px"
      />
      {children}
    </Tag>
  );
}
