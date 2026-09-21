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
              ? "bg-white/90 border border-zinc-200/80 shadow-sm backdrop-blur-md"
              : "bg-white/70 border border-zinc-200/60 backdrop-blur-md"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-black text-white shadow-sm">
              {profile.firstName[0]}
              {profile.lastName[0]}
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-zinc-900 sm:block">
              {profile.firstName}
              <span className="ml-1 text-zinc-400">.{profile.lastName.toLowerCase()}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <motion.a
                  href={`#${link.id}`}
                  whileHover={{ y: -2 }}
                  transition={springHover}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? "text-zinc-950"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-zinc-950 to-zinc-400"
                    />
                  )}
                </motion.a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={springTap}
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900 sm:flex"
            >
              <TerminalSquare className="h-4 w-4 text-zinc-700" />
              <span>Menu</span>
              <kbd className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                ⌘K
              </kbd>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={springTap}
              transition={springHover}
              onClick={openContact}
              className="hidden rounded-lg bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(9,9,11,0.5)] transition-colors hover:bg-zinc-800 hover:shadow-[0_10px_40px_-8px_rgba(9,9,11,0.6)] md:block"
            >
              Hire Me
            </motion.button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-700 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto mt-2 max-w-5xl md:hidden"
            >
              <div className="flex flex-col gap-1 rounded-2xl border border-zinc-200/80 bg-white/95 p-3 shadow-lg backdrop-blur-md">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
                      active === link.id ? "bg-zinc-100 text-zinc-950" : "text-zinc-700"
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
                  className="mt-1 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
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