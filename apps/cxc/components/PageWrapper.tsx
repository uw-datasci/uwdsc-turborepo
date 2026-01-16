"use client";

import { usePathname } from "next/navigation";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  // Don't add padding on dashboard routes since navbar is hidden there
  const shouldAddPadding = !pathname?.startsWith("/dashboard");

  return (
    <div className={shouldAddPadding ? "pt-24" : ""}>
      {children}
    </div>
  );
}
