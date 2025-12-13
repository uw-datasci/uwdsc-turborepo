"use client";
import { OrbitingCircles } from "@uwdsc/ui/index";
import { CURRENT_SPONSORS } from "../../constants/home";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "../../hooks/useIsMobile";

export function Sponsors() {
  const isMobile = useIsMobile();

  // CXC-TODO: use tiered sopnsors instead of slice when info available
  const innerSponsors = CURRENT_SPONSORS.slice(
    0,
    Math.ceil(CURRENT_SPONSORS.length / 2),
  );
  const outerSponsors = CURRENT_SPONSORS.slice(
    Math.ceil(CURRENT_SPONSORS.length / 2),
  );

  // Responsive values
  const outerIconSize = isMobile ? 60 : 80;
  const outerRadius = isMobile ? 140 : 240;
  const innerIconSize = isMobile ? 70 : 90;
  const innerRadius = isMobile ? 80 : 130;

  return (
    <section className="relative text-white py-24 overflow-hidden mb-10 md:mb-20">
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Our Sponsors
        </h2>

        {/* Orbiting Sponsors */}
        <div className="relative flex h-[400px] md:h-[500px] w-full flex-col items-center justify-center overflow-hidden mb-12">
          {/* Center text */}
          <div className="z-10 text-base md:text-2xl font-semibold">
            CXC 2026
          </div>

          {/* Outer orbit - larger sponsors */}
          <OrbitingCircles
            iconSize={outerIconSize}
            radius={outerRadius}
            speed={1}
            reverse
          >
            {outerSponsors.map((sponsor) => (
              <Link
                key={`outer-${sponsor.name}`}
                href={sponsor.link || "https://placeholder.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={outerIconSize}
                  height={outerIconSize}
                  className="object-contain rounded-lg p-2"
                />
              </Link>
            ))}
          </OrbitingCircles>

          {/* Inner orbit - reverse direction */}
          <OrbitingCircles
            iconSize={innerIconSize}
            radius={innerRadius}
            speed={1.5}
          >
            {innerSponsors.map((sponsor) => (
              <Link
                key={`inner-${sponsor.name}`}
                href={sponsor.link || "https://placeholder.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={innerIconSize}
                  height={innerIconSize}
                  className="object-contain rounded-lg p-2"
                />
              </Link>
            ))}
          </OrbitingCircles>
        </div>

        {/* Contact form */}
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mt-20">
          Want to become a sponsor?{" "}
          <a
            href="mailto:outreach@uwdatascience.ca"
            className="underline text-white hover:text-gray-200 transition"
          >
            outreach@uwdatascience.ca
          </a>
        </p>
      </div>
    </section>
  );
}
