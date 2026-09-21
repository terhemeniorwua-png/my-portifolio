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
              Got a project?<br />
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
className="mt-12 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/60"
          >
            <div className="grid gap-8 p-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-950 to-zinc-700 text-white shadow-md">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <p className="flex items-center gap-2 text-sm text-zinc-600">
                  <MapPin className="h-4 w-4 text-zinc-500" /> {profile.location}
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-0.5 text-lg font-semibold text-zinc-950 transition-colors hover:text-zinc-700"
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
              className="group inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(9,9,11,0.5)] transition-colors hover:bg-zinc-800 hover:shadow-[0_12px_48px_-10px_rgba(9,9,11,0.6)]"
            >
              Quick Contact
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="border-t border-zinc-200 bg-zinc-50 px-8 py-6">
            <p className="mb-4 text-center text-xs uppercase tracking-[0.25em] text-zinc-500">
              Or find me on
            </p>
            <SocialLinks size="lg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}