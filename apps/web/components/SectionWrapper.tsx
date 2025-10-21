interface HomeSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className,
  id,
}: HomeSectionWrapperProps) {
  return (
    // mx-container: mx-7 sm:mx-9 md:mx-12 xl:mx-auto xl:max-w-[1200px]
    // mb-section: mb-24 lg:mb-52
    <section
      id={id}
      className={`mx-7 sm:mx-9 md:mx-12 xl:mx-auto xl:max-w-[1200px] mb-24 lg:mb-52 ${className}`}
    >
      {children}
    </section>
  );
}
