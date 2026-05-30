"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Paintbrush } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const THEMES = [
  { id: "dark", label: "Dark", bg: "bg-slate-900", border: "border-slate-800" },
  { id: "midnight", label: "Midnight", bg: "bg-indigo-950", border: "border-indigo-900" },
  { id: "oled", label: "OLED Black", bg: "bg-black", border: "border-zinc-900" },
  { id: "purple", label: "Purple Glow", bg: "bg-fuchsia-950", border: "border-fuchsia-900" },
];

const ACCENTS = [
  { id: "indigo", color: "99, 102, 241" },
  { id: "cyan", color: "34, 211, 238" },
  { id: "emerald", color: "52, 211, 153" },
  { id: "amber", color: "251, 191, 36" },
  { id: "rose", color: "244, 63, 94" },
];

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [accent, setAccent] = useState("indigo");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.3 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 h-full flex flex-col gap-6"
    >
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-fg-primary tracking-tight">Appearance</h2>
          <p className="text-sm text-fg-muted mt-1 font-medium">Customize the dashboard's look and feel.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-accent-emerald/10 flex items-center justify-center text-accent-emerald">
          <Paintbrush className="w-5 h-5" />
        </div>
      </header>

      <div className="flex flex-col gap-6 flex-1">
        
        {/* Theme Selector */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-fg-primary">Base Theme</span>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`
                  relative flex flex-col gap-2 p-3 rounded-xl border text-left transition-all
                  ${theme === t.id ? 'border-accent-primary bg-accent-primary/5' : 'border-border-subtle bg-white/5 hover:border-white/20'}
                `}
              >
                {/* Mini Preview Window */}
                <div className={`w-full h-12 rounded-lg border ${t.border} ${t.bg} flex items-start p-1.5 gap-1.5`}>
                  <div className="w-3 h-full rounded bg-white/10" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="w-full h-2 rounded bg-white/10" />
                    <div className="w-2/3 h-2 rounded bg-white/5" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-fg-primary">{t.label}</span>
                
                {theme === t.id && (
                  <motion.div 
                    layoutId="theme-active"
                    className="absolute inset-0 rounded-xl border-2 border-accent-primary shadow-[0_0_12px_rgba(99,102,241,0.2)] pointer-events-none" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-border-subtle" />

        {/* Accent Color Selector */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-fg-primary">Accent Color</span>
          <div className="flex flex-wrap gap-4">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                onClick={() => setAccent(a.id)}
                className={`
                  w-8 h-8 rounded-full relative flex items-center justify-center transition-transform
                  ${accent === a.id ? 'scale-110' : 'hover:scale-110'}
                `}
                style={{ backgroundColor: `rgb(${a.color})` }}
              >
                {accent === a.id && (
                  <motion.div 
                    layoutId="accent-active"
                    className="absolute inset-[-6px] rounded-full border-2" 
                    style={{ borderColor: `rgb(${a.color})` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}
