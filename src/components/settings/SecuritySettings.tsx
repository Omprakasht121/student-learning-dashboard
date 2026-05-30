"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, Key, History } from "lucide-react";

const SECURITY_OPTIONS = [
  { id: "pwd", label: "Change Password", desc: "Update your credentials", icon: Key, action: "Update", status: null },
  { id: "2fa", label: "Two-Factor Auth", desc: "Add an extra layer of security", icon: ShieldCheck, action: "Enable", status: "Off" },
  { id: "devices", label: "Connected Devices", desc: "Manage active sessions", icon: Smartphone, action: "Manage", status: "2 Active" },
  { id: "logs", label: "Login Sessions", desc: "Review recent account activity", icon: History, action: "View", status: null },
];

export default function SecuritySettings() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.4 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 h-full flex flex-col gap-6"
    >
      <header>
        <h2 className="text-lg font-semibold text-fg-primary tracking-tight">Security & Access</h2>
        <p className="text-sm text-fg-muted mt-1 font-medium">Keep your account safe.</p>
      </header>

      <div className="flex flex-col gap-2">
        {SECURITY_OPTIONS.map((opt, i) => (
          <motion.article
            key={opt.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <opt.icon className="w-5 h-5 text-fg-secondary group-hover:text-fg-primary transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-fg-primary">{opt.label}</span>
                <span className="text-xs text-fg-muted font-medium">{opt.desc}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {opt.status && (
                <span className={`
                  text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border
                  ${opt.status === 'Off' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-white/5 text-fg-muted border-white/10'}
                `}>
                  {opt.status}
                </span>
              )}
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-fg-primary transition-colors">
                {opt.action}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
