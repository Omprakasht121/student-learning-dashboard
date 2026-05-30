"use client";

import { motion } from "framer-motion";
import { Trophy, Rocket, Compass, Flame } from "lucide-react";

const ACHIEVEMENTS = [
  { id: "streak", title: "7-Day Streak", icon: Flame, color: "251, 191, 36", unlocked: true },
  { id: "fast", title: "Fast Learner", icon: Rocket, color: "34, 211, 238", unlocked: true },
  { id: "explorer", title: "Course Explorer", icon: Compass, color: "167, 139, 250", unlocked: true },
  { id: "consistency", title: "Top Consistency", icon: Trophy, color: "52, 211, 153", unlocked: false },
];

export default function Achievements() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.4 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 overflow-hidden h-full flex flex-col"
    >
      <header className="mb-6">
        <h2 className="text-lg font-semibold text-fg-primary tracking-tight drop-shadow-sm">Achievements</h2>
        <p className="text-sm text-fg-muted mt-1 font-medium">Badges earned through your learning journey.</p>
      </header>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        {ACHIEVEMENTS.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.6 + i * 0.1 }}
              className={`
                relative p-3 rounded-2xl flex flex-col items-center justify-center gap-2 text-center
                border ${badge.unlocked ? 'border-white/10' : 'border-white/5'}
                ${badge.unlocked ? 'bg-white/[0.03]' : 'bg-transparent opacity-50 grayscale'}
              `}
            >
              {badge.unlocked && (
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
                  style={{ background: `radial-gradient(circle, rgba(${badge.color}, 0.5) 0%, transparent 70%)` }}
                />
              )}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                style={{ 
                  backgroundColor: badge.unlocked ? `rgba(${badge.color}, 0.15)` : 'rgba(255,255,255,0.05)',
                  boxShadow: badge.unlocked ? `0 0 16px rgba(${badge.color}, 0.3)` : 'none'
                }}
              >
                <Icon 
                  className="w-5 h-5" 
                  style={{ color: badge.unlocked ? `rgb(${badge.color})` : 'rgba(255,255,255,0.4)' }} 
                />
              </div>
              <span className="text-[10px] font-bold text-fg-primary uppercase tracking-wider relative z-10">
                {badge.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
