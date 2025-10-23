import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "UWaterloo Data Science Club admin dashboard",
  keywords: "admin, dashboard, management",
  openGraph: {
    title: "Admin | UWaterloo Data Science Club",
    description: "UWaterloo Data Science Club admin dashboard",
    images: ["/meta/og-image.png"],
  },
  twitter: {
    card: "summary",
    description: "UWaterloo Data Science Club admin dashboard",
    images: ["/meta/og-image.png"],
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container mx-auto px-4 py-12">{children}</div>;
}
