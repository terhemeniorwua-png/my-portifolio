"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function FloatingParticles({ count = 22 }) {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const colors = [
      "rgba(34,211,238,0.55)",   // cyan
      "rgba(167,139,250,0.45)",  // violet
      "rgba(52,211,153,0.4)",    // emerald
      "rgba(244,114,182,0.35)",  // pink
      "rgba(148,163,184,0.3)",   // slate
    ];
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      drift: 15 + Math.random() * 28,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    queueMicrotask(() => setDots(generated));
  }, [count]);

  if (dots.length === 0) {
    return <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />;
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            top: `${d.top}%`,
            background: d.color,
            boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
          }}
          animate={{
            y: [0, -d.drift, 0],
            opacity: [0.08, 0.8, 0.08],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function GradientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Cyan orb — top left */}
      <motion.div
        className="absolute -top-48 -left-24 h-[560px] w-[560px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Violet orb — top right */}
      <motion.div
        className="absolute -top-24 -right-32 h-[520px] w-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
        }}
        animate={{ x: [0, -55, 0], y: [0, 60, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Emerald orb — bottom center */}
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[480px] w-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Pink accent — mid left */}
      <motion.div
        className="absolute top-1/2 -left-40 h-[360px] w-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function AnimatedBackground({ children }) {
  return (
    <div className="relative overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[#050508]" />
      {/* Dot grid */}
      <div className="cyber-grid absolute inset-0" />
      {/* Color orbs */}
      <GradientOrbs />
      {/* Floating particles */}
      <FloatingParticles />
      {children}
    </div>
  );
}
