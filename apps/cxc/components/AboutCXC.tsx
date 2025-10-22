"use client";

import { motion } from "framer-motion";

export function AboutCXC() {
  return (
    <section className="relative bg-[#0C0C0C] text-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">About CXC</h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-16">
          Canada&apos;s largest student-run data hackathon. We are a
          beginner-friendly datathon that brings together students and companies
          to build projects that solve real-world problems.
        </p>

        {/* Animated circles */}
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <h3 className="text-4xl font-bold mb-2">300+</h3>
            <p className="text-gray-400">Participants</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">10+</h3>
            <p className="text-gray-400">Collaborating companies</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">$20,000</h3>
            <p className="text-gray-400">In prizes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
