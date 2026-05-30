"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSwitch from "./AnimatedSwitch";
import { Target, Clock } from "lucide-react";

export default function LearningPreferences() {
  const [goal, setGoal] = useState(2);
  const [focusMode, setFocusMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [time, setTime] = useState("Evening");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.1 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 h-full flex flex-col gap-6"
    >
      <header>
        <h2 className="text-lg font-semibold text-fg-primary tracking-tight">Learning Preferences</h2>
        <p className="text-sm text-fg-muted mt-1 font-medium">Customize your study environment.</p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Custom Slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm font-semibold text-fg-primary">Daily Goal</span>
            </div>
            <span className="text-xs font-bold text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-md">
              {goal} {goal === 1 ? 'hour' : 'hours'}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-cyan hover:bg-white/20 transition-colors"
          />
          <div className="flex justify-between text-[10px] text-fg-muted font-medium">
            <span>Casual (1h)</span>
            <span>Intense (8h)</span>
          </div>
        </div>

        <hr className="border-border-subtle" />

        {/* Custom Dropdown (Mock) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-amber" />
            <span className="text-sm font-semibold text-fg-primary">Preferred Time</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Morning", "Afternoon", "Evening"].map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`
                  py-2 text-xs font-semibold rounded-lg transition-all border
                  ${time === t 
                    ? 'bg-accent-amber/10 border-accent-amber/30 text-accent-amber shadow-[0_0_12px_rgba(251,191,36,0.1)_inset]' 
                    : 'bg-white/5 border-transparent text-fg-muted hover:bg-white/10'}
                `}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-border-subtle" />

        {/* Toggles */}
        <div className="flex flex-col">
          <AnimatedSwitch
            checked={focusMode}
            onChange={setFocusMode}
            label="Focus Mode"
            description="Hide non-essential UI while studying."
          />
          <AnimatedSwitch
            checked={autoSave}
            onChange={setAutoSave}
            label="Auto-save Progress"
            description="Automatically sync local changes."
          />
        </div>
      </div>
    </motion.section>
  );
}
