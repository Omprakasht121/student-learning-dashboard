/**
 * Core type definitions for the Student Learning Dashboard.
 *
 * These types mirror the Supabase `courses` table schema
 * and provide additional client-side types for the dashboard.
 */

/* ──────────────────────────── Database Row ───────────────────── */

/**
 * Represents a row in the `courses` table.
 *
 * Schema:
 *   id          uuid        PRIMARY KEY
 *   title       text
 *   progress    integer     (0–100)
 *   icon_name   text        (lucide-react icon identifier)
 *   created_at  timestamptz
 */
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

/* ──────────────────────────── Supabase DB ────────────────────── */

/**
 * Supabase generated-style database type map.
 * Extend this as you add more tables.
 */
export interface Database {
  public: {
    Tables: {
      courses: {
        Row: Course;
        Insert: Omit<Course, "id" | "created_at">;
        Update: Partial<Omit<Course, "id" | "created_at">>;
      };
    };
  };
}

/* ──────────────────────────── Activity ───────────────────────── */

/** A single activity event (lesson completion, quiz attempt, etc.) */
export interface Activity {
  id: string;
  course_id: string;
  course_title: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export type ActivityType =
  | "lesson_completed"
  | "quiz_attempted"
  | "assignment_submitted"
  | "certificate_earned"
  | "course_started";

/* ────────────────────── Aggregate / Stats ────────────────────── */

/** High-level stats displayed in the dashboard hero tiles. */
export interface DashboardStats {
  total_courses: number;
  courses_in_progress: number;
  courses_completed: number;
  total_hours_spent: number;
  current_streak_days: number;
  average_score: number;
}
