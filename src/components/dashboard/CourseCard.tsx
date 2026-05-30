/**
 * CourseCard — premium futuristic course tile.
 *
 * Features:
 *  - Dynamic Lucide icon resolved from DB `icon_name`
 *  - Custom segmented progress bar with glow
 *  - Subtle mesh-gradient background unique per card
 *  - Fully typed, fully reusable Server Component
 */

"use client";

import type { Course } from "@/types/course";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Database,
  Globe,
  Cpu,
  Palette,
  Rocket,
  Sparkles,
  Brain,
  Shield,
  Layers,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface CourseCardProps {
  course: Course;
}

/* ─── Icon registry ───────────────────────────────────────────── */

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Code,
  Database,
  Globe,
  Cpu,
  Palette,
  Rocket,
  Sparkles,
  Brain,
  Shield,
  Layers,
  Zap,
};

/* ─── Accent palette (deterministic per card) ─────────────────── */

const ACCENT_PALETTE = [
  { color: "99,102,241", label: "indigo" },   // --accent-primary
  { color: "34,211,238", label: "cyan" },      // --accent-cyan
  { color: "52,211,153", label: "emerald" },   // --accent-emerald
  { color: "251,191,36", label: "amber" },     // --accent-amber
  { color: "251,113,133", label: "rose" },     // --accent-rose
  { color: "129,140,248", label: "secondary" },// --accent-secondary
] as const;

function getAccent(id: string) {
  // Deterministic palette pick from course id
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ACCENT_PALETTE[Math.abs(hash) % ACCENT_PALETTE.length];
}

function getProgressStatus(progress: number): string {
  if (progress >= 100) return "Complete";
  if (progress >= 70) return "Almost there";
  if (progress >= 40) return "In progress";
  return "Getting started";
}

/* ─── Component ───────────────────────────────────────────────── */

export default function CourseCard({ course }: CourseCardProps) {
  const Icon = ICON_MAP[course.icon_name] ?? Code;
  const accent = getAccent(course.id);
  const status = getProgressStatus(course.progress);
  const isComplete = course.progress >= 100;

  return (
    <motion.article
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 20 } 
      }}
      className="
        group relative overflow-hidden glass-card
        rounded-[var(--radius-xl)] p-5 sm:p-6
        border border-border-subtle
        transition-colors
      "
      style={{
        background: `
          radial-gradient(
            ellipse 80% 60% at 80% 10%,
            rgba(${accent.color}, 0.06) 0%,
            transparent 60%
          ),
          radial-gradient(
            ellipse 60% 50% at 10% 90%,
            rgba(${accent.color}, 0.03) 0%,
            transparent 50%
          ),
          var(--bg-card)
        `,
      }}
    >
      {/* Grain texture overlay */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Hardware-accelerated hover effects overlay */}
      <span 
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-50 rounded-[var(--radius-xl)]
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          border border-[var(--border-glow)]
          bg-white/[0.02]
        "
        style={{
          boxShadow: "0 0 24px var(--accent-primary-glow)"
        }}
      />

      {/* Content */}
      <section className="relative z-10 flex flex-col gap-4 h-full">
        {/* Header: icon + status */}
        <header className="flex items-center justify-between">
          <span
            className="
              w-11 h-11 rounded-[var(--radius-md)]
              flex items-center justify-center
            "
            style={{
              backgroundColor: `rgba(${accent.color}, 0.1)`,
              boxShadow: `0 0 20px rgba(${accent.color}, 0.06)`,
            }}
            aria-hidden="true"
          >
            <Icon
              className="w-5 h-5"
              style={{ color: `rgb(${accent.color})` }}
            />
          </span>

          <mark
            className="
              text-[10px] font-semibold uppercase tracking-wider
              px-2.5 py-1 rounded-full
              bg-transparent border
            "
            style={{
              color: `rgb(${accent.color})`,
              borderColor: `rgba(${accent.color}, 0.2)`,
              backgroundColor: `rgba(${accent.color}, 0.06)`,
            }}
          >
            {status}
          </mark>
        </header>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-fg-primary leading-snug line-clamp-2 min-h-[2.5rem]">
          {course.title}
        </h3>

        {/* Progress section */}
        <footer className="flex flex-col gap-2.5 mt-auto">
          <section className="flex items-center justify-between">
            <span className="text-xs text-fg-muted opacity-80">Progress</span>
            <span
              className="text-xs font-bold tabular-nums"
              style={{ color: `rgb(${accent.color})` }}
            >
              {course.progress}%
            </span>
          </section>

          {/* Custom progress bar */}
          <figure
            role="progressbar"
            aria-valuenow={course.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${course.title}: ${course.progress}% complete`}
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: `rgba(${accent.color}, 0.08)` }}
          >
            <motion.span
              className="block h-full rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              style={{
                background: isComplete
                  ? `rgb(${accent.color})`
                  : `linear-gradient(90deg, rgba(${accent.color}, 0.6) 0%, rgb(${accent.color}) 100%)`,
                boxShadow: `0 0 12px rgba(${accent.color}, 0.3)`,
              }}
            />
          </figure>
        </footer>
      </section>
    </motion.article>
  );
}
