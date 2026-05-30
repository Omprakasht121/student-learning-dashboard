/**
 * HeroTile — large premium welcome card for the dashboard.
 *
 * Features:
 *  - Personalized greeting
 *  - Learning streak indicator
 *  - Glassmorphism with glowing gradient overlay
 *  - Fully semantic HTML
 */

"use client";

import { Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export interface HeroTileProps {
  userName: string;
  streakDays: number;
}

export default function HeroTile({ userName, streakDays }: HeroTileProps) {
  return (
    <article
      className="
        relative overflow-hidden glass-card
        rounded-[var(--radius-xl)] p-8 sm:p-10
        border border-border-subtle
      "
      style={{
        background: `
          linear-gradient(135deg,
            rgba(99, 102, 241, 0.12) 0%,
            rgba(34, 211, 238, 0.06) 40%,
            rgba(52, 211, 153, 0.04) 70%,
            rgba(15, 15, 35, 0.95) 100%
          ),
          var(--bg-card)
        `,
      }}
    >
      {/* ── Glow orbs (decorative) ── */}
      <span
        aria-hidden="true"
        className="
          absolute -top-24 -right-24 w-72 h-72 rounded-full
          opacity-30 blur-3xl pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="
          absolute -bottom-16 -left-16 w-56 h-56 rounded-full
          opacity-20 blur-3xl pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <motion.section 
        className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Greeting */}
        <header>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-white/[0.04] border border-white/[0.05]">
            <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
            <span className="text-[11px] font-semibold text-fg-muted tracking-widest uppercase">
              Welcome back
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-fg-primary tracking-tight drop-shadow-md">
            Welcome back, {userName} <span className="inline-block origin-bottom-right hover:animate-wave">👋</span>
          </h1>
          <p className="text-fg-secondary text-sm sm:text-base mt-3 max-w-md leading-relaxed font-medium">
            Continue your learning momentum today.
          </p>
        </header>

        {/* Streak badge */}
        <aside
          aria-label={`${streakDays} day learning streak`}
          className="
            shrink-0
            flex items-center gap-4
            rounded-2xl px-5 py-4
            border border-accent-amber/20
            shadow-2xl shadow-accent-amber/10
          "
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.03) 100%)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px -4px rgba(251,191,36,0.15), 0 0 16px rgba(251,191,36,0.08) inset",
          }}
        >
          <span
            className="
              w-11 h-11 rounded-full
              flex items-center justify-center
              bg-accent-amber/15
            "
            aria-hidden="true"
          >
            <Flame className="w-5 h-5 text-accent-amber drop-shadow-sm" />
          </span>

          <section>
            <p 
              className="text-2xl font-bold text-fg-primary tracking-tight leading-none"
              style={{ textShadow: "0 0 12px rgba(251,191,36,0.2)" }}
            >
              {streakDays}
            </p>
            <p className="text-xs font-medium text-accent-amber mt-0.5">
              Day Streak
            </p>
          </section>
        </aside>
      </motion.section>
    </article>
  );
}
