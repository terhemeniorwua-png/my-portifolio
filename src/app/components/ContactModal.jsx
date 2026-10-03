"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, X } from "lucide-react";
import { profile } from "@/data/portfolioData";
import { useUi } from "./UiProvider";
import SocialLinks from "./SocialLinks";

export default function ContactModal() {
  const { contactOpen, closeContact } = useUi();

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e) => e.key === "Escape" && closeContact();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [contactOpen, closeContact]);

  return (
    <AnimatePresence>
      {contactOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeContact}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.09] bg-[#111118] shadow-2xl shadow-black/60"
          >
            {/* Top neon accent line */}
            <div
              aria-hidden
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, #22d3ee80, #a78bfa80, transparent)" }}
            />

            {/* Ambient orbs inside modal */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)", filter: "blur(24px)" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)", filter: "blur(24px)" }}
            />

            {/* Close button */}
            <button
              type="button"
              onClick={closeContact}
              aria-label="Close contact panel"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-500 transition-colors hover:border-white/[0.15] hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex flex-col items-center p-6 text-center">
              {/* Avatar monogram */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-black text-[#050508] shadow-lg"
                style={{ background: "linear-gradient(135deg, #22d3ee, #a78bfa)" }}
              >
                {profile.firstName[0]}{profile.lastName[0]}
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">Let&apos;s build something great</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5" /> {profile.location}
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/30 hover:text-cyan-400"
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>

              <div
                aria-hidden
                className="my-6 h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
              />

              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-600">
                Find me on
              </p>
              <SocialLinks size="lg" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
