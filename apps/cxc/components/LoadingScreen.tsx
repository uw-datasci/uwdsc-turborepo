"use client";

import { motion } from "framer-motion";

interface LoadingScreenProps {
  readonly message?: string;
}

export function LoadingScreen({ message = "LOADING..." }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-8 h-8 border-2 border-white/20 border-t-white animate-spin" />
        <p className="text-white/60 text-sm font-mono">{message}</p>
      </motion.div>
    </div>
  );
}
