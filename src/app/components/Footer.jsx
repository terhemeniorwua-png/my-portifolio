"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { health, navLinks, profile } from "@/data/portfolioData";
import { fadeInUp, staggerContainer, viewportOnce } from "./animations";

function StatusDot({ state }) {
  return (
    <span className="relative flex h-2 w-2">
      {state === "ok" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      )}
      <span
        className={`relative inline-flex h-2 w-2 rounded-full ${
          state === "ok"
            ? "bg-emerald-500"
            : state === "checking"
            ? "bg-[#9A938A]"
            : "bg-red-500"
        }`}
      />
    </span>
  );
}

export default function Footer() {
  const [status, setStatus] = useState({ state: "checking", label: "Checking…" });

  const checkHealth = useCallback(() => {
    fetch(health.endpoint, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.status !== "ok") {
          setStatus({ state: "error", label: "Service degraded" });
          return;
        }
        setStatus({ state: "ok", label: `${d.message}` });
      })
      .catch(() => setStatus({ state: "error", label: "Offline" }));
  }, []);

  useEffect(() => {
    const t = window.setTimeout(checkHealth, 300);
    const i = window.setInterval(checkHealth, 30000);
    return () => { window.clearTimeout(t); window.clearInterval(i); };
  }, [checkHealth]);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#DED5C8] bg-[#F7F3EC]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-sm font-bold text-[#F7F3EC]">
                P
              </span>
              <span className="font-display text-sm font-semibold text-[#171717]">
                {profile.name}
              </span>
            </div>
            <p className="text-sm text-[#9A938A]">
              {profile.role} · {profile.location}
            </p>
            {/* Status */}
            <div className="flex items-center gap-2">
              <StatusDot state={status.state} />
              <span className="font-mono text-[11px] text-[#9A938A]">{status.label}</span>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A938A]">
              Navigation
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={scrollTo(link.id)}
                    className="text-sm text-[#6B665E] transition-colors hover:text-[#2457D6]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A938A]">
              Connect
            </p>
            <div className="flex items-center gap-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DED5C8] bg-[#FFFDF9] text-[#6B665E] transition-all hover:border-[#171717]/30 hover:text-[#171717]"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DED5C8] bg-[#FFFDF9] text-[#6B665E] transition-all hover:border-[#0A66C2]/30 hover:text-[#0A66C2]"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DED5C8] bg-[#FFFDF9] text-[#6B665E] transition-all hover:border-[#2457D6]/30 hover:text-[#2457D6]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#DED5C8] pt-6 sm:flex-row">
          <p className="font-mono text-xs text-[#9A938A]">
            © {year} {profile.name} · Built with Next.js &amp; Tailwind CSS
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DED5C8] bg-[#FFFDF9] text-[#9A938A] transition-all hover:border-[#2457D6]/30 hover:text-[#2457D6]"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
