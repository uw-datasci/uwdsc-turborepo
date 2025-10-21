"use client";

import { CountingNumber } from "@uwdsc/ui/index";
import SectionTitle from "../team/SectionTitle";
import { CLUB_STATS } from "@/constants/home";
import SectionWrapper from "../SectionWrapper";

export default function ClubStats() {
  return (
    <SectionWrapper>
      <SectionTitle
        mb="mb-8 lg:mb-12"
        className="text-xl md:!text-2xl text-nowrap"
      >
        Club Stats
      </SectionTitle>
      <div className="grid gap-14 md:grid-cols-3">
        {CLUB_STATS.map((stat) => (
          <div
            className="text-center text-5xl lg:text-7xl font-bold md:min-w-[225px] xl:min-w-xs"
            key={stat.id}
          >
            <p className="font-family-clash mb-2 font-bold text-white flex items-center justify-center">
              {stat.prefix}
              <CountingNumber
                number={stat.stat}
                inView={true}
                inViewOnce={true}
                className="inline-block"
              />
              {stat.suffix}
            </p>
            <p className="gradient-text bg-gradient-to-b from-white to-[#ffffff80] text-xl font-bold xl:text-2xl">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
