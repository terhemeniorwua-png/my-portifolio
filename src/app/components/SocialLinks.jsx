"use client";

import { motion } from "framer-motion";
import { socials } from "@/data/portfolioData";
import {
  XIcon, FacebookIcon, GmailIcon, WhatsAppIcon,
  TelegramIcon, GithubIcon, LinkedinIcon,
} from "./BrandIcons";
import { springHover } from "./animations";

const iconMap = {
  x: XIcon, facebook: FacebookIcon, gmail: GmailIcon,
  whatsapp: WhatsAppIcon, telegram: TelegramIcon,
  github: GithubIcon, linkedin: LinkedinIcon,
};

// Per-social accent colors for hover glow
const socialAccents = {
  x:        "hover:border-slate-400/40 hover:text-slate-200 hover:shadow-[0_0_16px_rgba(148,163,184,0.2)]",
  facebook: "hover:border-blue-500/40 hover:text-blue-400 hover:shadow-[0_0_16px_rgba(59,130,246,0.25)]",
  gmail:    "hover:border-red-500/40 hover:text-red-400 hover:shadow-[0_0_16px_rgba(239,68,68,0.25)]",
  whatsapp: "hover:border-emerald-500/40 hover:text-emerald-400 hover:shadow-[0_0_16px_rgba(52,211,153,0.25)]",
  telegram: "hover:border-cyan-500/40 hover:text-cyan-400 hover:shadow-[0_0_16px_rgba(34,211,238,0.25)]",
  github:   "hover:border-violet-500/40 hover:text-violet-400 hover:shadow-[0_0_16px_rgba(167,139,250,0.25)]",
  linkedin: "hover:border-blue-400/40 hover:text-blue-400 hover:shadow-[0_0_16px_rgba(96,165,250,0.25)]",
};

export default function SocialLinks({ items = socials, size = "md", className = "" }) {
  const dims =
    size === "lg"
      ? { box: "h-14 w-14", icon: "text-[22px]" }
      : size === "sm"
        ? { box: "h-9 w-9", icon: "text-[15px]" }
        : { box: "h-11 w-11", icon: "text-lg" };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {items.map((item) => {
        const Icon = iconMap[item.key] || XIcon;
        const isEmail = item.type === "email";
        const accent = socialAccents[item.key] ?? "hover:border-cyan-500/40 hover:text-cyan-400";

        const inner = (
          <motion.span
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={springHover}
            className="group/tile relative inline-block"
          >
            <span
              className={`flex ${dims.box} items-center justify-center rounded-xl border border-white/[0.07] bg-[#111118]/80 p-3 text-slate-400 shadow-lg shadow-black/30 transition-all duration-300 ${accent}`}
            >
              <Icon className={dims.icon} />
            </span>
          </motion.span>
        );

        const content = (
          <span className="group inline-flex flex-col items-center gap-1.5">
            {inner}
            <span className="font-mono text-[10px] text-slate-600 transition-colors group-hover:text-slate-400">
              {item.name}
            </span>
          </span>
        );

        if (isEmail) {
          return (
            <a
              key={item.key}
              href={item.url}
              aria-label={`Email ${item.name}: ${item.handle}`}
              title={`${item.name}: ${item.handle} (opens compose)`}
            >
              {content}
            </a>
          );
        }

        return (
          <a
            key={item.key}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.name}: ${item.handle}`}
            title={`${item.name}: ${item.handle}`}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}
