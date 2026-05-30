"use client";

/**
 * Sidebar — responsive navigation component.
 *
 * Desktop  (≥1024px): Full sidebar with icons + labels, fixed left
 * Tablet   (768–1023px): Collapsed icon-only sidebar, fixed left
 * Mobile   (<768px): Bottom navigation bar
 */

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  GraduationCap,
} from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* ──────────── Desktop / Tablet Sidebar ──────────── */}
      <aside
        aria-label="Main navigation"
        className="
          hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-40
          md:w-[var(--sidebar-collapsed)]
          lg:w-[var(--sidebar-width)]
          border-r border-border-subtle
        "
        style={{ background: "var(--gradient-sidebar)" }}
      >
        {/* Brand */}
        <header className="flex items-center gap-3 px-4 h-16 border-b border-border-subtle">
          <GraduationCap className="w-7 h-7 text-accent-primary shrink-0" />
          <span className="hidden lg:block text-lg font-semibold text-fg-primary tracking-tight">
            LearnHub
          </span>
        </header>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "group relative flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5",
                  "text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring-focus",
                  isActive
                    ? "text-accent-secondary"
                    : "text-fg-muted hover:text-fg-secondary"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-[var(--radius-md)] border border-accent-primary/20 shadow-[0_0_16px_rgba(99,102,241,0.1)_inset]"
                    style={{
                      background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 100%)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <Icon
                  className={clsx(
                    "relative z-10 w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-accent-primary" : "text-fg-muted group-hover:text-fg-secondary"
                  )}
                />
                <span className="relative z-10 hidden lg:block truncate">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <footer className="px-4 py-4 border-t border-border-subtle">
          <figure className="flex items-center gap-3">
            <span
              className="
                w-8 h-8 rounded-full shrink-0
                bg-accent-primary/20 border border-accent-primary/30
                flex items-center justify-center
                text-xs font-bold text-accent-secondary
              "
              aria-hidden="true"
            >
              S
            </span>
            <figcaption className="hidden lg:block min-w-0">
              <p className="text-sm font-semibold text-fg-primary truncate">
                Student
              </p>
              <p className="text-xs text-fg-muted opacity-80 truncate mt-0.5">
                student@learn.io
              </p>
            </figcaption>
          </figure>
        </footer>
      </aside>

      {/* ──────────── Mobile Bottom Nav ──────────── */}
      <nav
        aria-label="Mobile navigation"
        className="
          md:hidden fixed bottom-0 inset-x-0 z-40
          h-[var(--bottom-nav-height)]
          flex items-center justify-around
          border-t border-border-subtle
          bg-bg-surface/90 backdrop-blur-lg
        "
      >
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "group relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg",
                "text-[10px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring-focus",
                isActive
                  ? "text-accent-primary"
                  : "text-fg-muted hover:text-fg-secondary"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active-bg"
                  className="absolute inset-0 rounded-lg border border-accent-primary/20 shadow-[0_0_16px_rgba(99,102,241,0.1)_inset]"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 100%)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
              <Icon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
