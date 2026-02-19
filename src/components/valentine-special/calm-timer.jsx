'use client'

import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function TimerGauge({ lastPostAt, cooldownHours = 6 }) {
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState("");

  const cooldownMs = cooldownHours * 60 * 60 * 1000;

  useEffect(() => {
    const updateGauge = () => {
      const now = Date.now();
      const timePassed = now - lastPostAt;
      const remaining = cooldownMs - timePassed;

      if (remaining <= 0) {
        setProgress(100);
        setTimeLeft("Ready to share");
        return;
      }

      // Calculate percentage for the gauge
      const percentage = (timePassed / cooldownMs) * 100;
      setProgress(percentage);

      // Format time remaining
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      setTimeLeft(`${h}h ${m}m`);
    };

    const interval = setInterval(updateGauge, 60000); // Update every minute
    updateGauge();
    return () => clearInterval(interval);
  }, [lastPostAt]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
      <div className="relative flex items-center justify-center">
        {/* SVG Gauge */}
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64" cy="64" r={radius}
            stroke="currentColor" strokeWidth="8"
            fill="transparent" className="text-rose-100"
          />
          <circle
            cx="64" cy="64" r={radius}
            stroke="currentColor" strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease' }}
            className="text-rose-500"
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute flex flex-col items-center">
          <Sparkles className={`w-5 h-5 ${progress === 100 ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`} />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Reflection</p>
        <p className="text-lg font-bold text-slate-700">{timeLeft}</p>
      </div>
    </div>
  );
}