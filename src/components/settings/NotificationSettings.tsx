"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSwitch from "./AnimatedSwitch";
import { Bell } from "lucide-react";

export default function NotificationSettings() {
  const [reminders, setReminders] = useState(true);
  const [weekly, setWeekly] = useState(true);
  const [achievements, setAchievements] = useState(true);
  const [suggestions, setSuggestions] = useState(false);
  const [email, setEmail] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 h-full flex flex-col gap-6"
    >
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-fg-primary tracking-tight">Notifications</h2>
          <p className="text-sm text-fg-muted mt-1 font-medium">Control what we ping you about.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary">
          <Bell className="w-5 h-5" />
        </div>
      </header>

      <div className="flex flex-col flex-1">
        <AnimatedSwitch
          checked={reminders}
          onChange={setReminders}
          label="Learning Reminders"
          description="Daily nudges to keep your streak alive."
        />
        <AnimatedSwitch
          checked={weekly}
          onChange={setWeekly}
          label="Weekly Reports"
          description="Summary of your performance every Monday."
        />
        <AnimatedSwitch
          checked={achievements}
          onChange={setAchievements}
          label="Achievement Alerts"
          description="When you unlock a new badge or milestone."
        />
        <AnimatedSwitch
          checked={suggestions}
          onChange={setSuggestions}
          label="Course Suggestions"
          description="Personalized recommendations."
        />
        <hr className="border-border-subtle my-2" />
        <AnimatedSwitch
          checked={email}
          onChange={setEmail}
          label="Email Notifications"
          description="Receive these alerts via email as well."
        />
      </div>
    </motion.section>
  );
}
