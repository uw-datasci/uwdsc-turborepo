import type { Metadata } from "next";
import { AppBackground } from "@/components/application/AppBackground";
import { AppProgressProvider } from "@/contexts/AppProgressContext";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply as a hacker to CxC - Canada's largest student-run data hackathon. Join 300+ participants, work with industry partners, and compete for $20,000 in prizes.",
  keywords:
    "data science, hackathon, datathon, application, uwaterloo, cxc, competition, machine learning, analytics, student competition",
  openGraph: {
    title: "Apply to CxC | UWaterloo Data Hackathon",
    description:
      "Apply as a hacker to CxC - Canada's largest student-run data hackathon. Compete for $20,000 in prizes and solve real-world data challenges.",
    images: ["/meta/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Apply as a hacker to CxC - Canada's largest student-run data hackathon. Compete for $20,000 in prizes and solve real-world data challenges.",
    images: ["/meta/og-image.png"],
  },
};

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProgressProvider>
      <AppBackground>{children}</AppBackground>
    </AppProgressProvider>
  );
}
