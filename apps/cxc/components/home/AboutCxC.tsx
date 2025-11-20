"use client";

import { CountingNumber } from "@uwdsc/ui";
import Ripples from "./Ripples";

interface StatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

function Stat({ value, label, prefix, suffix }: Readonly<StatProps>) {
  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1 mb-2 md:min-w-[225px] xl:min-w-xs">
        {prefix ? (
          <span className="text-6xl md:text-5xl lg:text-7xl font-bold leading-none">
            {prefix}
          </span>
        ) : null}
        <CountingNumber
          number={value}
          inView
          inViewOnce
          className="text-6xl md:text-5xl lg:text-7xl font-bold"
        />
        {suffix ? (
          <span className="text-6xl md:text-5xl lg:text-7xl font-bold leading-none">
            {suffix}
          </span>
        ) : null}
      </div>
      <p className="text-gray-400 md:text-xl">{label}</p>
    </div>
  );
}

export default function AboutCxC() {
  return (
    <section className="relative text-white py-16 md:py-32 overflow-hidden">
      <div className="mx-auto px-6 text-center">
        {/* About CXC */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">About CXC</h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Canada&apos;s largest student-run data hackathon. We are a
          beginner-friendly datathon that brings together students and companies
          to build projects that solve real-world problems.
        </p>

        <div className="w-full">
          <Ripples />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <Stat value={300} label="Participants" suffix="+" />
          <Stat value={10} label="Collaborating companies" suffix="+" />
          <Stat value={20000} label="In prizes" prefix="$" />
        </div>
      </div>
    </section>
  );
}
