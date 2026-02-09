"use client";

import { useEffect, useState } from "react";

interface ScoreCardProps {
  score: number;
  summary: string;
}

function getScoreColor(score: number) {
  if (score >= 71) return { text: "text-emerald-600", stroke: "#10b981", bg: "bg-emerald-50" };
  if (score >= 41) return { text: "text-amber-500", stroke: "#f59e0b", bg: "bg-amber-50" };
  return { text: "text-red-500", stroke: "#ef4444", bg: "bg-red-50" };
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent Match";
  if (score >= 60) return "Good Match";
  if (score >= 40) return "Partial Match";
  return "Low Match";
}

export function ScoreCard({ score, summary }: ScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const color = getScoreColor(score);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * score);
      setDisplayScore(start);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [score]);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
        Match Score
      </h3>
      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg width="128" height="128" className="-rotate-90">
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke={color.stroke}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${color.text}`}>
              {displayScore}%
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${color.bg} ${color.text}`}
          >
            {getScoreLabel(score)}
          </span>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}
