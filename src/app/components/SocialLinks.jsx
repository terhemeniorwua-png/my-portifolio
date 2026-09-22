"use client";

import { motion } from "framer-motion";
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
              <Icon className={dims.icon} />
            </span>
          </motion.span>
        );

        const content = (
          <span className="group inline-flex flex-col items-center gap-1.5">
            {inner}
            <span className="text-[10px] text-zinc-500 transition-colors group-hover:text-zinc-950">
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