import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Event Check-In | UWaterloo Data Science Club",
  description:
    "Easily check in to Data Science Club events and track your membership participation at the University of Waterloo.",
  keywords: "data science, events, workshops, uwaterloo, check in",
  openGraph: {
    title: "Membership Event Check-In | UWaterloo Data Science Club",
    description:
      "Quickly check in to Data Science Club events and workshops to earn membership credit and stay involved with the UW community.",
    images: ["/meta/og-image.png"],
  },
  twitter: {
    card: "summary",
    description:
      "Quickly check in to Data Science Club events and workshops to earn membership credit and stay involved with the UW community.",
    images: ["/meta/og-image.png"],
  },
};

export default function CalendarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
