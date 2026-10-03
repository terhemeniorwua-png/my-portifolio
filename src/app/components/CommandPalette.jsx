"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Check, Command, Copy, Search,
  User, Layers, Briefcase, MessageSquare, GitBranch,
} from "lucide-react";
import { navLinks, socials, profile } from "@/data/portfolioData";
import { useUi } from "./UiProvider";

const sectionIcons = {
  about: User,
  skills: Layers,
  projects: Briefcase,
  journey: GitBranch,
  contact: MessageSquare,
};

function PalettePanel({ onClose }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const { openContact } = useUi();

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const actions = useMemo(() => {
    const sectionActions = navLinks.map((link) => ({
      id: `nav-${link.id}`,
      label: `Go to ${link.label}`,
      hint: "Section",
      icon: sectionIcons[link.id] || User,
      run: () => {
        onClose();
        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    const socialActions = socials.map((s) => ({
      id: `soc-${s.key}`,
      label: `${s.name} — ${s.handle}`,
      hint: "Open link",
      icon: ArrowUpRight,
      run: () => {
        window.open(s.url, "_blank", "noopener,noreferrer");
        onClose();
      },
    }));

    const copyEmail = {
      id: "copy-email",
      label: `Copy email — ${profile.email}`,
      hint: "Clipboard",
      icon: Copy,
      run: () => {
        navigator.clipboard?.writeText(profile.email).catch(() => {});
        setCopied(true);
        window.setTimeout(() => { setCopied(false); onClose(); }, 1000);
      },
    };

    const openContactModal = {
      id: "open-contact",
      label: "Open contact panel",
      hint: "Modal",
      icon: MessageSquare,
      run: () => { onClose(); openContact(); },
    };

    const scrollTop = {
      id: "scroll-top",
      label: "Scroll to top",
      hint: "Action",
      icon: Command,
      run: () => { onClose(); window.scrollTo({ top: 0, behavior: "smooth" }); },
    };

    return [copyEmail, openContactModal, scrollTop, ...sectionActions, ...socialActions];
  }, [onClose, openContact]);

  const filtered = query.trim()
    ? actions.filter((a) =>
        `${a.label} ${a.hint}`.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : actions;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-[#171717]/30 px-4 pt-[16vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -8 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#DED5C8] bg-[#FFFDF9] shadow-2xl shadow-[#171717]/10"
      >
        {/* Search bar */}
        <div className="flex items-center gap-3 border-b border-[#DED5C8] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[#9A938A]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or type a command…"
            className="w-full bg-transparent text-sm text-[#171717] placeholder:text-[#C4B9AB] focus:outline-none"
          />
          <kbd className="rounded border border-[#DED5C8] bg-[#F7F3EC] px-1.5 py-0.5 font-mono text-[10px] text-[#9A938A]">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[44vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-[#9A938A]">
              No results for &quot;{query}&quot;
            </p>
          )}
          {filtered.map((action) => {
            const Icon = action.icon;
            if (action.id === "copy-email" && copied) {
              return (
                <div
                  key={action.id}
                  className="flex items-center gap-3 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2.5 text-sm text-emerald-700"
                >
                  <Check className="h-4 w-4" />
                  Copied to clipboard!
                </div>
              );
            }
            return (
              <button
                key={action.id}
                type="button"
                onClick={action.run}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#F0E8DA]"
              >
                <Icon className="h-4 w-4 shrink-0 text-[#9A938A] transition-colors group-hover:text-[#2457D6]" />
                <span className="flex-1 truncate text-[#6B665E] transition-colors group-hover:text-[#171717]">
                  {action.label}
                </span>
                <span className="rounded border border-[#DED5C8] bg-[#F7F3EC] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#9A938A]">
                  {action.hint}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 border-t border-[#DED5C8] bg-[#F7F3EC] px-4 py-2">
          <Command className="h-3 w-3 text-[#9A938A]" />
          <span className="font-mono text-[10px] text-[#9A938A]">
            ⌘K anywhere · Esc to close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CommandPalette({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && <PalettePanel key="palette" onClose={onClose} />}
    </AnimatePresence>
  );
}
