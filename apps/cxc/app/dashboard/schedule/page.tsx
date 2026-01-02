"use client";

import { motion } from "framer-motion";
import { EventTimeline } from "@/components/dashboard";

export default function SchedulePage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-white/10 pb-6"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-wider">
            Event Schedule
          </h1>
          <p className="text-white/60 mt-1">
            View upcoming workshops, activities, and important milestones.
          </p>
        </motion.div>

        {/* Event Timeline */}
        <EventTimeline />
      </div>
    </div>
  );
}
