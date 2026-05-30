"use client";

/**
 * BentoGrid — responsive CSS Grid layout for dashboard widgets.
 *
 * Desktop:  4-column grid with variable spans
 * Tablet:   2-column grid
 * Mobile:   1-column stack
 * 
 * Uses framer-motion for staggered entrance and hardware-accelerated
 * hover animations (scale, opacity).
 */

import type { ReactNode } from "react";
import clsx from "clsx";
import { motion, type Variants } from "framer-motion";

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BentoGrid({ children, className, stagger = true }: BentoGridProps) {
  return (
    <motion.section
      aria-label="Dashboard grid"
      className={clsx(
        "grid gap-4",
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-4",
        "auto-rows-min",
        className
      )}
      variants={stagger ? gridVariants : undefined}
      initial={stagger ? "hidden" : "show"}
      animate="show"
    >
      {children}
    </motion.section>
  );
}

/* ──────────────── Grid-span wrapper for bento items ─────────── */

export interface BentoItemProps {
  children: ReactNode;
  /** Column span at lg breakpoint (1–4). Defaults to 1. */
  colSpan?: 1 | 2 | 3 | 4;
  /** Row span. Defaults to 1. */
  rowSpan?: 1 | 2;
  className?: string;
  /** Disables the default hover scale and glow effects */
  disableHover?: boolean;
}

const COL_SPAN_CLASSES: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

const ROW_SPAN_CLASSES: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

export function BentoItem({
  children,
  colSpan = 1,
  rowSpan = 1,
  className,
  disableHover = false,
}: BentoItemProps) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={disableHover ? undefined : { 
        scale: 1.02, 
        transition: { type: "spring", stiffness: 300, damping: 20 } 
      }}
      className={clsx(
        "relative rounded-[var(--radius-xl)]",
        !disableHover && "group",
        COL_SPAN_CLASSES[colSpan],
        ROW_SPAN_CLASSES[rowSpan],
        className
      )}
      style={{ transformOrigin: "center center" }}
    >
      {children}
      
      {/* 
        Hardware-accelerated hover effects overlay. 
        Uses opacity to shift gradient and show border glow without repaints.
      */}
      {!disableHover && (
        <span 
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-50 rounded-[var(--radius-xl)]
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            border border-[var(--border-glow)]
            bg-white/[0.02]
          "
          style={{
            boxShadow: "0 0 24px var(--accent-primary-glow)"
          }}
        />
      )}
    </motion.article>
  );
}
