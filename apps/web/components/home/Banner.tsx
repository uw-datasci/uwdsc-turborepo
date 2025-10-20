type BannerProps = {
  children: React.ReactNode;
};

/**
 * Not currently used
 */

export default function Banner({ children }: BannerProps) {
  return (
    <div className="relative">
      <div className="bg-gradient-purple absolute inset-0 opacity-20" />
      {/* mx-container */}
      <div className="mx-7 sm:mx-9 md:mx-12 xl:mx-auto xl:max-w-[1200px] relative z-10">
        {children}
      </div>
    </div>
  );
}
