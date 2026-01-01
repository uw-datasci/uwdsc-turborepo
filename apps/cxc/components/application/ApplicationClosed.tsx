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

export function ApplicationClosed() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <CalendarIcon className="w-8 h-8 text-white/60" />
            </div>
            <CardTitle className="text-white text-2xl lg:text-3xl">
              Applications Are Closed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-white/70 text-lg">
              Thank you for your interest in CxC!
            </p>
            <p className="text-white/60">
              Applications for this year&apos;s hackathon are currently closed.
              The application period runs from{" "}
              <span className="text-white font-semibold">January 2, 2026</span>{" "}
              to{" "}
              <span className="text-white font-semibold">January 12, 2026</span>
              .
            </p>
            <div className="pt-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
              >
                Return to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
