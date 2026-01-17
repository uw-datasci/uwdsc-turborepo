"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuth } from "@/contexts/AuthContext";
import { getApplication } from "@/lib/api/application";
import { AppFormValues } from "@/lib/schemas/application";
import { transformDatabaseDataToForm } from "@/lib/utils/formDataTransformer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ConfettiIcon,
} from "@uwdsc/ui";
import CxCButton from "@/components/CxCButton";
import { Clock, Info } from "lucide-react";

export default function ResultsPage() {
  const { user } = useAuth();
  const [application, setApplication] = useState<AppFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadApplication() {
      if (!user?.id) return;
      try {
        const data = await getApplication(user.id);
        if (!data) return;

        const formData = transformDatabaseDataToForm(data) as AppFormValues;
        setApplication(formData);
      } catch (error) {
        console.error("Error loading application:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadApplication();
  }, [user?.id]);

  if (isLoading) {
    return <LoadingScreen message="LOADING RESULTS..." />;
  }

  if (
    !["accepted", "offered", "waitlisted"].includes(application?.status || "")
  )
    return null;

  // Waitlisted Page UI
  if (application?.status === "waitlisted") {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-black border-2 border-orange-400/50 rounded-none">
            <CardHeader className="border-b border-orange-400/30 text-center pb-8">
              <div className="flex justify-center mb-4">
                <Clock className="w-16 h-16 text-orange-400" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-orange-400 uppercase tracking-wider">
                You&apos;re Waitlisted
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-8 space-y-6">
              <div className="text-center space-y-4">
                <p className="text-lg text-white/90">
                  Thank you for your interest in CXC 2026!
                </p>
                <p className="text-white/80">
                  While we couldn&apos;t offer you a spot right now, you&apos;ve been
                  placed on our waitlist. This means you&apos;re still in
                  consideration, and we&apos;ll reach out if a spot becomes
                  available.
                </p>
              </div>

              <div className="bg-orange-400/10 border border-orange-400/30 p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-orange-400 uppercase tracking-wide text-sm">
                      What Happens Next?
                    </h3>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>
                          We&apos;ll notify you by email if a spot opens up
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>
                          Keep an eye on your inbox over the next few weeks
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>
                          No further action is required from you at this time
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-white/60">
                  We appreciate your patience and hope to see you at CxC soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Offered/Accepted Page UI with RSVP Button
  return (
    <div className="h-screen bg-black text-white p-6 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="bg-black border-2 border-green-400/50 rounded-none">
          <CardHeader className="border-b border-green-400/30 text-center pb-6">
            <div className="flex justify-center mb-3">
              <ConfettiIcon className="w-14 h-14 text-green-400" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-green-400 uppercase tracking-wider">
              Congratulations!
            </CardTitle>
            <p className="text-lg text-white/90 mt-1">
              You&apos;ve been accepted to CXC 2026
            </p>
            <p className="text-base text-white/70 mt-1">
              February 6-8, 2026 at University of Waterloo
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            <div className="text-center">
              <p className="text-base text-white/90">
                We&apos;re thrilled to offer you a spot at this year&apos;s CXC!
              </p>
            </div>

            <div className="bg-green-400/10 border border-green-400/30 p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-green-400 uppercase tracking-wide text-xs">
                    Important Information
                  </h3>
                  <ul className="space-y-1.5 text-xs text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Confirm your attendance by accepting below</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>More details will be sent after you RSVP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>
                        If you can&apos;t attend, please decline so we can offer your
                        spot to someone else
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <button
                className="px-10 py-5 text-base font-semibold uppercase tracking-wider border-2 border-red-400/50 bg-transparent text-red-400 hover:bg-red-400/10 hover:scale-105 transition-all"
                onClick={() => {
                  // Backend logic will be implemented later
                  console.log("Decline button clicked");
                }}
              >
                Decline Offer
              </button>

              <CxCButton
                className="px-10 py-5 text-base font-semibold uppercase tracking-wider hover:scale-105 transition-transform"
                onClick={() => {
                  // Backend logic will be implemented later
                  console.log("RSVP button clicked");
                }}
              >
                Accept & RSVP
              </CxCButton>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-white/60">
                We can&apos;t wait to see you at CXC 2026!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
