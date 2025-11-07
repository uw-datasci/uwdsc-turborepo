"use client";

import { AppWormhole } from "@/components/application/appWormhole";

// Animation variants for sliding transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
  }),
};

export default function StartPage() {
  return (
    <div className="flex flex-row justify-between min-h-screen h-full">
      <div className="hidden md:block border-r border-white/50 w-[45%] relative">
        <div className="absolute inset-0 z-0">
          <AppWormhole />
        </div>

        <div className="absolute bottom-10 left-0 p-10 z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-12">
            Welcome!
          </h1>
          <p className="text-sm lg:text-base">
            Canada's largest student run data hackathon. We are a
            beginner-friendly datathon that bring together students and
            companies to build projects that solve real-world problems.
          </p>
        </div>
      </div>
      <div className="px-4 py-12 overflow-hidden md:w-[55%]">hihi</div>
    </div>
  );
}
