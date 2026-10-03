"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Twitter } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { socials } from "@/data/portfolioData";
import { springHover } from "./animations";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  gmail: Mail,
  x: Twitter,
  whatsapp: MessageCircle,
  telegram: Send,
};

export default function SocialLinks({ items = socials, size = "md", className = "" }) {
  const dims =
    size === "lg"
      ? "h-14 w-14"
      : size === "sm"
        ? "h-9 w-9"
        : "h-11 w-11";

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {items.map((item) => {
        const Icon = iconMap[item.key] || Mail;
        const isEmail = item.type === "email";

        const tile = (
          <motion.span
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={springHover}
            className={`flex ${dims} items-center justify-center rounded-xl border border-[#DED5C8] bg-[#FFFDF9] text-[#6B665E] shadow-sm transition-all duration-200 hover:border-[#2457D6]/30 hover:bg-[#2457D6]/5 hover:text-[#2457D6]`}
          >
            <Icon className="h-5 w-5" />
          </motion.span>
        );

        const label = (
          <span className="group inline-flex flex-col items-center gap-1.5">
            {tile}
            <span className="font-mono text-[10px] text-[#9A938A] transition-colors group-hover:text-[#6B665E]">
              {item.name}
            </span>
          </span>
        );

        if (isEmail) {
          return (
            <a
              key={item.key}
              href={item.url}
              aria-label={`Email: ${item.handle}`}
              title={`${item.name}: ${item.handle}`}
            >
              {label}
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
            {label}
          </a>
        );
      })}
    </div>
  );
}
