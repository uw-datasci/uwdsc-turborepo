import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Check-In | UWaterloo Data Science Club",
  description:
    "Check in to Data Science Club events and workshops to earn membership credit and track your participation at the University of Waterloo.",
  keywords:
    "data science, events, workshops, uwaterloo, check in, membership, attendance",
  openGraph: {
    title: "Event Check-In | UWaterloo Data Science Club",
    description:
      "Easily check in to Data Science Club events and workshops to earn membership credit and track your participation in the UW community.",
    images: ["/meta/og-image.png"],
  },
  twitter: {
    card: "summary",
    description:
      "Check in to Data Science Club events and workshops to earn membership credit and track your participation in the UW community.",
    images: ["/meta/og-image.png"],
  },
};

export default function CheckInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
