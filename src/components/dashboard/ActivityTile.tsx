/**
 * ActivityTile — GitHub-style contribution heatmap for learning activity.
 *
 * Features:
 *  - 15-week contribution grid (7 rows × 15 cols)
 *  - 4-level intensity color scale
 *  - Day labels (Mon, Wed, Fri)
 *  - Month labels along top
 *  - Summary stats (total sessions, best streak, avg/day)
 *  - Deterministic mock data from a seed
 *
 * Fully semantic, animation-ready, responsive.
 */

import { Activity as ActivityIcon } from "lucide-react";
import clsx from "clsx";

/* ─── Types ───────────────────────────────────────────────────── */

export interface ContributionDay {
  date: string;      // ISO date string (YYYY-MM-DD)
  count: number;     // 0–4+ activities
}

export interface ActivityTileProps {
  /** 15 weeks × 7 days = 105 entries. Auto-generated if omitted. */
  contributions?: ContributionDay[];
  className?: string;
}

/* ─── Constants ───────────────────────────────────────────────── */

const WEEKS = 15;
const DAYS_PER_WEEK = 7;
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""] as const;

/**
 * Intensity levels → color.
 * Level 0 = no activity, Level 4 = max activity.
 */
const INTENSITY_COLORS = [
  "rgba(255,255,255,0.03)",   // 0: empty
  "rgba(99,102,241,0.25)",    // 1: light
  "rgba(99,102,241,0.45)",    // 2: medium
  "rgba(99,102,241,0.65)",    // 3: strong
  "rgba(129,140,248,0.85)",   // 4: max
] as const;

/* ─── Mock data generator (deterministic) ─────────────────────── */

function generateMockContributions(): ContributionDay[] {
  const today = new Date();
  const totalDays = WEEKS * DAYS_PER_WEEK;
  const contributions: ContributionDay[] = [];

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Deterministic pseudo-random from date
    const seed = date.getFullYear() * 1000 + date.getMonth() * 100 + date.getDate();
    const hash = Math.abs(Math.sin(seed * 9301 + 49297) * 233280);
    const rand = hash - Math.floor(hash);

    // Weighted distribution: ~30% empty, ~30% low, ~20% medium, ~15% strong, ~5% max
    let count = 0;
    if (rand > 0.30) count = 1;
    if (rand > 0.60) count = 2;
    if (rand > 0.80) count = 3;
    if (rand > 0.95) count = 4;

    // Weekends are less active
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

  // Longest streak
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

export default function ActivityTile({
  contributions: externalContributions,
  className,
}: ActivityTileProps) {
  const contributions = externalContributions ?? generateMockContributions();
  const stats = computeStats(contributions);
  const monthLabels = getMonthLabels(contributions);

  // Build grid: weeks as columns, days as rows
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
    <article
      className={clsx(
        "relative overflow-hidden glass-card rounded-[var(--radius-xl)] p-5 sm:p-6",
        "border border-border-subtle flex flex-col",
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
      {/* Header */}
      <header className="flex items-center justify-between mb-5">
        <section className="flex items-center gap-2.5">
          <span
            className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center bg-accent-primary/10"
            aria-hidden="true"
          >
            <ActivityIcon className="w-4 h-4 text-accent-primary" />
          </span>
          <h3 className="text-sm font-semibold text-fg-primary">
            Learning Activity
          </h3>
        </section>

        <span className="text-xs text-fg-muted opacity-60 font-medium">
          Last {WEEKS} weeks
        </span>
      </header>

      {/* Contribution heatmap */}
      <figure
        aria-label="Learning activity heatmap"
        className="flex-1 flex flex-col gap-1.5"
      >
        {/* Month labels */}
        <figcaption className="flex ml-8 mb-1">
          {monthLabels.map(({ label, colStart }) => (
            <span
              key={`${label}-${colStart}`}
              className="text-[10px] text-fg-muted opacity-50 font-medium"
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

        {/* Grid: rows = days, columns = weeks */}
        <section className="flex gap-[3px]">
          {/* Day labels column */}
          <aside className="flex flex-col gap-[3px] shrink-0 pr-1.5" aria-hidden="true">
            {DAY_LABELS.map((label, i) => (
              <span
                key={i}
                className="h-[13px] flex items-center text-[9px] text-fg-muted opacity-50 font-medium leading-none"
              >
                {label}
              </span>
            ))}
          </aside>

          {/* Heatmap squares */}
          <section className="flex gap-[3px] flex-1">
            {grid.map((week, weekIdx) => (
              <section key={weekIdx} className="flex flex-col gap-[3px] flex-1">
                {week.map((day, dayIdx) => {
                  const level = Math.min(day.count, 4);
                  return (
                    <span
                      key={`${weekIdx}-${dayIdx}`}
                      className="aspect-square rounded-[2px] w-full transition-all duration-200 hover:ring-1 hover:ring-white/30 hover:z-10 relative cursor-crosshair"
                      style={{
                        backgroundColor: INTENSITY_COLORS[level],
                        minWidth: "8px",
                        maxWidth: "16px",
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

        {/* Legend */}
        <footer className="flex items-center justify-end gap-1.5 mt-2">
          <span className="text-[10px] text-fg-muted mr-1">Less</span>
          {INTENSITY_COLORS.map((color, i) => (
            <span
              key={i}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          ))}
          <span className="text-[10px] text-fg-muted ml-1">More</span>
        </footer>
      </figure>

      {/* Stats summary */}
      <footer className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border-subtle">
        <section className="text-center">
          <p className="text-2xl font-bold text-fg-primary tabular-nums leading-none tracking-tight">
            {stats.totalSessions}
          </p>
          <p className="text-[10px] text-fg-muted opacity-70 mt-1.5 uppercase tracking-widest font-semibold">
            Sessions
          </p>
        </section>
        <section className="text-center">
          <p className="text-2xl font-bold text-accent-emerald tabular-nums leading-none tracking-tight">
            {stats.maxStreak}
          </p>
          <p className="text-[10px] text-fg-muted opacity-70 mt-1.5 uppercase tracking-widest font-semibold">
            Best Streak
          </p>
        </section>
        <section className="text-center">
          <p className="text-2xl font-bold text-accent-cyan tabular-nums leading-none tracking-tight">
            {stats.avgPerDay}
          </p>
          <p className="text-[10px] text-fg-muted opacity-70 mt-1.5 uppercase tracking-widest font-semibold">
            Avg / Day
          </p>
        </section>
      </footer>
    </article>
  );
}
