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
import CxCTitle from "@/components/home/CxCTitle";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="cxc-app-font">
      <Navbar />
      <CxCTitle />
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
        <Testimonials />
        <FollowUs />
      </div>
      <WormholeBottom />
    </div>
  );
}
