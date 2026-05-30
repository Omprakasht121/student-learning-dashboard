"use client";

/**
 * Dashboard error boundary — catches runtime errors in the
 * dashboard route segment (like Supabase fetch failures).
 *
 * Provides a premium, dark-themed fallback UI with a retry mechanism.
 */

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    // Log the error to an external reporting service in production
    console.error("[Dashboard Error]", error);
  }, [error]);

  return (
    <article 
      role="alert"
      aria-label="Dashboard error"
      className="
        w-full max-w-2xl mx-auto mt-12 sm:mt-24
        glass-card p-8 sm:p-12
        flex flex-col items-center text-center
        border border-accent-rose/20
      "
      style={{
        background: `
          radial-gradient(
            circle at top center,
            rgba(251,113,133,0.08) 0%,
            transparent 60%
          ),
          var(--bg-card)
        `
      }}
    >
      <span 
        className="
          w-16 h-16 rounded-full 
          flex items-center justify-center 
          bg-accent-rose/10 mb-6
        "
        style={{ boxShadow: "0 0 40px rgba(251,113,133,0.15)" }}
        aria-hidden="true"
      >
        <AlertCircle className="w-8 h-8 text-accent-rose" />
      </span>

      <h2 className="text-2xl font-bold text-fg-primary tracking-tight mb-3">
        Unable to load dashboard
      </h2>
      
      <p className="text-sm text-fg-secondary max-w-md mb-8 leading-relaxed">
        We encountered an unexpected issue while retrieving your learning data. 
        Please check your connection and try again.
      </p>

      <button
        type="button"
        onClick={reset}
        className="
          group relative inline-flex items-center justify-center gap-2
          px-6 py-2.5 text-sm font-medium
          rounded-[var(--radius-md)]
          bg-white/5 text-fg-primary
          border border-border-default hover:border-border-glow
          transition-all duration-200 ease-out
          hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus
        "
      >
        <RefreshCw className="w-4 h-4 text-fg-muted group-hover:text-fg-primary transition-colors" />
        Try Again
      </button>
    </article>
  );
}
