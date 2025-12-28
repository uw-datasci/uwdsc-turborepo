"use client";

import { Button, Instagram, Linkedin, RxDiscordLogo } from "@uwdsc/ui";

export function FollowUs() {
  const socials = [
    {
      name: "Instagram",
      icon: Instagram,
      link: "https://www.instagram.com/uwaterloodsc/",
      borderHover: "hover:border-[#E4405F]",
      iconHover: "group-hover:text-[#E4405F]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: "https://www.linkedin.com/company/waterloo-data-science-club/",
      borderHover: "hover:border-[#0077b5]",
      iconHover: "group-hover:text-[#0077b5]",
    },
    {
      name: "Discord",
      icon: RxDiscordLogo,
      link: "https://discord.gg/VFVkyP5mgm",
      borderHover: "hover:border-[#5865F2]",
      iconHover: "group-hover:text-[#5865F2]",
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
                  className={`group !h-16 !w-16 lg:!h-24 lg:!w-24 rounded-full border lg:border-2 border-white bg-transparent hover:!bg-transparent transition-all duration-300 hover:scale-110 ${social.borderHover}`}
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
                      className={`!h-6 !w-6 lg:!h-10 lg:!w-10 text-white transition-colors duration-300 ${social.iconHover}`}
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
