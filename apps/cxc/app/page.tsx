import  AboutCxC  from "@/components/home/AboutCxC";
import {
  WormholeTop,
  WormholeMiddle,
  WormholeBottom,
} from "@/components/home/Wormhole";

export default function Home() {
  return (
    <div>
      <div className="border-b border-white/50 flex items-center justify-center overflow-hidden">
        <p className="font-semibold text-[length:50vw] leading-none whitespace-nowrap tracking-tighter -mb-[15%] -ml-2 sm:-ml-4 md:-ml-6 xl:-ml-10">
          CxC
        </p>
      </div>
      <WormholeTop />
      <div className="border-t border-b border-white/50 min-h-[500px] flex items-center justify-center">
        <AboutCxC />
      </div>
      <WormholeMiddle />
      <div className="border-t border-b border-white/50 min-h-[500px] flex items-center justify-center">
        <h1 className="font-bold text-5xl md:text-8xl text-center">
          Placeholder for Content
        </h1>
      </div>
      <WormholeBottom />
    </div>
  );
}
