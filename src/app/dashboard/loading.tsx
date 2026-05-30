/**
 * Dashboard loading state — shimmer skeletons matching the bento layout.
 */

import BentoGrid, { BentoItem } from "@/components/dashboard/BentoGrid";
import SkeletonCard from "@/components/dashboard/SkeletonCard";

export default function DashboardLoading() {
  return (
    <section aria-busy="true" aria-label="Loading dashboard">
      <BentoGrid>
        {/* ── Row 1: Full-width Hero welcome card ── */}
        <BentoItem colSpan={4}>
          <SkeletonCard variant="hero" />
        </BentoItem>

        {/* ── Row 2+: Courses (3 cols) + Activity (1 col, 2 rows) ── */}
        <BentoItem colSpan={3} rowSpan={2}>
          <section aria-label="Loading enrolled courses">
            <h2 className="text-lg font-semibold text-fg-primary mb-4">
              My Courses
            </h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SkeletonCard variant="course" />
              <SkeletonCard variant="course" />
              <SkeletonCard variant="course" />
              <SkeletonCard variant="course" />
              <SkeletonCard variant="course" />
              <SkeletonCard variant="course" />
            </section>
          </section>
        </BentoItem>

        <BentoItem colSpan={1} rowSpan={2}>
          <SkeletonCard variant="activity" className="h-full" />
        </BentoItem>
      </BentoGrid>
    </section>
  );
}
