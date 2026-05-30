/**
 * Supabase client utilities & data-access layer.
 *
 * Clients
 * ───────
 *  – `createBrowserClient()`          → Client Components
 *  – `createServerSupabaseClient()`   → Server Components / Route Handlers
 *
 * Data fetchers (server-only)
 * ───────────────────────────
 *  – `getCourses()`  → returns all rows from the `courses` table
 *
 * Environment variables required:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";
import { createServerClient as _createServerClient } from "@supabase/ssr";
import type { Database, Course } from "@/types/course";

/* ─── Env validation ──────────────────────────────────────────── */

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. ` +
        `Make sure it is defined in .env.local`
    );
  }
  return value;
}

/* ─── Browser (Client Component) ──────────────────────────────── */

export function createBrowserClient() {
  return _createBrowserClient<Database>(
    getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );
}

/* ─── Server (Server Component / Route Handler) ───────────────── */

export async function createServerSupabaseClient() {
  const { cookies: getCookies } = await import("next/headers");
  const cookieStore = await getCookies();

  return _createServerClient<Database>(
    getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll can throw when called from a Server Component
            // (cookies are read-only there). Safe to ignore.
          }
        },
      },
    }
  );
}

/**
 * Fetches all courses from the `courses` table, ordered by
 * most recently created first.
 *
 * Returns `null` when Supabase is not configured (env vars missing),
 * allowing the consumer to fall back to seed data in development.
 *
 * Usage (Server Component):
 * ```tsx
 * const courses = await getCourses();
 * ```
 */
export async function getCourses(): Promise<Course[] | null> {
  // Gracefully skip when Supabase isn't configured
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.warn(
      "[getCourses] Supabase env vars not set — returning null. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
    return null;
  }

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getCourses] Supabase query failed:", error.message);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return data ?? [];
}
