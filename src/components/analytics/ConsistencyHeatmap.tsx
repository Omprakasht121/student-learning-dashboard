"use client";

import { Activity as ActivityIcon } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

/* ─── Types ───────────────────────────────────────────────────── */

export interface ContributionDay {
  date: string;
  count: number;
}

export interface ConsistencyHeatmapProps {
  contributions?: ContributionDay[];
  className?: string;
}

/* ─── Constants ───────────────────────────────────────────────── */

const WEEKS = 18; // Make it slightly larger for analytics page (18 weeks instead of 15)
const DAYS_PER_WEEK = 7;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

const INTENSITY_COLORS = [
  "rgba(255,255,255,0.03)",
  "rgba(99,102,241,0.25)",
  "rgba(99,102,241,0.45)",
  "rgba(99,102,241,0.65)",
  "rgba(129,140,248,0.85)",
] as const;

/* ─── Mock data generator (deterministic) ─────────────────────── */

function generateMockContributions(): ContributionDay[] {
  const today = new Date();
  const totalDays = WEEKS * DAYS_PER_WEEK;
  const contributions: ContributionDay[] = [];

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const seed = date.getFullYear() * 1000 + date.getMonth() * 100 + date.getDate();
    const hash = Math.abs(Math.sin(seed * 9301 + 49297) * 233280);
    const rand = hash - Math.floor(hash);

    let count = 0;
    if (rand > 0.30) count = 1;
    if (rand > 0.60) count = 2;
    if (rand > 0.80) count = 3;
    if (rand > 0.95) count = 4;

    const dayOfWeek = date.getDay();
    if ((dayOfWeek === 0 || dayOfWeek === 6) && rand > 0.5) {
      count = Math.max(0, count - 1);
    }

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
    });
  }

  return contributions;
}

