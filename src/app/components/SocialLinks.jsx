"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { socials } from "@/data/portfolioData";
import { XIcon, FacebookIcon, GmailIcon, WhatsAppIcon, TelegramIcon, GithubIcon, LinkedinIcon } from "./BrandIcons";
import { springHover } from "./animations";

const iconMap = {
  x: XIcon,
  facebook: FacebookIcon,
  gmail: GmailIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

export default function SocialLinks({ items = socials, size = "md", className = "" }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = async (item) => {
    if (item.type !== "email") return;
    try {
      await navigator.clipboard.writeText(item.handle);
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — fall back to no-op.
    }
    setCopiedKey(item.key);
    window.setTimeout(() => setCopiedKey((k) => (k === item.key ? null : k)), 1800);
  };

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
        const copied = copiedKey === item.key;

        const inner = (
          <motion.span
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={springHover}
            className="group/tile relative inline-block"
          >
            <span
              className={`flex ${dims.box} items-center justify-center rounded-xl border border-zinc-200 bg-white p-3 text-zinc-700 shadow-2xs transition-all duration-300 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950 hover:shadow-md`}
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
                style={{
                  background:
                    "radial-gradient(120px circle at 50% 0%, rgba(9,9,11,0.05), transparent 70%)",
                }}
              />
              {isEmail && copied ? (
                <Check className={`${dims.icon} text-zinc-950`} />
              ) : (
                <Icon className={dims.icon} />
              )}
            </span>
          </motion.span>
        );

        const content = (
          <span className="group inline-flex flex-col items-center gap-1.5">
            {inner}
            <span className="text-[10px] text-zinc-500 transition-colors group-hover:text-zinc-950">
              {copied ? "Copied!" : item.name}
            </span>
          </span>
        );

        if (isEmail) {
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleCopy(item)}
              aria-label={`Copy email ${item.handle}`}
              title={`${item.name}: ${item.handle} (click to copy)`}
            >
              {content}
            </button>
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