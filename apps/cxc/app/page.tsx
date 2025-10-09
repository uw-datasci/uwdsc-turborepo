"use client";

import { WormholeTop, WormholeMiddle, WormholeBottom } from "@/components/Wormhole";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="h-screen relative">
        <WormholeTop />
      </section>
      <section className="h-screen relative">
        <WormholeMiddle />
      </section>
      <section className="h-screen relative">
        <WormholeBottom />
      </section>
    </div>
  );
}