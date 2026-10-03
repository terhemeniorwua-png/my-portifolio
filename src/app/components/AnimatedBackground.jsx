"use client";

// AnimatedBackground is kept minimal — the warm dot grid is handled globally
// in globals.css. This component exists only for future use or hero section.
export function AnimatedBackground({ children }) {
  return <div className="relative overflow-hidden">{children}</div>;
}
