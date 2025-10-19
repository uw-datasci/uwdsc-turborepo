import { WHAT_WE_DO_CARDS } from "@/constants/home";
import SectionTitle from "../team/SectionTitle";
import WhatWeDoCard from "../home/WhatWeDoCard";

export default function WhatWeDo() {
  return (
    // mx-container: mx-7 sm:mx-9 md:mx-12 xl:mx-auto xl:max-w-[1200px]
    // mb-section: mb-24 lg:mb-52
    <section className="mb-24 lg:mb-52 mx-7 sm:mx-9 md:mx-12 xl:mx-auto xl:max-w-[1200px]">
      <SectionTitle mb="mb-7 md:mb-10" className="text-xl md:!text-2xl">
        WHAT WE DO
      </SectionTitle>
      <div className="mx-auto grid max-w-[360px] gap-6 md:max-w-[720px] md:grid-cols-2 xl:max-w-none xl:grid-cols-3">
        {WHAT_WE_DO_CARDS.map((card, i) => (
          <WhatWeDoCard {...card} key={`card-${i}`} />
        ))}
      </div>
    </section>
  );
}
