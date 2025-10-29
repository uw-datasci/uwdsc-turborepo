"use client";

import { motion } from "framer-motion";
import { CountingNumber } from "@uwdsc/ui";
import Ripples from "./Ripples";

function Stat({ value, label, prefix, suffix }: { value: number; label: string; prefix?: string; suffix?: string }) {
  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1 mb-2">
        {prefix ? <span className="text-3xl font-bold leading-none">{prefix}</span> : null}
        <CountingNumber number={value} inView inViewOnce className="text-4xl font-bold" />
        {suffix ? <span className="text-3xl font-bold leading-none">{suffix}</span> : null}
      </div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

export function AboutCxC() {
  return (
    <section className="relative bg-[#0C0C0C] text-white py-24 ">
      <div className="container mx-auto px-6 text-center">

        {/* About CxC */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">About CxC</h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Canada&apos;s largest student-run data hackathon. We are a
          beginner-friendly datathon that brings together students and companies
          to build projects that solve real-world problems.
        </p>

        {/* New Animated circles */}
        <div className="flex justify-center mb-16">
          <Ripples height={240} outerRx={140} outerRy={40} innerRx={70} innerRy={20} count={2} solidStrokeWidth={2.5}/>
        </div>

        {/* Animated circles Old 
        <div className="relative flex justify-center mb-16">
          <motion.div
            className="absolute border-2 border-white/30 rounded-full w-80 h-80"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute border-2 border-white/20 rounded-full w-96 h-96"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute border-2 border-white/10 rounded-full w-[28rem] h-[28rem]"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>*/}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto">
          <Stat value={300} label="Participants" suffix="+" />
          <Stat value={10} label="Collaborating companies" suffix="+" />
          <Stat value={20000} label="In prizes" prefix="$" />
        </div>
      </div>
    </section>
  );
}
