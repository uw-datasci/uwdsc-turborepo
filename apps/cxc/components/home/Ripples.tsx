"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface RippleGroupProps {
  cx: number;
  cy: number;
  outerRx: number;
  outerRy: number;
  innerRx: number;
  innerRy: number;
  count: number;
  solidCount?: number;
  opacity?: number;
  scale?: number;
  delayOffset?: number;
  vertOffset?: number;
  horzOffset?: number;
  inView: boolean;
}

const generateRings = (
  outerRx: number,
  outerRy: number,
  innerRx: number,
  innerRy: number,
  count: number,
  solidCount = 2,
  vertOffset = 10,
  horzOffset = 0,
) => {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const rx = lerp(innerRx, outerRx, t);
    const ry = lerp(innerRy, outerRy, t);
    const isSolid = i < solidCount;
    const cyOffset = t * vertOffset; // downward offset for visual depth
    const cxOffset = t * horzOffset; // left/right offset
    return { rx, ry, dashed: !isSolid, cyOffset, cxOffset };
  });
};

const RippleGroup = ({
  cx,
  cy,
  outerRx,
  outerRy,
  innerRx,
  innerRy,
  count,
  solidCount = 2,
  opacity = 1,
  scale = 1,
  delayOffset = 0,
  vertOffset,
  horzOffset,
  inView,
}: RippleGroupProps) => {
  const rings = generateRings(
    outerRx,
    outerRy,
    innerRx,
    innerRy,
    count,
    solidCount,
    vertOffset,
    horzOffset,
  );

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 600"
      width="100%"
      height="360"
      className="absolute pointer-events-none"
      style={{ opacity, transform: `scale(${scale})` }}
    >
      {rings.map((r, i) => (
        <motion.ellipse
          key={i}
          cx={cx + r.cxOffset}
          cy={cy + r.cyOffset}
          rx={r.rx}
          ry={r.ry}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeDasharray={r.dashed ? "6 8" : undefined}
          className="text-white"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: delayOffset + i * 0.15,
          }}
        />
      ))}
    </svg>
  );
};

interface RipplesProps {
  height?: number;
}

const FloatingImage = ({
  src,
  alt,
  className,
  delay = 0,
  inView,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  inView: boolean;
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: [0, -12, 0],
            }
          : {}
      }
      transition={{
        opacity: { duration: 0.5, delay: 1 },
        y: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      <div className="relative w-full h-full rounded-sm overflow-hidden shadow-lg">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </motion.div>
  );
};

export default function Ripples({ height = 200 }: RipplesProps) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="relative w-full my-10 md:my-32"
      style={{ height }}
    >
      {/* Medium Left Ripple */}
      <div className="absolute top-[50%] -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/3 lg:-translate-x-1/4 xl:-translate-x-1/5 w-[800px] h-[360px] scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9]">
        <RippleGroup
          cx={600}
          cy={300}
          outerRx={650}
          outerRy={170}
          innerRx={300}
          innerRy={90}
          count={4}
          solidCount={2}
          vertOffset={50}
          inView={inView}
        />
      </div>

      {/* Small Center Ripple (higher) */}
      <div className="absolute left-[42%] top-[35%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9]">
        <RippleGroup
          cx={600}
          cy={300}
          outerRx={225}
          outerRy={60}
          innerRx={150}
          innerRy={35}
          count={2}
          solidCount={2}
          inView={inView}
        />
      </div>

      {/* Large Right Ripple */}
      <div className="absolute -left-[45%] sm:-right-[85%] sm:left-auto md:-right-[60%] lg:-right-[35%] xl:-right-[20%] top-[52%] -translate-y-1/2 w-[1200px] h-[360px] scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.9]">
        <RippleGroup
          cx={600}
          cy={300}
          outerRx={900}
          outerRy={150}
          innerRx={375}
          innerRy={70}
          count={5}
          solidCount={3}
          vertOffset={60}
          horzOffset={-100}
          inView={inView}
        />
      </div>

      {/* Large Left Image */}
      <FloatingImage
        src="/past_cxc/registration.jpg"
        alt="CXC Event 1"
        className="-left-7 md:left-[5%] lg:left-[8%] top-0 md:-top-[10%] lg:-top-[20%] w-[140px] h-[100px] md:w-[180px] md:h-[130px] lg:w-[220px] lg:h-[160px]"
        delay={0}
        inView={inView}
      />

      {/* Small Center-Left Image */}
      <FloatingImage
        src="/past_cxc/marquee.jpg"
        alt="CXC Event 2"
        className="left-[35%] lg:left-[37%] top-0 md:-top-[10%] lg:-top-[15%] w-[100px] h-[70px] md:w-[120px] md:h-[85px] lg:w-[140px] lg:h-[100px]"
        delay={0.3}
        inView={inView}
      />

      {/* Small Center-Right Image */}
      <FloatingImage
        src="/past_cxc/poker.jpg"
        alt="CXC Event 3"
        className="hidden xl:block xl:right-[29%] bottom-[40%] xl:w-[130px] xl:h-[95px]"
        delay={0.6}
        inView={inView}
      />

      {/* Large Right Image */}
      <FloatingImage
        src="/past_cxc/opening.jpg"
        alt="CXC Event 4"
        className="-right-7 md:right-[5%] lg:right-[9%] bottom-[45%] lg:bottom-[40%] w-[150px] h-[110px] md:w-[190px] md:h-[140px] lg:w-[230px] lg:h-[170px]"
        delay={0.9}
        inView={inView}
      />
    </div>
  );
}
