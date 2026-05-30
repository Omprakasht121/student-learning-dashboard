"use client";

import { motion } from "framer-motion";

const CHART_POINTS = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3.5 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 2.5 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 4.5 },
];

export default function ProgressChart() {
  const width = 800;
  const height = 300;
  const paddingX = 40;
  const paddingY = 40;
  
  const maxHours = Math.max(...CHART_POINTS.map(p => p.hours));
  
  // Map points to SVG coordinates
  const points = CHART_POINTS.map((p, i) => {
    const x = paddingX + (i / (CHART_POINTS.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (p.hours / maxHours) * (height - paddingY * 2);
    return { x, y, ...p };
  });

  // SVG Path generation
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
      className="glass-card rounded-[var(--radius-xl)] p-6 relative overflow-hidden"
    >
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-fg-primary tracking-tight drop-shadow-sm">Weekly Learning Progress</h2>
          <p className="text-sm text-fg-muted mt-1 font-medium">Hours spent learning over the last 7 days.</p>
        </div>
      </header>

      <div className="relative w-full h-[300px]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Lines */}
          {[0, 0.5, 1].map((ratio) => {
            const y = height - paddingY - ratio * (height - paddingY * 2);
            return (
              <line 
                key={ratio}
                x1={paddingX} 
                y1={y} 
                x2={width - paddingX} 
                y2={y} 
                stroke="var(--border-subtle)" 
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Area under the line */}
          <motion.path
            d={areaPath}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* The glowing line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="3"
            filter="url(#glow)"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />

          {/* Data Points and Labels */}
          {points.map((p, i) => (
            <g key={i}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--bg-base)"
                stroke="var(--accent-primary)"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.8 + i * 0.1 }}
              />
              <text 
                x={p.x} 
                y={height - 10} 
                fill="var(--fg-muted)" 
                fontSize="12" 
                textAnchor="middle"
                className="font-medium"
              >
                {p.day}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </motion.article>
  );
}
