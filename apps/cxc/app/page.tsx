"use client";

import AboutCxC from "@/components/home/AboutCxC";
import {
  WormholeTop,
  WormholeMiddle,
  WormholeBottom,
} from "@/components/home/Wormhole";
import { Sponsors } from "@/components/home/Sponsors";
import { FollowUs } from "@/components/home/FollowUs";
import { Faq } from "@/components/home/Faq";
import Navbar from "@/components/nav/Navbar";
import { WaterCube } from "@/components/home/WaterCube";
import { CountdownClock } from "@/components/home/CountdownClock";
import CxCButton from "@/components/CxCButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const eventDate = new Date("2026-01-05T23:59:59");

  return (
    <div className="cxc-app-font">
      <Navbar />
      <div className="relative border-b border-white/50 flex flex-col items-center justify-center py-12">
        {/* Desktop Cubes */}
        <div className="hidden xl:block">
          {/* Top Left Cube */}
          <div className="absolute top-0 left-10">
            <WaterCube
              modelPath="/models/Watercube.glb"
              scale={1}
              maxWidth="175px"
              initialRotation={[0.4, 0.75, 0]}
            />
          </div>

          {/* Bottom Right Cube */}
          <div className="absolute bottom-15 right-15">
            <WaterCube
              modelPath="/models/Watercube.glb"
              scale={1}
              maxWidth="175px"
              initialRotation={[0.4, 0.75, 0]}
            />
          </div>
        </div>

        {/* Medium  Cubes */}
        <div className="hidden sm:block xl:hidden">
          {/* Top Left Cube */}
          <div className="absolute top-0 left-10">
            <WaterCube
              modelPath="/models/Watercube.glb"
              scale={1}
              maxWidth="125px"
              initialRotation={[0.4, 0.75, 0]}
            />
          </div>

          {/* Bottom Right Cube */}
          <div className="absolute bottom-15 right-15">
            <WaterCube
              modelPath="/models/Watercube.glb"
              scale={1}
              maxWidth="125px"
              initialRotation={[0.4, 0.75, 0]}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-12">
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
        </div>
      </div>
      <WormholeTop />
      <div className="border-t border-b border-white/50">
        <AboutCxC />
      </div>
      <WormholeMiddle />
      <div className="border-t border-b border-white/50">
        <Sponsors />
        <div id="faq-section">
          <Faq />
        </div>
        <FollowUs />
      </div>
      <WormholeBottom />
    </div>
  );
}
