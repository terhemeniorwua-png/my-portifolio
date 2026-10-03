"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight, Link2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile, socials } from "@/data/portfolioData";
import SectionHeading from "./SectionHeading";
import { useUi } from "./UiProvider";
import { fadeInUp, staggerContainer, viewportOnce, springHover } from "./animations";

export default function Contact() {
  const { openContact } = useUi();

  const github = socials.find((s) => s.key === "github");
  const linkedin = socials.find((s) => s.key === "linkedin");
  const email = socials.find((s) => s.key === "gmail");

  return (
    <section id="contact" className="scroll-mt-20 py-24 bg-[#F0E8DA]/40">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Have an idea worth building?
              <br />
              <span className="text-cobalt-gradient">Let&apos;s build it.</span>
            </>
          }
          description="Open to freelance projects, collaborations, and full-time opportunities. I usually reply within a day."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Email */}
          <motion.a
            variants={fadeInUp}
            custom={0}
            href={`mailto:${profile.email}`}
            whileHover={{ y: -4 }}
            transition={springHover}
            className="group flex flex-col gap-3 rounded-2xl border border-[#DED5C8] bg-[#FFFDF9] p-6 shadow-sm transition-all duration-300 hover:border-[#2457D6]/30 hover:shadow-lg hover:shadow-[#2457D6]/5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DED5C8] bg-[#F0E8DA] text-[#6B665E] transition-colors group-hover:border-[#2457D6]/30 group-hover:bg-[#2457D6]/8 group-hover:text-[#2457D6]">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A938A]">Email</p>
              <p className="mt-0.5 text-sm font-semibold text-[#171717] group-hover:text-[#2457D6] transition-colors break-all">
                {profile.email}
              </p>
            </div>
          </motion.a>

          {/* GitHub */}
          {github && (
            <motion.a
              variants={fadeInUp}
              custom={1}
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={springHover}
              className="group flex flex-col gap-3 rounded-2xl border border-[#DED5C8] bg-[#FFFDF9] p-6 shadow-sm transition-all duration-300 hover:border-[#171717]/20 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DED5C8] bg-[#F0E8DA] text-[#6B665E] transition-colors group-hover:border-[#171717]/20 group-hover:bg-[#171717]/5 group-hover:text-[#171717]">
                <GithubIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A938A]">GitHub</p>
                <p className="mt-0.5 text-sm font-semibold text-[#171717]">
                  {github.handle}
                </p>
              </div>
            </motion.a>
          )}

          {/* LinkedIn */}
          {linkedin && (
            <motion.a
              variants={fadeInUp}
              custom={2}
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={springHover}
              className="group flex flex-col gap-3 rounded-2xl border border-[#DED5C8] bg-[#FFFDF9] p-6 shadow-sm transition-all duration-300 hover:border-[#0A66C2]/25 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DED5C8] bg-[#F0E8DA] text-[#6B665E] transition-colors group-hover:border-[#0A66C2]/25 group-hover:bg-[#0A66C2]/5 group-hover:text-[#0A66C2]">
                <LinkedinIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A938A]">LinkedIn</p>
                <p className="mt-0.5 text-sm font-semibold text-[#171717]">
                  {linkedin.handle}
                </p>
              </div>
            </motion.a>
          )}
        </motion.div>

        {/* Big CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 overflow-hidden rounded-3xl border border-[#DED5C8] bg-[#FFFDF9] p-8 shadow-sm"
        >
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-1.5 text-sm text-[#9A938A]">
                <MapPin className="h-4 w-4" /> {profile.location}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-[#171717]">
                Ready to start a conversation.
              </h3>
              <p className="mt-1 text-sm text-[#6B665E]">
                Tell me about your project or what you&apos;re looking to build.
              </p>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={springHover}
              onClick={openContact}
              className="group shrink-0 inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-[#F7F3EC] shadow-md transition-all hover:bg-[#2457D6] hover:shadow-lg hover:shadow-[#2457D6]/20"
            >
              Send a Message
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
