"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";
import { profile, stack, projects, socials } from "@/data/portfolioData";

const BANNER = [
  "┌─────────────────────────────────────────┐",
  "│   ⚡ PHILIP'S PORTFOLIO — INTERACTIVE   │",
  "└─────────────────────────────────────────┘",
  "Type 'help' to see available commands.",
  "",
].join("\n");

function commandOutput(cmd) {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "help":
      return [
        "Available commands:",
        "  help        — show this message",
        "  about       — a few lines about me",
        "  skills      — list my tech stack",
        "  projects    — featured projects",
        "  contact     — how to reach me",
        "  socials     — social handles",
        "  clear       — clear the terminal",
        "  whoami      — who is this?",
        "",
      ].join("\n");
    case "about":
      return [
        `${profile.name} — ${profile.role} (${profile.location}).`,
        "I build full-stack products: React/Next.js on the front, Node.js APIs on the back,",
        "and architectures that stay fast under real-world load.",
        "",
      ].join("\n");
    case "skills":
      return Object.values(stack)
        .map((g) => `[${g.label}] → ${g.items.join(", ")}`)
        .join("\n");
    case "projects":
      return projects.map((p) => `${p.title} — ${p.tags.join(", ")}\n  ${p.url}`).join("\n");
    case "contact":
      return [`Email    : ${profile.email}`, `Location : ${profile.location}`, ""].join("\n");
    case "socials":
      return socials.map((s) => `${s.name.padEnd(12)} → ${s.handle}`).join("\n");
    case "whoami":
      return "Just a full-stack engineer who loves clean systems and fast UIs. 💙";
    default:
      return `command not found: ${cmd}. Try 'help'.`;
  }
}

export default function TerminalDrawer() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([
    { id: 0, text: BANNER, color: "text-zinc-300" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const idRef = useRef(1);
  const prompt = `${profile.firstName.toLowerCase()}@portfolio:~$`;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  const run = () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    if (text.trim().toLowerCase() === "clear") {
      clearAll();
      return;
    }
    const id = idRef.current++;
    setLines((prev) => [
      ...prev,
      { id, text: `${prompt} ${text}`, color: "text-zinc-400" },
      { id: id + 1, text: commandOutput(text), color: "text-zinc-200" },
    ]);
  };

  const clearAll = () => setLines([]);

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
            className="w-[92vw] max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-[#050505]/95 shadow-2xl shadow-black/60 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
              <span className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <Terminal className="h-4 w-4 text-zinc-400" />
                visitor@philipportfolio — interactive
                <span className="hidden sm:inline text-[10px] text-zinc-600">try: help</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-md border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 transition-colors hover:border-zinc-400 hover:text-white"
                >
                  clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-white"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="h-64 overflow-y-auto scroll-smooth bg-black/90 p-4 font-mono text-[12.5px] leading-relaxed"
            >
              {lines.map((line) => (
                <pre key={line.id} className={`whitespace-pre-wrap ${line.color || "text-zinc-300"}`}>
                  {line.text}
                </pre>
              ))}
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="text-zinc-200">{prompt}</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  aria-label="Terminal input"
                  autoFocus
                  className="flex-1 bg-transparent font-mono text-[12.5px] text-zinc-100 caret-zinc-400 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        aria-label={open ? "Close terminal" : "Open terminal"}
        className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-2xl transition-colors ${
          open
            ? "border-zinc-600 bg-zinc-950 text-white shadow-zinc-950/40"
            : "border-zinc-800 bg-zinc-950 text-white shadow-zinc-950/40"
        }`}
      >
        {open ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <Terminal className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}