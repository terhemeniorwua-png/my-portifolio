"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, TerminalSquare, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolioData";
import { useUi } from "./UiProvider";
import { CommandPalette } from "./CommandPalette";
import { springHover, springTap } from "./animations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { openContact } = useUi();

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = "";
      for (const sec of sections) {
        if (window.scrollY + window.innerHeight * 0.35 >= sec.offsetTop) {
          current = sec.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="fixed inset-x-0 top-4 z-50 px-4"
      >
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-[#0d0d14]/90 border border-white/[0.08] shadow-lg shadow-black/40 backdrop-blur-xl"
              : "bg-[#0d0d14]/70 border border-white/[0.06] backdrop-blur-xl"
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg overflow-hidden"
              style={{ background: "linear-gradient(135deg, #22d3ee, #a78bfa)" }}>
              <span className="relative z-10">
                {profile.firstName[0]}{profile.lastName[0]}
              </span>
              {/* Animated shimmer */}
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)" }}
              />
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-slate-200 sm:block">
              {profile.firstName}
              <span className="ml-1 text-slate-500">.{profile.lastName.toLowerCase()}</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <motion.a
                  href={`#${link.id}`}
                  whileHover={{ y: -2 }}
                  transition={springHover}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px"
                      style={{ background: "linear-gradient(90deg, #22d3ee, #a78bfa)" }}
                    />
                  )}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={springTap}
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 transition-all hover:border-cyan-500/30 hover:text-cyan-400 sm:flex"
            >
              <TerminalSquare className="h-4 w-4" />
              <span>Menu</span>
              <kbd className="rounded border border-white/[0.08] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                ⌘K
              </kbd>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={springTap}
              transition={springHover}
              onClick={openContact}
              className="hidden rounded-full px-4 py-2 text-xs font-semibold text-[#050508] transition-all md:block btn-glow-cyan"
              style={{ background: "linear-gradient(135deg, #22d3ee, #06b6d4)" }}
            >
              Hire Me
            </motion.button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-400 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto mt-2 max-w-5xl md:hidden"
            >
              <div className="flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-[#0d0d14]/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      active === link.id
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openContact();
                  }}
                  className="mt-1 rounded-full px-4 py-2.5 text-xs font-semibold text-[#050508] btn-glow-cyan"
                  style={{ background: "linear-gradient(135deg, #22d3ee, #06b6d4)" }}
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
