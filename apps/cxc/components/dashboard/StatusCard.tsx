"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, Badge, cn } from "@uwdsc/ui";
import Link from "next/link";
import CxCButton from "../CxCButton";
import type { AppStatus } from "@/types/application";

interface StatusCardProps {
  status: AppStatus | null;
  submittedAt?: Date | null;
}

const statusConfig: Record<
  AppStatus,
  { label: string; color: string; description: string }
> = {
  draft: {
    label: "Draft",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    description: "Your application is saved but not submitted yet.",
  },
  submitted: {
    label: "Submitted",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    description: "Your application is under review. We'll notify you soon!",
  },
  offered: {
    label: "Accepted!",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    description:
      "Congratulations! You've been accepted. Please confirm your attendance.",
  },
  accepted: {
    label: "Confirmed",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    description: "You're all set! We can't wait to see you at CxC.",
  },
  rejected: {
    label: "Not Selected",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    description: "Unfortunately, we couldn't offer you a spot this time.",
  },
  waitlisted: {
    label: "Waitlisted",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    description:
      "You're on our waitlist. We'll contact you if a spot opens up.",
  },
};

export function StatusCard({ status, submittedAt }: Readonly<StatusCardProps>) {
  const config = status ? statusConfig[status] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Application Status</span>
            {config && (
              <Badge className={cn("border", config.color)}>
                {config.label}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === null ? (
            <div className="space-y-4">
              <p className="text-white/60">
                You haven&apos;t started your application yet. Apply now to join
                CxC!
              </p>
              <Link href="/apply">
                <CxCButton className="w-full sm:w-auto">
                  Start Application
                </CxCButton>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-white/60">{config?.description}</p>

              {submittedAt && (
                <p className="text-sm text-white/40">
                  Submitted on{" "}
                  {new Date(submittedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}

              {status === "draft" && (
                <Link href="/apply">
                  <CxCButton className="w-full sm:w-auto">
                    Continue Application
                  </CxCButton>
                </Link>
              )}

              {status === "offered" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <CxCButton className="flex-1" disabled>
                    Accept Offer
                  </CxCButton>
                  <CxCButton
                    className="flex-1 !bg-transparent !text-white border border-white/20 hover:!bg-white/10"
                    disabled
                  >
                    Decline
                  </CxCButton>
                  <p className="text-xs text-white/40 sm:hidden">
                    RSVP functionality coming soon
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
