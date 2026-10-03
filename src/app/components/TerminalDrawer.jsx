"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";
import { profile, skillCategories, projects, socials } from "@/data/portfolioData";

const BANNER = [
  "╔════════════════════════════════════════╗",
  "║   PHILIP'S PORTFOLIO — TERMINAL       ║",
  "╚════════════════════════════════════════╝",
  "  Type 'help' for available commands.",
  "",
].join("\n");

function commandOutput(cmd) {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "help":
      return [
        "Available commands:",
        "  about     — who I am",
        "  skills    — my tech stack",
        "  projects  — projects I've built",
        "  contact   — how to reach me",
        "  whoami    — quick summary",
        "  clear     — clear the terminal",
        "",
      ].join("\n");
    case "about":
      return [
        `${profile.name}`,
        `${profile.role} · ${profile.location}`,
        "",
        profile.bio[0],
        "",
        profile.bio[1],
        "",
      ].join("\n");
    case "skills":
      return skillCategories
        .map((cat) => `[${cat.label}]\n  ${cat.skills.join(" · ")}`)
        .join("\n\n");
    case "projects":
      return projects
        .map((p) => `▸ ${p.title}\n  ${p.tagline}\n  ${p.url}`)
        .join("\n\n");
    case "contact":
      return [
        `Email    : ${profile.email}`,
        `GitHub   : ${profile.githubUrl}`,
        `LinkedIn : ${profile.linkedinUrl}`,
        `Location : ${profile.location}`,
        "",
      ].join("\n");
    case "whoami":
      return `Full-stack web developer. React → Node.js → PostgreSQL → Deployed.\nBuilding real applications end to end. 🔵`;
    default:
      return `command not found: ${cmd}\nType 'help' for available commands.`;
  }
}

export default function TerminalDrawer() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([{ id: 0, text: BANNER, type: "banner" }]);
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
      { id, text: `${prompt} ${text}`, type: "input" },
      { id: id + 1, text: commandOutput(text), type: "output" },
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
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-[90vw] max-w-lg overflow-hidden rounded-2xl border border-[#292524] bg-[#0f0f0f] shadow-2xl shadow-black/50"
          >
            {/* Titlebar */}
            <div className="flex items-center justify-between border-b border-[#1a1a1a] bg-[#171717] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F57]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#28C840]/80" />
                </div>
                <Terminal className="ml-2 h-3.5 w-3.5 text-[#6B665E]" />
                <span className="font-mono text-xs text-[#6B665E]">portfolio — zsh</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLines([])}
                  className="rounded px-2 py-0.5 font-mono text-[10px] text-[#6B665E] transition-colors hover:text-[#9A938A]"
                >
                  clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="flex h-5 w-5 items-center justify-center rounded text-[#6B665E] transition-colors hover:text-[#9A938A]"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Output */}
            <div
              ref={scrollRef}
              className="h-60 overflow-y-auto scroll-smooth p-4 font-mono text-[12px] leading-relaxed"
              style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)" }}
            >
              {lines.map((line) => (
                <pre
                  key={line.id}
                  className={`whitespace-pre-wrap ${
                    line.type === "banner"
                      ? "text-[#2457D6]/80"
                      : line.type === "input"
                        ? "text-[#9A938A]"
                        : "text-[#C8C4BC]"
                  }`}
                >
                  {line.text}
                </pre>
              ))}
              {/* Input */}
              <div className="flex items-center gap-2">
                <span className="text-[#2457D6]">{prompt}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  aria-label="Terminal input"
                  className="flex-1 bg-transparent font-mono text-[12px] text-[#F7F3EC] caret-[#2457D6] focus:outline-none"
                />
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between border-t border-[#1a1a1a] bg-[#171717] px-4 py-1">
              <span className="font-mono text-[10px] text-[#3a3632]">zsh · utf-8</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                ready
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.07, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label={open ? "Close terminal" : "Open terminal"}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#292524] bg-[#171717] text-[#F7F3EC] shadow-2xl transition-colors hover:bg-[#2457D6] hover:border-[#2457D6]"
      >
        {open ? <ChevronDown className="h-6 w-6" /> : <Terminal className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
