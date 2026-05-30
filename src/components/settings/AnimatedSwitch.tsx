"use client";

import { motion } from "framer-motion";

export interface AnimatedSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
}

export default function AnimatedSwitch({ checked, onChange, label, description }: AnimatedSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      {label && (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-fg-primary">{label}</span>
          {description && <span className="text-xs text-fg-muted font-medium mt-0.5">{description}</span>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full
          transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary
          ${checked ? "bg-accent-primary" : "bg-white/10"}
        `}
      >
        <span className="sr-only">Use setting</span>
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="pointer-events-none absolute left-[2px] h-5 w-5 rounded-full bg-white shadow-sm"
          style={{
            x: checked ? 20 : 0,
          }}
        />
      </button>
    </div>
  );
}
