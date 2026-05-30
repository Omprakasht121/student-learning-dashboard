"use client";

import { motion, type Variants } from "framer-motion";
import { Clock, BookOpen, Flame, Target } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const KPI_DATA = [
  {
    id: "hours",
    label: "Total Learning Hours",
    value: 124,
    suffix: "h",
    icon: Clock,
    color: "99, 102, 241", // indigo / primary
  },
  {
    id: "courses",
    label: "Courses Completed",
    value: 8,
    suffix: "",
    icon: BookOpen,
    color: "34, 211, 238", // cyan
  },
  {
    id: "consistency",
    label: "Weekly Consistency",
    value: 92,
    suffix: "%",
    icon: Target,
    color: "52, 211, 153", // emerald
  },
  {
    id: "streak",
    label: "Learning Streak",
    value: 12,
    suffix: "d",
    icon: Flame,
    color: "251, 191, 36", // amber
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

export default function KpiGrid() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {KPI_DATA.map((kpi) => (
        <motion.article
          key={kpi.id}
          variants={itemVariants}
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
        >
          {/* Subtle radial background glow based on KPI color */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 80% 0%, rgba(${kpi.color}, 0.4) 0%, transparent 60%)`,
            }}
          />

          {/* Premium Hardware-accelerated hover glow overlay */}
          <span 
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 z-50 rounded-[var(--radius-xl)]
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              border border-[var(--border-glow)]
              bg-white/[0.02]
            "
            style={{
              boxShadow: `0 0 24px rgba(${kpi.color}, 0.15)`
            }}
          />

          <div className="relative z-10 flex flex-col h-full gap-4">
            <header className="flex items-center justify-between">
              <span className="text-sm font-semibold text-fg-muted tracking-tight">
                {kpi.label}
              </span>
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/5"
                style={{
                  backgroundColor: `rgba(${kpi.color}, 0.1)`,
                  boxShadow: `0 0 12px rgba(${kpi.color}, 0.1) inset`,
                }}
              >
                <kpi.icon className="w-4 h-4" style={{ color: `rgb(${kpi.color})` }} />
              </span>
            </header>

            <div className="mt-auto">
              <AnimatedCounter 
                value={kpi.value} 
                suffix={kpi.suffix} 
                className="text-3xl font-bold text-fg-primary tabular-nums tracking-tighter drop-shadow-md" 
              />
            </div>
          </div>
        </motion.article>
      ))}
    </motion.section>
  );
}
