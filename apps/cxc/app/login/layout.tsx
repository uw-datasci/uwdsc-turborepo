import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your CXC competition account",
  keywords: "login, sign in, authentication, cxc account",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
