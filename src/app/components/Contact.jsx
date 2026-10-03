"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import SocialLinks from "./SocialLinks";
import { useUi } from "./UiProvider";
import { fadeInUp, viewportOnce, springHover } from "./animations";

export default function Contact() {
  const { openContact } = useUi();

  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Got a project?{" "}
              <span className="text-gradient">Let&apos;s talk.</span>
            </>
          }
          description="Open to freelance, full-time roles and interesting collaborations. I usually reply within 24 hours."
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#111118]/80 shadow-2xl shadow-black/50 backdrop-blur"
        >
          {/* Top glow accent */}
          <div
            aria-hidden
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, #22d3ee60, #a78bfa60, transparent)" }}
          />

          <div className="grid gap-8 p-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-center gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[#050508] shadow-lg"
                style={{ background: "linear-gradient(135deg, #22d3ee, #a78bfa)" }}
              >
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" /> {profile.location}
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-0.5 text-lg font-semibold text-white transition-colors hover:text-cyan-400"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={springHover}
              onClick={openContact}
              className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-[#050508] transition-all btn-glow-cyan"
              style={{ background: "linear-gradient(135deg, #22d3ee, #06b6d4)" }}
            >
              Quick Contact
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="border-t border-white/[0.06] bg-[#0d0d14]/60 px-8 py-6">
            <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.25em] text-slate-600">
              Or find me on
            </p>
            <SocialLinks size="lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
