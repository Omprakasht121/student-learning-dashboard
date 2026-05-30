import type { Metadata } from "next";
import { getCourses } from "@/lib/supabase";
import BentoGrid, { BentoItem } from "@/components/dashboard/BentoGrid";

import KpiGrid from "@/components/analytics/KpiGrid";
import ProgressChart from "@/components/analytics/ProgressChart";
import PerformanceTable from "@/components/analytics/PerformanceTable";
import ConsistencyHeatmap from "@/components/analytics/ConsistencyHeatmap";
import Achievements from "@/components/analytics/Achievements";
import type { Course } from "@/types/course";

export const metadata: Metadata = {
  title: "Learning Analytics",
  description: "Track your learning performance, consistency, and progress trends.",
};



export default async function AnalyticsPage() {
  const supabaseCourses = await getCourses();
  const courses = supabaseCourses ?? [];

  return (
    <div className="flex flex-col gap-8">
      {/* ── Header Section ── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-fg-primary tracking-tight">
            Learning Analytics
          </h1>
          <p className="text-fg-secondary mt-2 font-medium">
            Track your learning performance, consistency, and progress trends.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="inline-flex items-center p-1 rounded-lg bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {["7 days", "30 days", "90 days"].map((range, i) => (
            <button
              key={range}
              className={`
                px-4 py-1.5 text-xs font-semibold rounded-md transition-colors
                ${i === 0 ? 'bg-white/10 text-fg-primary shadow-sm' : 'text-fg-muted hover:text-fg-secondary hover:bg-white/5'}
              `}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      {/* ── Section 1: Top KPI Cards ── */}
      <KpiGrid />

      {/* ── Section 2-5: Bento Layout ── */}
      <BentoGrid>
        {/* Progress Chart (Full Width) */}
        <BentoItem colSpan={4} disableHover={true}>
          <ProgressChart />
        </BentoItem>

        {/* Course Performance (3 cols) & Achievements (1 col) */}
        <BentoItem colSpan={3} disableHover={true}>
          <PerformanceTable courses={courses} />
        </BentoItem>
        <BentoItem colSpan={1} disableHover={true}>
          <Achievements />
        </BentoItem>

        {/* Consistency Heatmap (Full Width) */}
        <BentoItem colSpan={4} disableHover={true}>
          <ConsistencyHeatmap />
        </BentoItem>
      </BentoGrid>
    </div>
  );
}
