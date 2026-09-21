"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Check, Copy } from "lucide-react";
import { health, profile, socials } from "@/data/portfolioData";
import SocialLinks from "./SocialLinks";

function StatusDot({ state }) {
  const color = state === "ok" ? "bg-zinc-950" : state === "checking" ? "bg-zinc-400" : "bg-zinc-300";
  const ping = state === "ok" && (
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-950 opacity-25" />
  );
  return (
    <span className="relative flex h-2 w-2">
      {ping}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}

export default function Footer() {
  const [status, setStatus] = useState({ state: "checking", label: "Checking service status…" });
  const [copied, setCopied] = useState(false);

  const checkHealth = useCallback(() => {
    fetch(health.endpoint, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "ok") {
          setStatus({ state: "error", label: `${health.label} degraded` });
          return;
        }
        setStatus({
          state: "ok",
          label: `${data.message} • ${health.label} ${data.code} OK · uptime ${data.uptime}s`,
        });
      })
      .catch(() => {
        setStatus({ state: "error", label: "Offline — status unavailable (is `next dev` running?)" });
      });
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(checkHealth, 250);
    const interval = window.setInterval(checkHealth, 30000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, [checkHealth]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* ignore */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <footer className="relative border-t border-zinc-200 bg-white pb-8 pt-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6">
          <SocialLinks items={socials} size="lg" />

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-sm font-black text-white shadow-sm">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </span>
              <span className="text-sm font-semibold text-zinc-900">
                {profile.name}
              </span>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-zinc-950"
                  >
                    <Check className="h-4 w-4" /> Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="h-4 w-4 text-zinc-400" />
                    {profile.email}
                    <span className="rounded border border-zinc-300 px-1.5 py-0.5 text-[10px] text-zinc-500">
                      tap to copy
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* API health status */}
          <div className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-2 font-mono text-xs text-zinc-500 shadow-2xs">
            <Activity className="h-3.5 w-3.5 text-zinc-400" />
            <StatusDot state={status.state} />
            <span>System Status: {status.label}</span>
          </div>

          <div className="text-center text-xs text-zinc-400">
            <p>
              © {new Date().getFullYear()} {profile.name} · Built with Next.js, Tailwind CSS &
              Framer Motion.
            </p>
            <p className="mt-1 text-zinc-500">
              Designed & engineered in the light · {profile.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}