"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { health, navLinks, profile, skills, socials } from "@/data/portfolioData";
import {
  XIcon, FacebookIcon, GmailIcon, WhatsAppIcon,
  TelegramIcon, GithubIcon, LinkedinIcon,
} from "./BrandIcons";
import { fadeInUp, staggerContainer, viewportOnce } from "./animations";

const iconMap = {
  x: XIcon, facebook: FacebookIcon, gmail: GmailIcon,
  whatsapp: WhatsAppIcon, telegram: TelegramIcon,
  github: GithubIcon, linkedin: LinkedinIcon,
};

function StatusDot({ state }) {
  return (
    <span className="relative flex h-2 w-2">
      {state === "ok" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      )}
      <span
        className={`relative inline-flex h-2 w-2 rounded-full ${
          state === "ok" ? "bg-emerald-400" : state === "checking" ? "bg-slate-500" : "bg-red-500"
        }`}
      />
    </span>
  );
}

export default function Footer() {
  const [status, setStatus] = useState({ state: "checking", label: "Checking service status…" });

  const checkHealth = useCallback(() => {
    fetch(health.endpoint, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "ok") {
          setStatus({ state: "error", label: `${health.label} degraded` });
          return;
        }
        setStatus({ state: "ok", label: `${data.message} • ${health.label} ${data.code} OK` });
      })
      .catch(() => {
        setStatus({ state: "error", label: "Offline — status unavailable" });
      });
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(checkHealth, 250);
    const interval = window.setInterval(checkHealth, 30000);
    return () => { window.clearTimeout(initial); window.clearInterval(interval); };
  }, [checkHealth]);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.05] bg-[#050508] text-slate-500">
      {/* Top accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(167,139,250,0.4), transparent)" }}
      />

      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-30"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.05) 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 items-start gap-12 md:grid-cols-3"
        >
          {/* Brand + nav */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-white">{profile.name}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                Full-Stack Developer building scalable web applications and REST APIs.
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={scrollTo(link.id)}
                    className="text-sm text-slate-500 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech stack */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wide text-slate-300">
              Core Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-500 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wide text-slate-300">
              Connect Directly
            </h4>
            <div className="flex max-w-[200px] flex-wrap gap-2">
              {socials.map((item) => {
                const Icon = iconMap[item.key] || XIcon;
                const isEmail = item.type === "email";
                const chip = (
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5 text-slate-400 transition-all group-hover:border-cyan-500/30 group-hover:bg-cyan-500/[0.06] group-hover:text-cyan-400">
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </span>
                );

                return isEmail ? (
                  <a key={item.key} href={item.url} aria-label={`${item.name}: ${item.handle}`} title={`${item.name}: ${item.handle}`} className="group">
                    {chip}
                  </a>
                ) : (
                  <a key={item.key} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.name}: ${item.handle}`} title={`${item.name}: ${item.handle}`} className="group">
                    {chip}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <div className="my-8 h-px bg-white/[0.05]" />

        <div className="flex flex-col items-center justify-between gap-4 font-mono text-xs text-slate-600 md:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {/* Health status */}
            <span className="flex items-center gap-2">
              <StatusDot state={status.state} />
              <span className={status.state === "ok" ? "text-emerald-500/70" : "text-slate-600"}>
                {status.label}
              </span>
            </span>
            <span className="text-slate-700">•</span>
            <p>Built with Next.js &amp; Tailwind</p>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              className="rounded-full border border-white/[0.07] bg-white/[0.03] p-2 text-slate-500 transition-all hover:border-cyan-500/30 hover:text-cyan-400 hover:shadow-[0_0_16px_rgba(34,211,238,0.2)]"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
