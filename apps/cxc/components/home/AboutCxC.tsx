"use client";

import { motion } from "framer-motion";
import { CountingNumber, SpinningText } from "@uwdsc/ui";
import Ripples from "./Ripples";

interface StatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

function Stat({ value, label, prefix, suffix }: Readonly<StatProps>) {
  return (
    <div className="text-center">
      <div className="flex items-baseline justify-center gap-1 mb-2 md:min-w-[225px] xl:min-w-xs">
        {prefix ? (
          <span className="text-6xl md:text-5xl lg:text-7xl font-bold leading-none">
            {prefix}
          </span>
        ) : null}
        <CountingNumber
          number={value}
          inView
          inViewOnce
          className="text-6xl md:text-5xl lg:text-7xl font-bold"
        />
        {suffix ? (
          <span className="text-6xl md:text-5xl lg:text-7xl font-bold leading-none">
            {suffix}
          </span>
        ) : null}
      </div>
      <p className="text-gray-400 md:text-xl">{label}</p>
    </div>
  );
}

export default function AboutCxC() {
  return (
    <section className="relative text-white py-16 md:py-20 overflow-hidden">
      <div className="mx-auto px-10 text-center">
        {/* About CXC */}
        <motion.div
          className="mb-10 items-center flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">About CXC</h2>
          <p className="text-base sm:text-base lg:text-xl text-gray-300 lg:max-w-2xl max-w-3xl mb-10">
            Join us for the 5th year of Waterloo&apos;s largest student-run AI
            hackathon this February 6th to February 8th! We are a
            beginner-friendly AI hackathon that brings together students and
            companies to build projects that solve real-world problems. Join us
            again this year for a weekend of hacking and fun!
          </p>
        </motion.div>

        <div className="w-full">
          <Ripples />
        </div>
        <motion.div
          className="my-32 items-center flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            You Belong Here
          </h2>
          <p className="text-base sm:text-base lg:text-xl text-gray-300 lg:max-w-2xl max-w-3xl mb-10">
            Meet a community of like-minded hackers, network with our company
            sponsors and judges, and build the project you&apos;ve always been
            dreaming of. With AI at the forefront of the world recently, CXC is
            the perfect place for veterans and fledgling hackers to get started!
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <Stat value={300} label="Participants" suffix="+" />
          <Stat value={10} label="Collaborating companies" suffix="+" />
          <Stat value={5000} label="In prizes" prefix="$" />
        </div>

        <motion.div
          className="mt-32 items-center flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            A Fresh New Spin
          </h2>
          <div className="flex flex-row items-start">
            <SpinningText className="hidden lg:block mr-8 md:mr-16 shrink-0 h-[10ch] w-[10ch] md:h-[12ch] md:w-[12ch]">
              CXC • 5TH ITERATION • AI HACKATHON •
            </SpinningText>
            <p className="text-base sm:text-base lg:text-xl text-gray-300 lg:max-w-2xl max-w-3xl mb-10">
              For this iteration of CXC, we&apos;ve decided to switch things up
              and pivot to a full in-person weekend experience. Hackers who are
              familiar with past CXCs can enjoy a change of pace with an
              eventful weekend of in-person connections, workshops, sponsor
              networking events, and activities!
            </p>
            <SpinningText className="hidden lg:block ml-8 md:ml-16 shrink-0 h-[10ch] w-[10ch] md:h-[12ch] md:w-[12ch]">
              CXC • 5TH ITERATION • AI HACKATHON •
            </SpinningText>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
