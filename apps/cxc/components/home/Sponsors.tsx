"use client";
import { OrbitingCircles, ShimmerButton } from "@uwdsc/ui/index";
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
    <section className="relative text-white py-20 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Our Sponsors
        </h2>

        {/* Orbiting Sponsors */}
        <div className="relative flex h-[400px] md:h-[500px] w-full flex-col items-center justify-center overflow-hidden mb-12">
          {/* Center text */}
          <div className="relative w-20 h-8 md:w-36 md:h-16">
            <Image
              src="/logos/cxc_logo.svg"
              alt="CXC"
              fill
              className="object-contain"
              priority
            />
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

        {/* Contact CTA */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Interested in sponsoring CxC? Click the button to get in touch.
          </p>

          <ShimmerButton
            className="shadow-sm shadow-white/30"
            onClick={() =>
              (window.location.href = "mailto:outreach@uwdatascience.ca")
            }
            shimmerSize="1.5px"
            aria-label="Email outreach to become a sponsor"
          >
            <span className="text-center text-base font-medium tracking-tight text-white md:text-xl">
              Become a Sponsor
            </span>
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
