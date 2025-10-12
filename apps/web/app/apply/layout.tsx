import { Metadata } from "next";
import { ApplicationBackground } from "@/components/application/ApplicationBackground";
import { AppProgressProvider } from "@/contexts/AppProgressContext";

export const metadata: Metadata = {
  title: "DSC Application",
  description: "University of Waterloo Data Science Club Exec Application",
};

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProgressProvider>
      <ApplicationBackground>{children}</ApplicationBackground>
    </AppProgressProvider>
  );
}
