"use client";

import { motion } from "framer-motion";
import {
  CalendarIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@uwdsc/ui";
import Link from "next/link";
import CxCButton from "../CxCButton";

export function ApplicationClosed() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-black border border-white/20 rounded-none">
          <CardHeader className="border-b border-white/10 pb-6">
            <div className="mx-auto mb-6 w-16 h-16 border border-white/20 flex items-center justify-center">
              <CalendarIcon className="w-8 h-8 text-white/40" />
            </div>
            <CardTitle className="text-white text-2xl lg:text-3xl text-center uppercase tracking-wider font-normal">
              Applications Are Closed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="border border-red-400/40 p-4 bg-red-400/5">
              <p className="text-red-400 font-mono text-sm text-center">
                APPLICATION PERIOD HAS ENDED
              </p>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-white text-lg">
                Thank you for your interest in CxC!
              </p>
              <p className="text-white/60 text-sm">
                Applications for this year&apos;s hackathon are currently
                closed. The application period was from{" "}
                <span className="text-white font-mono">January 2, 2026</span> to{" "}
                <span className="text-white font-mono">January 14, 2026</span>.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <Link href="/">
                <CxCButton className="px-8 py-3">Return to Home</CxCButton>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
