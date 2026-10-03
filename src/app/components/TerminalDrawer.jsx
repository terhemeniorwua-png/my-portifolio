"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";
import { profile, stack, projects, socials } from "@/data/portfolioData";

const BANNER = [
  "╔══════════════════════════════════════════╗",
  "║   ⚡  PHILIP'S PORTFOLIO — INTERACTIVE  ║",
  "╚══════════════════════════════════════════╝",
  "  Type 'help' to see available commands.",
  "",
].join("\n");

function commandOutput(cmd) {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "help":
      return [
        "┌─ Available commands ──────────────────────┐",
        "│  help        — show this message          │",
        "│  about       — a few lines about me       │",
        "│  skills      — list my tech stack         │",
        "│  projects    — featured projects          │",
        "│  contact     — how to reach me            │",
        "│  socials     — social handles             │",
        "│  whoami      — who is this?               │",
        "│  clear       — clear the terminal         │",
        "└───────────────────────────────────────────┘",
        "",
      ].join("\n");
    case "about":
      return [
        `${profile.name} — ${profile.role}`,
        `Location : ${profile.location}`,
        "",
        "I build full-stack products: React/Next.js on the front,",
        "Node.js APIs on the back, and architectures that stay",
        "fast under real-world load.",
        "",
      ].join("\n");
    case "skills":
      return Object.values(stack)
        .map((g) => `[${g.label}]\n  → ${g.items.join(", ")}`)
        .join("\n");
    case "projects":
      return projects.map((p) => `▸ ${p.title}\n  tags: ${p.tags.join(", ")}\n  url:  ${p.url}`).join("\n\n");
    case "contact":
      return [`Email    : ${profile.email}`, `Location : ${profile.location}`, ""].join("\n");
    case "socials":
      return socials.map((s) => `${s.name.padEnd(12)} → ${s.handle}`).join("\n");
    case "whoami":
      return "Just a full-stack engineer who loves clean systems and fast UIs. 💙";
    default:
      return `command not found: ${cmd}\nTry 'help' for a list of available commands.`;
  }
}

export default function TerminalDrawer() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([
    { id: 0, text: BANNER, color: "text-cyan-400/80" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(1);
  const prompt = `${profile.firstName.toLowerCase()}@portfolio:~$`;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  const run = () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    if (text.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const id = idRef.current++;
    setLines((prev) => [
      ...prev,
      { id, text: `${prompt} ${text}`, color: "text-slate-400" },
      { id: id + 1, text: commandOutput(text), color: "text-slate-300" },
    ]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") run();
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="w-[92vw] max-w-lg overflow-hidden rounded-2xl border border-white/[0.09] bg-[#080810]/98 shadow-2xl shadow-black/70 backdrop-blur-xl"
            style={{ boxShadow: "0 0 0 1px rgba(34,211,238,0.06), 0 24px 80px -16px rgba(0,0,0,0.8)" }}
          >
            {/* Terminal titlebar */}
            <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0d0d14] px-4 py-2.5">
              <span className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-400">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-400">{profile.firstName.toLowerCase()}</span>
                <span className="text-slate-600">@portfolio</span>
                <span className="hidden sm:inline text-slate-600">— try: help</span>
              </span>
              <div className="flex items-center gap-2">
                {/* macOS-style dots */}
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <button
                  type="button"
                  onClick={() => setLines([])}
                  className="rounded border border-white/[0.07] px-2 py-0.5 font-mono text-[10px] text-slate-500 transition-colors hover:border-white/[0.15] hover:text-slate-300"
                >
                  clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="flex h-6 w-6 items-center justify-center rounded border border-white/[0.07] text-slate-500 transition-colors hover:border-white/[0.15] hover:text-slate-300"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Output area */}
            <div
              ref={scrollRef}
              className="h-64 overflow-y-auto scroll-smooth p-4 font-mono text-[12.5px] leading-relaxed"
              style={{ background: "linear-gradient(180deg, #050508 0%, #08080f 100%)" }}
            >
              {lines.map((line) => (
                <pre key={line.id} className={`whitespace-pre-wrap ${line.color ?? "text-slate-300"}`}>
                  {line.text}
                </pre>
              ))}
              {/* Input row */}
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">{prompt}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  aria-label="Terminal input"
                  className="flex-1 bg-transparent font-mono text-[12.5px] text-slate-200 caret-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#0d0d14] px-4 py-1.5">
              <span className="font-mono text-[10px] text-slate-700">zsh • utf-8</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-500/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                connected
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle FAB */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        aria-label={open ? "Close terminal" : "Open terminal"}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.09] bg-[#111118] text-cyan-400 shadow-2xl transition-all"
        style={{ boxShadow: "0 0 0 1px rgba(34,211,238,0.1), 0 8px 32px rgba(0,0,0,0.6)" }}
      >
        {/* Glow halo */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{ boxShadow: "inset 0 0 20px rgba(34,211,238,0.08)" }}
        />
        {open ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <Terminal className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}
