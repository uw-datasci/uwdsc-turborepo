"use client";

import { CountdownClock } from "../CountdownClock";
import CxCButton from "../CxCButton";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Meteors, TypingAnimation, WarpBackground } from "@uwdsc/ui/index";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CxCTitle() {
  const router = useRouter();
  const eventDate = useMemo(() => new Date("2026-01-02T00:00:00"), []);
  const [mounted, setMounted] = useState(false);
  const [countdownOver, setCountdownOver] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkCountdown = () => {
      const now = new Date().getTime();
      const difference = eventDate.getTime() - now;

      if (difference <= 0) {
        setCountdownOver(true);
      }
    };
    checkCountdown();
    const interval = setInterval(checkCountdown, 1000);
    setMounted(true);

    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div
      className={`relative border-b border-white/50 flex flex-col items-center justify-center ${countdownOver ? "overflow-hidden" : ""}`}
    >
      {mounted && (
        <>
          <AnimatePresence mode="wait">
            {countdownOver ? (
              <WarpBackground
                perspective={isMobile ? 40 : 300}
                beamsPerSide={2}
                className="w-full"
              >
                <motion.div
                  key="cxc-logo-section"
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="flex flex-col items-center py-6 md:py-12"
                >
                  <div className="relative w-52 h-28 md:w-96 md:h-48">
                    <Image
                      src="/logos/cxc_logo.svg"
                      alt="CXC"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <TypingAnimation className="text-sm md:text-xl text-white/80">
                    FEB 6-8 · AI HACKATHON
                  </TypingAnimation>

                  <CxCButton
                    onClick={() => router.push("/apply")}
                    className="text-base md:text-2xl py-2 md:py-3 px-10 md:px-14 hover:scale-105 absolute -bottom-10"
                  >
                    Apply
                  </CxCButton>
                </motion.div>
              </WarpBackground>
            ) : (
              <motion.div
                key="countdown-section"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative w-full h-full overflow-hidden"
              >
                <Meteors />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col items-center gap-12 pb-16"
                >
                  <div className="flex flex-col items-center z-10">
                    <div className="relative w-40 h-32 md:w-64 md:h-48">
                      <Image
                        src="/logos/cxc_logo.svg"
                        alt="CXC"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <h2 className="font-light text-3xl md:text-4xl text-white/80">
                      COMING SOON
                    </h2>
                  </div>

                  <CountdownClock
                    targetDate={eventDate}
                    className="mb-4 relative z-10"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
