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
import CxCTitle from "@/components/home/CxCTitle";
// import { Testimonials } from "@/components/home/Testimonials";
import { PastProjects } from "@/components/home/PastProjects";

export default function Home() {
  return (
    <div className="">
      <CxCTitle />
      <WormholeTop />
      <div className="border-t border-b border-white/50">
        <AboutCxC />
      </div>
      <WormholeMiddle topRadius={11} bottomRadius={10} />
      <div className="border-t border-b border-white/50">
        <PastProjects />
      </div>
      <WormholeMiddle topRadius={11} bottomRadius={9.25} />
      <div className="border-t border-b border-white/50">
        <Sponsors />
        {/* <Testimonials /> */}
        <div id="faq-section">
          <Faq />
        </div>
        <FollowUs />
      </div>
      <WormholeBottom />
    </div>
  );
}

// test comment
