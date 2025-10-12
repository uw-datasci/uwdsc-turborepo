import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to complete registration",
  keywords: "email verification, account activation",
};

export default function VerifyEmailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
