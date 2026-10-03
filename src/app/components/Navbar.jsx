"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";
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
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      let current = "";
      for (const sec of sections) {
        if (window.scrollY + window.innerHeight * 0.4 >= sec.offsetTop) {
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
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300 ${
            scrolled
              ? "bg-[#F7F3EC]/95 border-b border-[#DED5C8] shadow-sm shadow-[#171717]/5 backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Philip Iorwua — Back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#171717] text-sm font-bold text-[#F7F3EC] transition-colors group-hover:bg-[#2457D6]">
              P
            </span>
            <span className="hidden text-sm font-semibold text-[#171717] transition-colors group-hover:text-[#2457D6] sm:block">
              {profile.firstName}
              <span className="text-[#9A938A]"> Iorwua</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <motion.a
                  href={`#${link.id}`}
                  whileHover={{ y: -1 }}
                  transition={springHover}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? "text-[#2457D6]"
                      : "text-[#6B665E] hover:text-[#171717]"
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-[#2457D6]/8"
                    />
                  )}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* ⌘K hint */}
            <motion.button
              type="button"
              whileTap={springTap}
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette (Ctrl+K)"
              className="hidden items-center gap-1.5 rounded-lg border border-[#DED5C8] bg-[#FFFDF9] px-3 py-1.5 text-xs text-[#6B665E] transition-all hover:border-[#2457D6]/30 hover:text-[#2457D6] sm:flex"
            >
              <Terminal className="h-3.5 w-3.5" />
              <kbd className="font-mono text-[10px] text-[#9A938A]">⌘K</kbd>
            </motion.button>

            {/* Hire Me CTA */}
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={springTap}
              transition={springHover}
              onClick={openContact}
              className="hidden rounded-full bg-[#171717] px-5 py-2 text-sm font-semibold text-[#F7F3EC] shadow-sm transition-all hover:bg-[#2457D6] hover:shadow-md hover:shadow-[#2457D6]/20 md:block"
            >
              Let&apos;s Talk
            </motion.button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DED5C8] bg-[#FFFDF9] text-[#171717] md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-b border-[#DED5C8] bg-[#F7F3EC]/98 px-6 py-3 backdrop-blur-md md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active === link.id
                      ? "bg-[#2457D6]/8 text-[#2457D6]"
                      : "text-[#6B665E] hover:text-[#171717]"
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
                className="mt-2 w-full rounded-full bg-[#171717] px-4 py-2.5 text-sm font-semibold text-[#F7F3EC] transition-colors hover:bg-[#2457D6]"
              >
                Let&apos;s Talk
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
