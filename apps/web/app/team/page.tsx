import SectionTitle from "@/components/team/SectionTitle";
import TeamCard from "@/components/team/TeamCard";

import { TEAM } from "@/constants/team";

export default function Team() {
  return (
    <section className="mx-container mb-section pt-14 lg:pt-20">
      <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
        Team
      </h1>
      <div className="grid gap-32">
        {TEAM.map((subteam) => (
          <div key={subteam.id}>
            <SectionTitle mb="mb-12">{subteam.name}</SectionTitle>
            <div className="flex flex-wrap justify-center gap-8 3xs:gap-12 xl:gap-20">
              {subteam.members.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
