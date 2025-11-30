import Image from "next/image";
import Link from "next/link";

interface DSCLogoProps {
  size?: number;
  className?: string;
  href?: string;
}

export default function DSCLogo({
  size = 24,
  className = "",
  href,
}: Readonly<DSCLogoProps>) {
  const logoContent = (
    <div className={`relative w-${size} h-${size} ${className}`}>
      <Image
        src="/logos/dsc.svg"
        alt="uwdsc logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:cursor-pointer block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
