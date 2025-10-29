// apps/cxc/components/home/Ripples.tsx
"use client";
import { useEffect, useRef } from "react";

type RingSpec = { rx: number; ry: number; dash?: number; op?: number };

function generateRings({
  outerRx,
  outerRy,
  innerRx,
  innerRy,
  count,
  solidInner = 2,
  dashA = 2,
  dashB = 6,
}: {
  outerRx: number;
  outerRy: number;
  innerRx: number;
  innerRy: number;
  count: number;
  solidInner?: number;
  dashA?: number;
  dashB?: number;
}): RingSpec[] {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 1 : i / (count - 1);
    const rx = lerp(outerRx, innerRx, t);
    const ry = lerp(outerRy, innerRy, t);
    const isSolid = i >= count - solidInner;
    return { rx, ry, dash: isSolid ? undefined : (i % 2 ? dashB : dashA), op: 1 };
  });
}

type Props = {
  className?: string;
  height?: number;
  cx?: number;
  cy?: number;
  outerRx?: number;
  outerRy?: number;
  innerRx?: number;
  innerRy?: number;
  count?: number;
  solidInner?: number;
  strokeWidth?: number;
  solidStrokeWidth?: number;
};

export default function Ripples({
  className,
  height = 280,
  cx = 600,
  cy = 260,
  outerRx = 520,
  outerRy = 120,
  innerRx = 90,
  innerRy = 44,
  count = 6,
  solidInner = 2,
  strokeWidth = 2.5,
  solidStrokeWidth,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);

  // Optional: start animation only when visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.classList.add("ripples-start");
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={className}>
      <svg
        ref={ref}
        aria-hidden
        viewBox="0 0 1200 400"
        width="100%"
        style={{ height }}
        className="mx-auto block text-white ripples"
      >
        {generateRings({
          outerRx,
          outerRy,
          innerRx,
          innerRy,
          count,
          solidInner,
        }).map((r, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={r.rx}
            ry={r.ry}
            fill="none"
            stroke="currentColor"
            strokeWidth={r.dash === undefined ? (solidStrokeWidth ?? strokeWidth) : strokeWidth}
            strokeDasharray={r.dash}
            opacity={r.op}
            className={`ripples-ring ripples-delay-${i}`}
          />
        ))}
      </svg>
    </div>
  );
}