import React, { useEffect, useRef, useState } from "react";

interface PieChartData {
  label: string;
  progress: number;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const PIE_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#ef4444",
];

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 180,
  strokeWidth = 28,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isHorizontal, setIsHorizontal] = useState(false);

  /*
   * Determine layout from the ACTUAL
   * available width and height.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      // Width greater than height
      // → pie left, legends right
      //
      // Height greater than width
      // → pie top, legends bottom

      setIsHorizontal(width > height);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  /*
   * Validate data
   */

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className={`text-sm text-red-500 ${className}`}>
        Pie Chart data inaccuracy
      </div>
    );
  }

  const hasInvalidValue = data.some(
    (item) =>
      typeof item.progress !== "number" ||
      !Number.isFinite(item.progress) ||
      item.progress < 0
  );

  if (hasInvalidValue) {
    return (
      <div className={`text-sm text-red-500 ${className}`}>
        Pie Chart data inaccuracy
      </div>
    );
  }

  const total = data.reduce(
    (sum, item) => sum + item.progress,
    0
  );

  const isAccurate = Math.abs(total - 100) < 0.001;

  if (!isAccurate) {
    return (
      <div className={`text-sm text-red-500 ${className}`}>
        Pie Chart data inaccuracy
      </div>
    );
  }

  /*
   * SVG geometry
   */

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedProgress = 0;

  return (
    <div
      ref={containerRef}
      className={`
        w-full
        h-full
        flex
        items-center
        justify-center
        gap-8
        ${isHorizontal ? "flex-row" : "flex-col"}
        ${className}
      `}
    >
      {/* PIE — LEFT when horizontal, TOP when vertical */}

      <div className="shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* Background */}

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100 dark:text-slate-800"
          />

          {/* Segments */}

          {data.map((item, index) => {
            const dashLength =
              (item.progress / 100) * circumference;

            const dashOffset =
              -(accumulatedProgress / 100) * circumference;

            accumulatedProgress += item.progress;

            return (
              <circle
                key={`${item.label}-${index}`}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={
                  PIE_COLORS[index % PIE_COLORS.length]
                }
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashLength} ${
                  circumference - dashLength
                }`}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
                className="transition-all duration-700"
              />
            );
          })}
        </svg>
      </div>

      {/* LEGENDS — RIGHT when horizontal, BELOW when vertical */}

      <div
        className={`
          flex
          gap-3
          ${
            isHorizontal
              ? "flex-col items-start"
              : "flex-row flex-wrap justify-center"
          }
        `}
      >
        {data.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{
                backgroundColor:
                  PIE_COLORS[index % PIE_COLORS.length],
              }}
            />

            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {item.label}
            </span>

            <span className="text-sm text-slate-400">
              {item.progress.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;