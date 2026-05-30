import type { Metadata } from "next";
import type { Course } from "@/types/course";
import { getCourses } from "@/lib/supabase";

import CourseCard from "@/components/dashboard/CourseCard";
import BentoGrid, { BentoItem } from "@/components/dashboard/BentoGrid";

export const metadata: Metadata = {
  title: "Courses",
  description: "Track your learning progress and active courses.",
};



export default async function CoursesPage() {
  // Server-side fetch from Supabase
  const supabaseCourses = await getCourses();

  // Graceful fallback to empty array on failure
  const courses = supabaseCourses ?? [];

  return (
    <div className="flex flex-col gap-8">
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-fg-primary tracking-tight">
          Courses
        </h1>
        <p className="text-fg-secondary mt-2">
          Track your learning progress and active courses.
        </p>
      </header>

      {courses.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-fg-muted">
            No courses found. Enroll in a course to get started.
          </p>
        </div>
      ) : (
        <BentoGrid>
          <BentoItem colSpan={4} disableHover={true}>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </section>
          </BentoItem>
        </BentoGrid>
      )}
    </div>
  );
}
