/**
 * Dashboard page — main landing view (Server Component).
 *
 * Fetches courses from Supabase server-side via getCourses().
 */

import type { Metadata } from "next";
import type { Course } from "@/types/course";
import { getCourses } from "@/lib/supabase";

import BentoGrid, { BentoItem } from "@/components/dashboard/BentoGrid";
import HeroTile from "@/components/dashboard/HeroTile";
import CourseCard from "@/components/dashboard/CourseCard";
import ActivityTile from "@/components/dashboard/ActivityTile";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Track your learning progress, view enrolled courses, and stay on top of your study goals.",
};




/* ─── Page (async Server Component) ───────────────────────────── */

export default async function DashboardPage() {
  // Server-side fetch from Supabase
  const supabaseCourses = await getCourses();
  
  // Gracefully fallback to empty array if fetch fails/unconfigured
  const courses = supabaseCourses ?? [];


  return (
    <>
      <BentoGrid>
        {/* ── Row 1: Full-width Hero welcome card ── */}
        <BentoItem colSpan={4}>
          <HeroTile userName="Om" streakDays={12} />
        </BentoItem>

        {/* ── Row 2+: Courses (3 cols) + Activity (1 col, 2 rows) ── */}
        <BentoItem colSpan={3} rowSpan={2} disableHover={true}>
          <section aria-label="Enrolled courses">
            <h2 className="text-lg font-semibold text-fg-primary mb-4">
              My Courses
            </h2>

            {courses.length === 0 ? (
              <p className="text-sm text-fg-muted py-8 text-center">
                No courses yet. Enroll in a course to get started.
              </p>
            ) : (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </section>
            )}
          </section>
        </BentoItem>

        <BentoItem colSpan={1} rowSpan={2}>
          <ActivityTile className="h-full" />
        </BentoItem>
      </BentoGrid>
    </>
  );
}
