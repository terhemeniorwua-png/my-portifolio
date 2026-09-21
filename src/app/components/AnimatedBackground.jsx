"use client";

import { motion } from "framer-motion";

// Pre-computed once at module load (outside render) to satisfy React Compiler purity.
const DOT_COUNT = 18;
const field = Array.from({ length: DOT_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 1 + Math.random() * 3,
  duration: 6 + Math.random() * 10,
  delay: Math.random() * 6,
  drift: 12 + Math.random() * 24,
  hue: Math.random() > 0.5 ? "bright" : "dim",
}));

export function FloatingParticles({ count = DOT_COUNT }) {
  const dots = field.slice(0, count);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className={`absolute rounded-full ${
            d.hue === "bright" ? "bg-zinc-900/25" : "bg-zinc-500/15"
          }`}
          style={{ width: d.size, height: d.size, left: `${d.left}%`, top: `${d.top}%` }}
          animate={{
            y: [0, -d.drift, 0],
            opacity: [0.1, 0.7, 0.1],
            scale: [1, 1.45, 1],
          }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function GradientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 left-1/4 h-[480px] w-[480px] rounded-full bg-zinc-900/[0.06] blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-zinc-700/[0.05] blur-[130px]"
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/3 h-[440px] w-[440px] rounded-full bg-zinc-500/[0.07] blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function AnimatedBackground({ children }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="cyber-grid absolute inset-0" />
      <GradientOrbs />
      <FloatingParticles />
      {children}
    </div>
  );
}