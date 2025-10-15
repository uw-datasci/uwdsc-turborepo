import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your CXC account and join the competition",
  keywords: "register, sign up, create account, cxc competition",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
