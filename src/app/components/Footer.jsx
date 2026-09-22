"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ArrowUp } from "lucide-react";
import { health, navLinks, profile, skills, socials } from "@/data/portfolioData";
import {
  XIcon,
  FacebookIcon,
  GmailIcon,
  WhatsAppIcon,
  TelegramIcon,
  GithubIcon,
  LinkedinIcon,
} from "./BrandIcons";
import { fadeInUp, staggerContainer, viewportOnce } from "./animations";

const iconMap = {
  x: XIcon,
  facebook: FacebookIcon,
  gmail: GmailIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

function StatusDot({ state }) {
  return (
    <span className="relative flex h-2 w-2">
      {state === "ok" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      )}
      <span
        className={`relative inline-flex h-2 w-2 rounded-full ${
          state === "ok" ? "bg-emerald-500" : state === "checking" ? "bg-zinc-500" : "bg-red-500"
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
        setStatus({
          state: "ok",
          label: `${data.message} • ${health.label} ${data.code} OK`,
        });
      })
      .catch(() => {
        setStatus({ state: "error", label: "Offline — status unavailable" });
      });
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(checkHealth, 250);
    const interval = window.setInterval(checkHealth, 30000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [checkHealth]);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 items-start gap-12 md:grid-cols-3"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-white">{profile.name}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Full-Stack Developer building scalable web applications and REST APIs.
              </p>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={scrollTo(link.id)}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wide text-white">
              Core Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4">
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wide text-white">
              Connect Directly
            </h4>
            <div className="flex max-w-[200px] flex-wrap gap-2">
              {socials.map((item) => {
                const Icon = iconMap[item.key] || XIcon;
                const isEmail = item.type === "email";
                const chip = (
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-300 transition-all group-hover:border-zinc-600 group-hover:bg-zinc-800 group-hover:text-white">
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </span>
                );

                return isEmail ? (
                  <a
                    key={item.key}
                    href={item.url}
                    aria-label={`${item.name}: ${item.handle}`}
                    title={`${item.name}: ${item.handle}`}
                    className="group"
                  >
                    {chip}
                  </a>
                ) : (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name}: ${item.handle}`}
                    title={`${item.name}: ${item.handle}`}
                    className="group"
                  >
                    {chip}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <div className="my-8 border-t border-zinc-900" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs font-mono text-zinc-500 md:flex-row">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>Deployed on Vercel • Built with Next.js &amp; Tailwind CSS</p>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              className="rounded-full border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}