function computeStats(contributions: ContributionDay[]) {
  const totalSessions = contributions.reduce((sum, d) => sum + d.count, 0);
  const activeDays = contributions.filter((d) => d.count > 0).length;

  let maxStreak = 0;
  let currentStreak = 0;
  for (const day of contributions) {
    if (day.count > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  const avgPerDay = contributions.length > 0
    ? (totalSessions / contributions.length).toFixed(1)
    : "0";

  return { totalSessions, activeDays, maxStreak, avgPerDay };
}

function getMonthLabels(contributions: ContributionDay[]) {
  const months: { label: string; colStart: number }[] = [];
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let lastMonth = -1;

  for (let week = 0; week < WEEKS; week++) {
    const dayIndex = week * DAYS_PER_WEEK;
    if (dayIndex >= contributions.length) break;

    const date = new Date(contributions[dayIndex].date);
    const month = date.getMonth();

    if (month !== lastMonth) {
      months.push({ label: shortMonths[month], colStart: week });
      lastMonth = month;
    }
  }

  return months;
}

/* ─── Component ───────────────────────────────────────────────── */

export default function ConsistencyHeatmap({
  contributions: externalContributions,
  className,
}: ConsistencyHeatmapProps) {
  const contributions = externalContributions ?? generateMockContributions();
  const stats = computeStats(contributions);
  const monthLabels = getMonthLabels(contributions);

  const grid: ContributionDay[][] = [];
  for (let week = 0; week < WEEKS; week++) {
    const weekDays: ContributionDay[] = [];
    for (let day = 0; day < DAYS_PER_WEEK; day++) {
      const index = week * DAYS_PER_WEEK + day;
      weekDays.push(contributions[index] ?? { date: "", count: 0 });
    }
    grid.push(weekDays);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.5 }}
      className={clsx(
        "relative overflow-hidden glass-card rounded-[var(--radius-xl)] p-6",
        "border border-border-subtle flex flex-col h-full",
        className
      )}
      style={{
        background: `
          radial-gradient(
            ellipse 70% 50% at 70% 0%,
            rgba(99,102,241,0.04) 0%,
            transparent 60%
          ),
          var(--bg-card)
        `,
      }}
    >
      <header className="flex items-center justify-between mb-6">
        <section className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center bg-accent-primary/10 border border-accent-primary/20"
            aria-hidden="true"
            style={{ boxShadow: '0 0 16px rgba(99,102,241,0.1) inset' }}
          >
            <ActivityIcon className="w-5 h-5 text-accent-primary drop-shadow-sm" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-fg-primary tracking-tight">
              Learning Consistency
            </h3>
            <p className="text-sm text-fg-muted font-medium mt-0.5">Your daily activity timeline.</p>
          </div>
        </section>

        <span className="text-xs text-fg-muted opacity-60 font-medium bg-white/5 px-2.5 py-1 rounded-md">
          Last {WEEKS} weeks
        </span>
      </header>

      <figure
        aria-label="Learning activity heatmap"
        className="flex-1 flex flex-col gap-1.5"
      >
        <figcaption className="flex ml-8 mb-2">
          {monthLabels.map(({ label, colStart }) => (
            <span
              key={`${label}-${colStart}`}
              className="text-xs text-fg-muted opacity-50 font-medium"
              style={{
                position: "relative",
                left: `${(colStart / WEEKS) * 100}%`,
                marginRight: "auto",
              }}
            >
              {label}
            </span>
          ))}
        </figcaption>

        <section className="flex gap-1">
          <aside className="flex flex-col gap-1 shrink-0 pr-2" aria-hidden="true">
            {DAY_LABELS.map((label, i) => (
              <span
                key={i}
                className="h-[14px] flex items-center text-[10px] text-fg-muted opacity-50 font-medium leading-none"
              >
                {label}
              </span>
            ))}
          </aside>

          <section className="flex gap-1 flex-1">
            {grid.map((week, weekIdx) => (
              <section key={weekIdx} className="flex flex-col gap-1 flex-1">
                {week.map((day, dayIdx) => {
                  const level = Math.min(day.count, 4);
                  return (
                    <motion.span
                      key={`${weekIdx}-${dayIdx}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", delay: 0.6 + (weekIdx * 0.02) }}
                      className="aspect-square rounded-[3px] w-full transition-all duration-200 hover:ring-1 hover:ring-white/30 hover:z-10 relative cursor-crosshair"
                      style={{
                        backgroundColor: INTENSITY_COLORS[level],
                        minWidth: "12px",
                      }}
                      title={day.date ? `${day.date}: ${day.count} sessions` : ""}
                      aria-hidden="true"
                    />
                  );
                })}
              </section>
            ))}
          </section>
        </section>

        <footer className="flex items-center justify-end gap-2 mt-4">
          <span className="text-xs text-fg-muted mr-1 font-medium">Less</span>
          {INTENSITY_COLORS.map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-[2px]"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          ))}
          <span className="text-xs text-fg-muted ml-1 font-medium">More</span>
        </footer>
      </figure>

      <footer className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-border-subtle">
        <section className="text-center">
          <p className="text-3xl font-bold text-fg-primary tabular-nums leading-none tracking-tight">
            {stats.totalSessions}
          </p>
          <p className="text-[11px] text-fg-muted opacity-70 mt-2 uppercase tracking-widest font-semibold">
            Sessions
          </p>
        </section>
        <section className="text-center">
          <p className="text-3xl font-bold text-accent-emerald tabular-nums leading-none tracking-tight">
            {stats.maxStreak}
          </p>
          <p className="text-[11px] text-fg-muted opacity-70 mt-2 uppercase tracking-widest font-semibold">
            Best Streak
          </p>
        </section>
        <section className="text-center">
          <p className="text-3xl font-bold text-accent-cyan tabular-nums leading-none tracking-tight">
            {stats.avgPerDay}
          </p>
          <p className="text-[11px] text-fg-muted opacity-70 mt-2 uppercase tracking-widest font-semibold">
            Avg / Day
          </p>
        </section>
      </footer>
    </motion.article>
  );
}
