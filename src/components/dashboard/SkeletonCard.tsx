/**
 * SkeletonCard — shimmer loading placeholder for dashboard cards.
 *
 * Three variants match the dimensions of HeroTile, CourseCard, and ActivityTile.
 */

import clsx from "clsx";

export interface SkeletonCardProps {
  variant?: "hero" | "course" | "activity";
  className?: string;
}

function ShimmerBar({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "block rounded-md bg-white/[0.04] animate-pulse",
        className
      )}
    />
  );
}

export default function SkeletonCard({
  variant = "course",
  className,
}: SkeletonCardProps) {
  if (variant === "hero") {
    return (
      <article
        aria-busy="true"
        aria-label="Loading hero"
        className={clsx("glass-card p-8 sm:p-10", className)}
      >
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <section className="flex flex-col gap-3">
            <ShimmerBar className="w-32 h-4 mb-1" />
            <ShimmerBar className="w-56 sm:w-72 h-10 mb-1" />
            <ShimmerBar className="w-64 sm:w-96 h-4 mt-2" />
          </section>
          <ShimmerBar className="w-36 h-16 rounded-[var(--radius-lg)] shrink-0" />
        </header>
      </article>
    );
  }

  if (variant === "activity") {
    return (
      <article
        aria-busy="true"
        aria-label="Loading activity"
        className={clsx("glass-card p-5 sm:p-6 flex flex-col", className)}
      >
        {/* Header */}
        <header className="flex items-center justify-between mb-5">
          <section className="flex items-center gap-2.5">
            <ShimmerBar className="w-9 h-9 rounded-[var(--radius-md)] shrink-0" />
            <ShimmerBar className="w-32 h-5" />
          </section>
          <ShimmerBar className="w-20 h-3" />
        </header>

        {/* Heatmap skeleton area */}
        <section className="flex-1 flex flex-col gap-2 min-h-[140px] mb-4">
           <ShimmerBar className="w-full h-full rounded-sm min-h-[140px]" />
        </section>

        {/* Stats footer */}
        <footer className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border-subtle">
          <section className="flex flex-col items-center gap-2">
            <ShimmerBar className="w-12 h-6" />
            <ShimmerBar className="w-16 h-3" />
          </section>
          <section className="flex flex-col items-center gap-2">
            <ShimmerBar className="w-12 h-6" />
            <ShimmerBar className="w-20 h-3" />
          </section>
          <section className="flex flex-col items-center gap-2">
            <ShimmerBar className="w-12 h-6" />
            <ShimmerBar className="w-16 h-3" />
          </section>
        </footer>
      </article>
    );
  }

  /* Default: course variant */
  return (
    <article
      aria-busy="true"
      aria-label="Loading course"
      className={clsx("glass-card p-5 sm:p-6 flex flex-col gap-4 min-h-[180px]", className)}
    >
      <header className="flex items-center justify-between">
        <ShimmerBar className="w-11 h-11 rounded-[var(--radius-md)] shrink-0" />
        <ShimmerBar className="w-24 h-5 rounded-full" />
      </header>
      
      <section className="flex-1 mt-2">
        <ShimmerBar className="w-3/4 h-5 mb-2" />
        <ShimmerBar className="w-1/2 h-5" />
      </section>

      <footer className="flex flex-col gap-2.5 mt-auto">
        <section className="flex justify-between items-center">
          <ShimmerBar className="w-16 h-3" />
          <ShimmerBar className="w-10 h-3" />
        </section>
        <ShimmerBar className="w-full h-2 rounded-full" />
      </footer>
    </article>
  );
}
