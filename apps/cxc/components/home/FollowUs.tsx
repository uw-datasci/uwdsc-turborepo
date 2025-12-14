"use client";

import { Button, Instagram, Linkedin, RiTwitterXLine } from "@uwdsc/ui";

export function FollowUs() {
  const socials = [
    {
      name: "Instagram",
      icon: Instagram,
      link: "https://www.instagram.com/uwaterloodsc/",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: "https://www.linkedin.com/company/waterloo-data-science-club/",
    },
    {
      name: "Twitter",
      icon: RiTwitterXLine,
      link: "https://x.com/uwaterloodsc",
    },
  ];

  return (
    <section className="relative text-white py-20 overflow-hidden mb-10 lg:mb-20">
      <div className="container mx-auto px-16 flex flex-col lg:flex-row items-center lg:items-start justify-between">
        {/* Left column: Title */}
        <div className="mb-8 lg:mb-0 text-center lg:text-left">
          <h2 className="text-3xl lg:text-5xl font-light text-white">
            FOLLOW US
          </h2>
        </div>

        {/* Right column: Social icons */}
        <div className="flex justify-end">
          <div className="flex items-center gap-6 md:gap-12 lg:gap-9">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.name}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="!h-20 !w-20 lg:!h-40 lg:!w-40 rounded-full border lg:border-2 border-white bg-transparent hover:!bg-transparent transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Icon
                      size={48}
                      className="!h-6 !w-6 lg:!h-10 lg:!w-10 text-white"
                    />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
