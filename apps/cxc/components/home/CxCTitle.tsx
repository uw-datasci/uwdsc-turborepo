"use client";

import { CountdownClock } from "../CountdownClock";
import CxCButton from "../CxCButton";
import { WaterCube } from "./WaterCube";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CxCTitle() {
  const router = useRouter();
  const eventDate = new Date("2026-01-06T00:00:00");
  const [mounted, setMounted] = useState(false);
  const [countdownOver, setCountdownOver] = useState(false);

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
      className={`relative border-b border-white/50 flex flex-col items-center justify-center ${countdownOver ? "overflow-hidden" : "py-12"}`}
    >
      {mounted && (
        <>
          <AnimatePresence mode="wait">
            {countdownOver ? (
              <motion.p
                key="cxc-text"
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 1.2,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="font-semibold text-[length:50vw] leading-none whitespace-nowrap tracking-tighter -mb-[14%] -ml-2 sm:-ml-4 md:-ml-6 xl:-ml-10"
              >
                CXC
              </motion.p>
            ) : (
              <motion.div
                key="countdown-section"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Desktop Cubes */}
                <div className="hidden xl:block">
                  {/* Top Left Cube */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-10"
                  >
                    <WaterCube
                      modelPath="/models/Watercube.glb"
                      scale={1}
                      maxWidth="175px"
                      initialRotation={[0.4, 0.75, 0]}
                    />
                  </motion.div>

                  {/* Bottom Right Cube */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-15 right-15"
                  >
                    <WaterCube
                      modelPath="/models/Watercube.glb"
                      scale={1}
                      maxWidth="175px"
                      initialRotation={[0.4, 0.75, 0]}
                    />
                  </motion.div>
                </div>

                {/* Medium Cubes */}
                <div className="hidden sm:block xl:hidden">
                  {/* Top Left Cube */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-10"
                  >
                    <WaterCube
                      modelPath="/models/Watercube.glb"
                      scale={1}
                      maxWidth="125px"
                      initialRotation={[0.4, 0.75, 0]}
                    />
                  </motion.div>

                  {/* Bottom Right Cube */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-15 right-15"
                  >
                    <WaterCube
                      modelPath="/models/Watercube.glb"
                      scale={1}
                      maxWidth="125px"
                      initialRotation={[0.4, 0.75, 0]}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col items-center gap-12"
                >
                  <div className="flex flex-col gap-6 items-center z-10">
                    <h1 className="font-extrabold text-4xl md:text-5xl">
                      CXC HACKATHON
                    </h1>
                    <h2 className="font-light text-3xl md:text-4xl text-white/80">
                      COMING SOON
                    </h2>
                  </div>

                  <CountdownClock
                    targetDate={eventDate}
                    className="mb-4 relative z-10"
                  />

                  <CxCButton
                    onClick={() => router.push("/apply")}
                    className="text-base md:text-2xl py-2 md:py-3 px-10 md:px-14 hover:scale-105"
                  >
                    Apply
                  </CxCButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
