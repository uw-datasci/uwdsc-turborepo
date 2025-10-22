import "@uwdsc/ui/globals.css";
import "../styles.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@uwdsc/ui";
import { Navbar } from "@/components/Navbar";
import { baseMetadata } from "@/lib/metadata";
import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    default: "UWaterloo Data Science Club",
    template: "%s | UWaterloo Data Science Club",
  },
  description: "University of Waterloo Data Science Club website",
  openGraph: {
    type: "website",
    title: "UWaterloo Data Science Club",
    description: "University of Waterloo Data Science Club website",
    images: ["/meta/og-image.png"],
  },
  twitter: {
    card: "summary",
    title: "UWaterloo Data Science Club",
    description: "University of Waterloo Data Science Club website",
    images: ["/meta/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000211",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-slate-50 dark:bg-black">
          <ThemeProvider>
            <AuthProvider>
              <Navbar />
              {children}
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
