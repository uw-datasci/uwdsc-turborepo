"use client";
import { CURRENT_SPONSORS } from "../../constants/home";
import Image from "next/image";

export function Sponsors() {
  return (
    <section className="relative text-white py-24 overflow-hidden mb-10 md:mb-20">
      <div className="container mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Our Sponsors
        </h2>

        {/* Sponsor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-42 max-w-4xl mx-auto mb-12">
          {CURRENT_SPONSORS.map((sponsor) => (
            <div
              key={sponsor.name}
              className="max-h-[112px] py-12 flex items-center justify-center text-lg font-medium text-white"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-[112px] object-contain"
              />
            </div>
          ))}
        </div>

        {/* form */}
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mt-20">
          Want to become a sponsor?{" "}
          <a
            href="#"
            className="underline text-white hover:text-gray-200 transition"
          >
            Fill out this form
          </a>
        </p>
      </div>
    </section>
  );
}
