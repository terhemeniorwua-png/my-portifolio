"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile, socials } from "@/data/portfolioData";
import { useUi } from "./UiProvider";

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

  const github = socials.find((s) => s.key === "github");
  const linkedin = socials.find((s) => s.key === "linkedin");

  return (
    <AnimatePresence>
      {contactOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeContact}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#171717]/40 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#DED5C8] bg-[#FFFDF9] shadow-2xl shadow-[#171717]/10"
          >
            {/* Sand top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#E8DCCB] via-[#2457D6]/20 to-[#E8DCCB]" />

            {/* Close */}
            <button
              type="button"
              onClick={closeContact}
              aria-label="Close contact panel"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#DED5C8] bg-[#F7F3EC] text-[#9A938A] transition-colors hover:border-[#2457D6]/30 hover:text-[#2457D6]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center p-8 text-center">
              {/* Monogram */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#171717] text-lg font-bold text-[#F7F3EC] shadow-md">
                PI
              </div>

              <h3 className="mt-4 font-display text-xl font-bold text-[#171717]">
                Let&apos;s build something useful.
              </h3>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-[#9A938A]">
                <MapPin className="h-3.5 w-3.5" /> {profile.location}
              </p>

              {/* Email button */}
              <a
                href={`mailto:${profile.email}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#DED5C8] bg-[#F7F3EC] px-5 py-2.5 text-sm font-semibold text-[#171717] transition-all hover:border-[#2457D6]/40 hover:text-[#2457D6]"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>

              {/* Divider */}
              <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[#DED5C8] to-transparent" />

              {/* Social links */}
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A938A]">
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {github && (
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DED5C8] bg-[#F7F3EC] text-[#6B665E] transition-all hover:border-[#171717]/30 hover:text-[#171717]"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DED5C8] bg-[#F7F3EC] text-[#6B665E] transition-all hover:border-[#0A66C2]/30 hover:text-[#0A66C2]"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                )}
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DED5C8] bg-[#F7F3EC] text-[#6B665E] transition-all hover:border-[#2457D6]/30 hover:text-[#2457D6]"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
