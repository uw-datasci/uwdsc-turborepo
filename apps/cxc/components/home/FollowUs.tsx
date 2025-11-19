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
    <section className="relative text-white py-24 overflow-hidden mb-10 md:mb-20">
      <div className="container mx-auto px-16 flex flex-col md:flex-row items-center md:items-start justify-center space-y-8 md:space-y-0 md:space-x-30">
        {/* Left column: Title */}
        <div className="mb-8 md:mb-0 md:w-1/3 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-light text-white">
            FOLLOW US
          </h2>
        </div>

        {/* Right column: Social icons */}
        <div className="md:w-1/3 flex justify-end">
          <div className="flex items-center gap-4 md:gap-6">
            {socials.map((social) => {
              const Icon = social.icon;
              const isReactIcon = social.icon === RiTwitterXLine;
              return (
                <Button
                  key={social.name}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 md:h-14 md:w-14 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    {isReactIcon ? (
                      <Icon
                        size={48}
                        className="text-white h-8 w-8 md:h-10 md:w-10"
                      />
                    ) : (
                      <Icon
                        size={48}
                        className="h-8 w-8 md:h-10 md:w-10 text-white"
                      />
                    )}
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
