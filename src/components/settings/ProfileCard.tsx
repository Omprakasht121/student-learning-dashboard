"use client";

import { motion } from "framer-motion";
import { Camera, Mail, Calendar, GraduationCap } from "lucide-react";

export default function ProfileCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6"
    >
      {/* Avatar Container */}
      <div className="relative group shrink-0">
        <div className="w-24 h-24 rounded-full bg-accent-primary/20 border-2 border-accent-primary/30 flex items-center justify-center overflow-hidden">
          <span className="text-3xl font-bold text-accent-secondary">S</span>
        </div>
        
        {/* Hover Upload Overlay */}
        <button 
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer backdrop-blur-sm"
          aria-label="Upload Avatar"
        >
          <Camera className="w-5 h-5 text-white" />
        </button>
        
        {/* Glowing ring */}
        <div className="absolute inset-[-4px] rounded-full border border-accent-primary/50 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300" />
      </div>

      {/* User Details */}
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold text-fg-primary tracking-tight truncate">
          Student Learner
        </h2>
        
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-fg-muted font-medium">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 opacity-70" />
            <span className="truncate">student@learn.io</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 opacity-70" />
            <span>Pro Member</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 opacity-70" />
            <span>Joined May 2026</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="shrink-0 w-full md:w-auto">
        <button className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-fg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary">
          Edit Profile
        </button>
      </div>
    </motion.section>
  );
}
