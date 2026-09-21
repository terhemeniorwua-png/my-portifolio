"use client";

// Shared Framer Motion variants — consistent motion language across sections.
export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

export const viewportOnce = { once: true, margin: "-80px" };

export const springHover = { type: "spring", stiffness: 380, damping: 18 };

export const springTap = { type: "spring", stiffness: 500, damping: 22 };

export function whileInViewProps() {
  return { initial: "hidden", whileInView: "visible", viewport: viewportOnce };
}