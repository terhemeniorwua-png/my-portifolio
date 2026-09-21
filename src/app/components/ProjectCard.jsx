"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  Lock,
  Monitor,
  Network,
  RotateCcw,
  ScrollText,
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { fadeInUp, viewportOnce } from "./animations";

function BrowserChrome({ title, url }) {
  return (
    <div className="relative flex items-center justify-between rounded-t-xl border-b border-zinc-200 bg-zinc-100/90 px-4 py-2.5">
      {/* Minimalist monochrome window dots */}
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-zinc-300" />
        <span className="h-3 w-3 rounded-full bg-zinc-300" />
        <span className="h-3 w-3 rounded-full bg-zinc-300" />
      </div>
      {/* Fake URL bar */}
      <div className="absolute left-1/2 top-1/2 flex w-[62%] -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1 font-mono text-xs text-zinc-600 shadow-2xs">
        <Lock className="h-3 w-3 shrink-0 text-zinc-400" />
        <span className="truncate">{url}</span>
      </div>
      <span className="hidden shrink-0 text-[10px] font-mono text-zinc-400 sm:block">{title}</span>
    </div>
  );
}

function DetailSection({ title, icon: Icon, children }) {
  return (
    <div>
      <h5 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
        <Icon className="h-3.5 w-3.5" />
        {title}
      </h5>
      <div className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-zinc-700">{children}</div>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const [mode, setMode] = useState("iframe"); // 'iframe' | 'screenshot'
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
  const onMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:border-zinc-300 hover:shadow-md"
    >
      {/* Sheen sweep across the top border on hover */}
      <span aria-hidden className="sheen pointer-events-none absolute inset-x-0 top-0 h-px z-20" />

      {/* Browser mockup */}
      <div className="relative">
        <BrowserChrome title={project.title} url={project.iframeUrl} />
        <div className="relative h-52 overflow-hidden bg-white sm:h-60">
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
                  className="object-cover grayscale contrast-110"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {mode === "iframe" && (
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-700 shadow-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-950" />
              Live
            </span>
          )}

          {/* mode toggle */}
          <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-lg border border-zinc-200 bg-white/90 p-0.5 shadow-xs backdrop-blur">
            <button
              type="button"
              onClick={toIframe}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                mode === "iframe" ? "bg-zinc-950 text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Monitor className="h-3 w-3" /> Live
            </button>
            <button
              type="button"
              onClick={() => setMode("screenshot")}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                mode === "screenshot" ? "bg-zinc-950 text-white" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Code2 className="h-3 w-3" /> Shot
            </button>
          </div>

          {mode === "screenshot" && (
            <button
              type="button"
              onClick={toIframe}
              className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white/90 px-2.5 py-1.5 text-[10px] font-medium text-zinc-600 shadow-xs backdrop-blur transition-colors hover:border-zinc-400 hover:text-zinc-950"
            >
              <RotateCcw className="h-3 w-3" /> Try live embed
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-zinc-950 transition-colors group-hover:text-zinc-700">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs uppercase tracking-wider rounded-full bg-zinc-100 px-3 py-1 text-zinc-700 border border-zinc-300/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_8px_28px_-8px_rgba(9,9,11,0.6)] transition-colors hover:bg-zinc-800"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
          >
            <GithubIcon className="h-3.5 w-3.5" /> Repo
          </a>
          <button
            type="button"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
          >
            <ScrollText className="h-3.5 w-3.5" />
            Details
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${drawerOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
            className="overflow-hidden border-t border-zinc-200"
          >
            <div className="grid gap-8 bg-zinc-50/80 p-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailSection title="Architecture" icon={Network}>
                <ul className="list-disc space-y-1.5 pl-4">
                  {project.architecture.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection title="API Endpoints" icon={Code2}>
                <ul className="space-y-2 font-mono text-xs">
                  {project.endpoints.map((ep) => (
                    <li key={`${ep.method}-${ep.path}`} className="flex flex-col gap-0.5">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 font-bold text-zinc-800">
                          {ep.method}
                        </span>
                        <span className="text-zinc-900">{ep.path}</span>
                      </span>
                      <span className="text-[10px] text-zinc-500">{ep.desc}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <DetailSection title="DB Schema" icon={Database}>
                <ul className="space-y-2.5 font-mono text-xs">
                  {project.schema.map((tbl) => (
                    <li key={tbl.table} className="rounded-lg border border-zinc-200 bg-white p-2.5">
                      <p className="text-[11px] text-zinc-700">table {tbl.table}</p>
                      <p className="mt-1 whitespace-pre-wrap leading-relaxed text-zinc-500">
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

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-600 opacity-0 shadow-xs transition-all hover:border-zinc-400 hover:text-zinc-950 group-hover:opacity-100"
      >
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </motion.article>
  );
}