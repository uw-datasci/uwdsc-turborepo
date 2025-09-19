"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@uwdsc/ui";
import { MotionCard } from "@/components/MotionCard";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [supabaseConnected, setSupabaseConnected] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    // Test connection via health check API
    const checkHealth = async () => {
      try {
        const response = await fetch("/api/health");
        const healthData = await response.json();

        // Check if Supabase is connected based on health check response
        const supabaseStatus = healthData.services?.supabase?.status;
        setSupabaseConnected(supabaseStatus === "connected");
      } catch {
        setSupabaseConnected(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-4 right-4"
        >
          <ThemeToggle />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            UWaterloo Data Science Club
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Next.js • TypeScript • Tailwind CSS • Shad CN • Framer Motion •
            Supabase
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Next.js 15
                </CardTitle>
                <CardDescription>
                  App Router, TypeScript, and modern React features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium">Ready</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Shad CN UI
                </CardTitle>
                <CardDescription>
                  Beautiful, accessible components built on Radix UI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium">Ready</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌊</span>
                  Framer Motion
                </CardTitle>
                <CardDescription>
                  Smooth animations and interactive components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium">Ready</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🗄️</span>
                  Supabase
                </CardTitle>
                <CardDescription>
                  Backend-as-a-Service with real-time database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      supabaseConnected === null
                        ? "bg-yellow-500"
                        : supabaseConnected
                          ? "bg-green-600"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm font-medium">
                    {supabaseConnected === null
                      ? "Checking..."
                      : supabaseConnected
                        ? "Connected"
                        : "Configure in .env"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-2"
          >
            <div className="flex justify-center">
              <MotionCard />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Your development environment is ready! Here&apos;s what to do
                next:
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">1. Configure Supabase</h4>
                <p className="text-sm text-muted-foreground">
                  Update the environment variables in{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    .env.local
                  </code>{" "}
                  with your Supabase project credentials.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">2. Add More Components</h4>
                <p className="text-sm text-muted-foreground">
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    cd packages/ui && pnpm dlx shadcn@canary add [COMPONENT]
                  </code>
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">3. Start Building</h4>
                <p className="text-sm text-muted-foreground">
                  Create your components in{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    src/components/
                  </code>{" "}
                  and pages in{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    src/app/
                  </code>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
