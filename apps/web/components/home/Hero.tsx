export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/spinning_globe.mp4" type="video/mp4" />
      </video>
      
      {/* Title + Description */}
      <div className="z-10 mt-20 flex max-w-3xl flex-col gap-6 px-6 sm:gap-10 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-[4rem] leading-relaxed tracking-wide">
          University of Waterloo <br /> Data Science Club
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-xl">
          Inspiring the data science leaders of the future by building an
          inclusive community to bridge the gap between academics and the
          industry.
        </p>
      </div>
    </section>
  );
}