"use client";

export function FollowUs () {
    const socials = [
        { name: "Instagram", src: "/icons/instagram.svg", link: "https://www.instagram.com/uwaterloodsc/" },
        { name: "LinkedIn", src: "/icons/linkedin.svg", link: "https://www.linkedin.com/company/waterloo-data-science-club/" },
        { name: "Twitter", src: "/icons/twitter.svg", link: "https://x.com/uwaterloodsc" },
    ];
    return (
        <section className="relative bg-[#0C0C0C] text-white py-24 overflow-hidden">
            <div className="container mx-auto px-16 flex flex-col md:flex-row items-center md:items-start justify-center space-y-8 md:space-y-0 md:space-x-30">
        
                {/* Left column: Title */}
                <div className="mb-8 md:mb-0 md:w-1/3 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-light text-white">FOLLOW US</h2>
                </div>

                {/* Right column: Social icons */}
                <div className="md:w-1/3 flex justify-end">
                <div className="grid grid-cols-3 gap-8">
                    {socials.map((social, i) => (
                        <a
                            key={i}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full h-full"
                        >
                            <img
                            src={social.src}
                            alt={social.name}
                            className="w-full h-full object-contain"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </section>
    );
}