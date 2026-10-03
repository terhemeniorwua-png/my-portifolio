"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Check, Command, Copy,
  Layers, Briefcase, MessageSquare, Search, User,
} from "lucide-react";
import { navLinks, socials, profile } from "@/data/portfolioData";
import { useUi } from "./UiProvider";

const sectionIcons = {
  about: User,
  skills: Layers,
  projects: Briefcase,
  contact: MessageSquare,
};

function PalettePanel({ onClose }) {
  const [query, setQuery] = useState("");
  const [footerCopyState, setFooterCopyState] = useState(false);
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
      hint: "Open",
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
        setFooterCopyState(true);
        window.setTimeout(() => {
          setFooterCopyState(false);
          onClose();
        }, 900);
      },
    };

    const openQuickContact = {
      id: "quick-contact",
      label: "Open quick contact panel",
      hint: "Modal",
      icon: MessageSquare,
      run: () => {
        onClose();
        openContact();
      },
    };

    const goTop = {
      id: "go-top",
      label: "Scroll to top",
      hint: "Action",
      icon: Command,
      run: () => {
        onClose();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    };

    return [copyEmail, openQuickContact, goTop, ...sectionActions, ...socialActions];
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
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[18vh] backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111118] shadow-2xl shadow-black/60"
        style={{ boxShadow: "0 0 0 1px rgba(34,211,238,0.06), 0 32px 80px rgba(0,0,0,0.8)" }}
      >
        {/* Top accent line */}
        <div
          aria-hidden
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, #22d3ee50, #a78bfa50, transparent)" }}
        />

        {/* Search bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-cyan-400/60" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="w-full bg-transparent font-mono text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none"
          />
          <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center font-mono text-sm text-slate-600">
              No results for &quot;{query}&quot;
            </p>
          )}
          {filtered.map((action) => {
            const Icon = action.icon;
            if (action.id === "copy-email" && footerCopyState) {
              return (
                <div
                  key={action.id}
                  className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-2.5 font-mono text-sm text-emerald-400"
                >
                  <Check className="h-4 w-4" />
                  Email copied to clipboard!
                </div>
              );
            }
            return (
              <button
                key={action.id}
                type="button"
                onClick={action.run}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all hover:bg-white/[0.05]"
              >
                <Icon className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-cyan-400" />
                <span className="flex-1 truncate text-slate-400 transition-colors group-hover:text-slate-200">
                  {action.label}
                </span>
                <span className="rounded border border-white/[0.07] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-600">
                  {action.hint}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <p className="flex items-center gap-2 border-t border-white/[0.06] bg-[#0d0d14]/60 px-4 py-2.5 font-mono text-[10px] text-slate-700">
          <Command className="h-3 w-3 text-cyan-500/50" />
          ⌘K anywhere · Esc to close
        </p>
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
