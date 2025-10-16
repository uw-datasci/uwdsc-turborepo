import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and manage your CXC competition profile",
  keywords: "profile, account settings, dashboard",
};

export default function MeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
