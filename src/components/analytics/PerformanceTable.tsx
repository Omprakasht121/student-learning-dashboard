"use client";

import type { Course } from "@/types/course";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Database,
  Globe,
  Palette,
  Rocket,
  Sparkles,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface PerformanceTableProps {
  courses: Course[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, Code, Database, Globe, Palette, Rocket, Sparkles, Layers
};

export default function PerformanceTable({ courses }: PerformanceTableProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.3 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 overflow-hidden flex flex-col h-full"
    >
      <header className="mb-6">
        <h2 className="text-lg font-semibold text-fg-primary tracking-tight drop-shadow-sm">Course Performance</h2>
        <p className="text-sm text-fg-muted mt-1 font-medium">Your active course completion and performance scores.</p>
      </header>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="pb-3 text-xs font-semibold text-fg-muted uppercase tracking-wider">Course</th>
              <th className="pb-3 text-xs font-semibold text-fg-muted uppercase tracking-wider text-center">Progress</th>
              <th className="pb-3 text-xs font-semibold text-fg-muted uppercase tracking-wider text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/50">
            {courses.slice(0, 5).map((course, i) => {
              const Icon = ICON_MAP[course.icon_name] || BookOpen;
              const isComplete = course.progress >= 100;
              // Mock a performance score based on progress
              const score = course.progress === 0 ? "-" : (course.progress > 80 ? "A+" : (course.progress > 50 ? "B" : "C"));
              const scoreColor = score === "A+" ? "text-accent-emerald" : (score === "B" ? "text-accent-cyan" : "text-accent-amber");

              return (
                <motion.tr 
                  key={course.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-fg-secondary group-hover:text-fg-primary transition-colors" />
                      </div>
                      <span className="text-sm font-semibold text-fg-primary line-clamp-1">{course.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 w-1/3">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className={`h-full rounded-full ${isComplete ? 'bg-accent-emerald' : 'bg-accent-primary'}`}
                          style={{
                            boxShadow: `0 0 8px ${isComplete ? 'rgba(52, 211, 153, 0.4)' : 'rgba(99, 102, 241, 0.4)'}`
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-fg-secondary tabular-nums min-w-[2.5rem] text-right">
                        {course.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <span className={`text-sm font-bold tracking-tight ${scoreColor}`}>
                      {score}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        {courses.length === 0 && (
          <div className="text-center py-8 text-sm text-fg-muted font-medium">
            No active courses found.
          </div>
        )}
      </div>
    </motion.section>
  );
}
