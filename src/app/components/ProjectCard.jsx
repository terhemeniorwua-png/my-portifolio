"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion, useMotionValue, useSpring, useTransform, AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight, ChevronDown, Code2, Database, ExternalLink,
  Lock, Monitor, Network, RotateCcw, ScrollText,
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { fadeInUp, viewportOnce } from "./animations";

// HTTP method badge colors
const methodColors = {
  GET: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  POST: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400",
  PUT: "border-violet-500/40 bg-violet-500/10 text-violet-400",
  PATCH: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
  DELETE: "border-pink-500/40 bg-pink-500/10 text-pink-400",
};

function BrowserChrome({ title, url }) {
  return (
    <div className="relative flex items-center justify-between rounded-t-xl border-b border-white/[0.06] bg-[#0d0d14] px-4 py-2.5">
      {/* Window dots */}
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-pink-500/60" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
      </div>
      {/* URL bar */}
      <div className="absolute left-1/2 top-1/2 flex w-[62%] -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-md border border-white/[0.07] bg-[#111118] px-3 py-1 font-mono text-xs text-slate-500 shadow-xs">
        <Lock className="h-3 w-3 shrink-0 text-emerald-500/70" />
        <span className="truncate">{url}</span>
      </div>
      <span className="hidden shrink-0 font-mono text-[10px] text-slate-600 sm:block">{title}</span>
    </div>
  );
}

function DetailSection({ title, icon: Icon, children, accentClass = "text-cyan-400" }) {
  return (
    <div>
      <h5 className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${accentClass}`}>
        <Icon className="h-3.5 w-3.5" />
        {title}
      </h5>
      <div className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-slate-400">{children}</div>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const [mode, setMode] = useState("iframe");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [iframeCode, setIframeCode] = useState(0);

  const toIframe = () => {
    setMode("iframe");
    setIframeCode((c) => c + 1);
  };

  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 200, damping: 18 });

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onMouseLeave = () => { mx.set(0.5); my.set(0.5); };

  // Use project accent color for the glow halo
  const accentRgb = project.accent ?? "#22d3ee";

  return (
    <motion.article
      ref={ref}
      variants={fadeInUp}
      custom={index % 3}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1000, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111118]/90 shadow-xl shadow-black/50 transition-all duration-300 hover:border-white/[0.12]"
    >
      {/* Accent glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${accentRgb}12, transparent 65%)`,
        }}
      />
      {/* Sheen line */}
      <span aria-hidden className="sheen pointer-events-none absolute inset-x-0 top-0 h-px z-20" />

      {/* Browser mockup */}
      <div className="relative">
        <BrowserChrome title={project.title} url={project.iframeUrl} />
        <div className="relative h-52 overflow-hidden bg-[#0a0a10] sm:h-60">
          <AnimatePresence mode="wait">
            {mode === "iframe" ? (
              <motion.div
                key={`iframe-${iframeCode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full w-full"
              >
                <iframe
                  key={iframeCode}
                  src={project.iframeUrl}
                  title={`Live preview of ${project.title}`}
                  className="h-full w-full"
                  loading="lazy"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ) : (
              <motion.div
                key="screenshot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-full w-full"
              >
                <Image
                  src={project.screenshot}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover opacity-90"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live badge */}
          {mode === "iframe" && (
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.12] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>
          )}

          {/* Mode toggle */}
          <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0d0d14]/90 p-0.5 shadow-xs backdrop-blur">
            <button
              type="button"
              onClick={toIframe}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                mode === "iframe"
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Monitor className="h-3 w-3" /> Live
            </button>
            <button
              type="button"
              onClick={() => setMode("screenshot")}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                mode === "screenshot"
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Code2 className="h-3 w-3" /> Shot
            </button>
          </div>

          {mode === "screenshot" && (
            <button
              type="button"
              onClick={toIframe}
              className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0d0d14]/90 px-2.5 py-1.5 font-mono text-[10px] font-medium text-slate-400 backdrop-blur transition-colors hover:text-cyan-400"
            >
              <RotateCcw className="h-3 w-3" /> Try live embed
            </button>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-300">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => {
            const tagColors = [
              "border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-300",
              "border-violet-500/25 bg-violet-500/[0.07] text-violet-300",
              "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-300",
              "border-pink-500/25 bg-pink-500/[0.07] text-pink-300",
            ];
            return (
              <span
                key={tag}
                className={`rounded-full border px-3 py-0.5 font-mono text-xs ${tagColors[i % tagColors.length]}`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-[#050508] transition-all btn-glow-cyan"
            style={{ background: "linear-gradient(135deg, #22d3ee, #06b6d4)" }}
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-white"
          >
            <GithubIcon className="h-3.5 w-3.5" /> Repo
          </a>
          <button
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-400 transition-all hover:border-violet-500/30 hover:text-violet-400"
          >
            <ScrollText className="h-3.5 w-3.5" />
            Details
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${drawerOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Expandable details drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
            className="overflow-hidden border-t border-white/[0.06]"
          >
            <div className="grid gap-8 bg-[#0d0d14]/80 p-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailSection title="Architecture" icon={Network} accentClass="text-cyan-400">
                <ul className="list-disc space-y-1.5 pl-4">
                  {project.architecture.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection title="API Endpoints" icon={Code2} accentClass="text-violet-400">
                <ul className="space-y-2">
                  {project.endpoints.map((ep) => (
                    <li key={`${ep.method}-${ep.path}`} className="flex flex-col gap-0.5">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className={`rounded border px-1.5 py-0.5 font-bold text-[10px] ${methodColors[ep.method] ?? "border-slate-500/30 bg-slate-500/10 text-slate-400"}`}>
                          {ep.method}
                        </span>
                        <span className="text-slate-300">{ep.path}</span>
                      </span>
                      <span className="text-[10px] text-slate-500">{ep.desc}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection title="DB Schema" icon={Database} accentClass="text-emerald-400">
                <ul className="space-y-2.5">
                  {project.schema.map((tbl) => (
                    <li key={tbl.table} className="rounded-lg border border-white/[0.06] bg-[#111118] p-2.5">
                      <p className="text-[11px] text-emerald-400/80">table {tbl.table}</p>
                      <p className="mt-1 whitespace-pre-wrap leading-relaxed text-slate-500">
                        {tbl.columns.join("\n")}
                      </p>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover corner link */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-[#111118] text-slate-500 opacity-0 shadow-xs transition-all hover:border-cyan-500/30 hover:text-cyan-400 group-hover:opacity-100"
      >
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </motion.article>
  );
}
