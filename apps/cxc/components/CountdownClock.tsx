"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownClockProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

const AnimatedDigit = ({ value }: { value: string }) => {
  return (
    <div className="relative w-[25px] sm:w-[45px] lg:w-[70px] h-[70px] sm:h-[80px] lg:h-[120px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl lg:text-8xl font-bold"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => {
  const digits = value.toString().padStart(2, "0").split("");

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        {digits.map((digit, index) => (
          <AnimatedDigit value={digit ?? "0"} key={`${value}-${index}`} />
        ))}
      </div>
      <span className="text-sm sm:text-lg lg:text-2xl text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

export function CountdownClock({
  targetDate,
  className = "",
}: CountdownClockProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center gap-3 sm:gap-6 lg:gap-10">
        <CountdownUnit value={timeLeft.days} label="Days" />

        <span className="text-4xl sm:text-6xl lg:text-7xl font-bold -mt-6">
          :
        </span>

        <CountdownUnit value={timeLeft.hours} label="Hours" />

        <span className="text-4xl sm:text-6xl lg:text-7xl font-bold -mt-6">
          :
        </span>

        <CountdownUnit value={timeLeft.minutes} label="Minutes" />

        <span className="text-4xl sm:text-6xl lg:text-7xl font-bold -mt-6">
          :
        </span>

        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}
