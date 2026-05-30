"use client";

import { motion } from "framer-motion";

const GOALS = [
  { id: "weekly", label: "Weekly Target", current: 18, max: 20, color: "var(--accent-primary)", shadow: "rgba(99,102,241,0.4)" },
  { id: "monthly", label: "Monthly Target", current: 45, max: 80, color: "var(--accent-cyan)", shadow: "rgba(34,211,238,0.4)" },
  { id: "skill", label: "Skill Focus", current: 90, max: 100, color: "var(--accent-emerald)", shadow: "rgba(52,211,153,0.4)" },
];

export default function GoalProgress() {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.5 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 h-full flex flex-col gap-6"
    >
      <header>
        <h2 className="text-lg font-semibold text-fg-primary tracking-tight">Learning Goals</h2>
        <p className="text-sm text-fg-muted mt-1 font-medium">Your current progress trackers.</p>
      </header>

      <div className="flex flex-col gap-5 flex-1 justify-center">
        {GOALS.map((goal, i) => {
          const progress = goal.current / goal.max;
          const strokeDashoffset = circumference - progress * circumference;

          return (
            <div key={goal.id} className="flex items-center gap-5 group">
              <div className="relative w-[80px] h-[80px] shrink-0">
                {/* Background Ring */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                  />
                  {/* Progress Ring */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={goal.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, delay: 0.6 + i * 0.2, ease: "easeOut" }}
                    style={{ filter: `drop-shadow(0 0 6px ${goal.shadow})` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-fg-primary tabular-nums tracking-tighter">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-fg-primary">{goal.label}</span>
                <span className="text-xs text-fg-muted font-medium">
                  {goal.current} / {goal.max} hours
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
