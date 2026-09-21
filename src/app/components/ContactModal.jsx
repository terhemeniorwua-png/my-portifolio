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
          className="fixed inset-0 z-[90] flex items-center justify-center bg-zinc-950/40 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl shadow-zinc-500/25"
          >
            <span className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-zinc-100 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-zinc-100 blur-3xl" />

            <button
              type="button"
              onClick={closeContact}
              aria-label="Close contact panel"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-950"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-950 to-zinc-700 text-lg font-black text-white shadow-md">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-950">Let&apos;s build something great</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-600">
                <MapPin className="h-3.5 w-3.5 text-zinc-500" /> {profile.location}
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 hover:border-zinc-400"
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>

              <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
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