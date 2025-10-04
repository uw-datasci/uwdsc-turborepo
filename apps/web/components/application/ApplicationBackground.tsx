"use client";

import { ReactNode } from "react";
import Image from "next/image";

export function ApplicationBackground({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {/* Progress bar - will be used when multi-step form is implemented */}
      <progress
        value={-1}
        max={4}
        className="p-0 [&::-webkit-progress-value]:duration-700[&::-webkit-progress-value]:ease-in-out
        relative z-20 m-0 block h-2 w-full bg-grey4 transition-all duration-700 ease-in-out
        [&::-moz-progress-bar]:bg-lightBlue [&::-moz-progress-bar]:transition-all [&::-moz-progress-bar]:duration-700
        [&::-moz-progress-bar]:ease-in-out [&::-webkit-progress-bar]:bg-grey4  [&::-webkit-progress-value]:bg-lightBlue
        [&::-webkit-progress-value]:transition-all"
      />

      <div className="relative min-h-screen overflow-hidden bg-darkBlue2 px-4 py-20 shadow-md backdrop-blur-md">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Left Whale */}
          <div className="absolute">
            <Image
              src="/execApps/B-light-bulb.svg"
              alt="whale with light bulb"
              width={450}
              height={450}
            />
          </div>

          {/* Right Whale on Cloud */}
          <div className="absolute right-0 top-[10%] translate-x-1/3 transform">
            <Image
              src="/execApps/B-float.svg"
              alt="whale floating on cloud"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Main Content - positioned above background */}
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
}
