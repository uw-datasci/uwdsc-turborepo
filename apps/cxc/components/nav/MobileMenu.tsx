"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  Button,
  Separator,
  SheetDescription,
  ArrowRightIcon,
} from "@uwdsc/ui";
import Link from "next/link";
// no extra icons needed for mobile menu
import { signOut, type UserProfile } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import DSCLogo from "../DSCLogo";
import { motion } from "framer-motion";
import CxCButton from "../CxCButton";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  user: UserProfile | null;
}

function HamburgerIcon() {
  return (
    <div className="ml-auto flex flex-col gap-[5px] lg:hidden hover:cursor-pointer hover:scale-105 transition-all duration-200">
      <div className="h-[3px] w-[22px] rounded-full bg-foreground" />
      <div className="h-[3px] w-8 rounded-full bg-foreground" />
      <div className="h-[3px] w-[22px] translate-x-[10px] rounded-full bg-foreground" />
    </div>
  );
}

export function MobileMenu({ navLinks, user }: Readonly<MobileMenuProps>) {
  const router = useRouter();
  const { mutate } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      await mutate();
      router.push("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger>
        <HamburgerIcon />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm p-0 [&>button]:hidden bg-background text-foreground"
      >
        <div className="flex flex-col h-full bg-background text-foreground">
          <SheetHeader className="text-left border-b bg-muted/30 px-4 sm:px-6 lg:px-8 relative">
            <SheetTitle className="flex items-center gap-3 !h-16">
              <SheetClose asChild>
                <DSCLogo size={12} href="/" />
              </SheetClose>
              <span className="text-xl font-semibold ml-3">Navigation</span>
            </SheetTitle>
            <SheetDescription />
            <SheetClose asChild>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-accent/20 rounded transition-colors">
                <HamburgerIcon />
              </div>
            </SheetClose>
          </SheetHeader>

          <div className="flex flex-col flex-1 overflow-y-auto pb-24">
            <div className="px-6 py-6">
              <nav className="space-y-4">
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-2xl py-5 px-4 h-auto font-semibold hover:bg-accent/10 transition-colors rounded-lg"
                      asChild
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  </SheetClose>
                ))}
              </nav>
            </div>

            {user ? (
              <div className="absolute left-0 right-0 bottom-6 border-t border-border/50 bg-muted/30 mx-0 px-0">
                <div className="px-6 py-4">
                  <div className="mb-2 mx-4">
                    <p className="font-semibold text-lg text-foreground">
                      {user.first_name} {user.last_name}
                    </p>
                  </div>

                  <nav className="space-y-2">
                    <Separator className="my-2 border-border/40" />
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base py-3 px-4 h-auto font-medium text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors rounded-lg"
                      onClick={handleSignOut}
                    >
                      Log Out
                    </Button>
                  </nav>
                </div>
              </div>
            ) : (
              <div className="absolute left-0 right-0 bottom-6 border-t border-border/50 bg-muted/30 mx-0 px-0">
                <div className="px-6 py-4">
                  <SheetClose asChild>
                    <div className="flex flex-wrap gap-4 md:gap-8 font-normal">
                      <CxCButton
                        asChild
                        className="group text-sm md:text-base inline-flex items-center lg:px-4"
                      >
                        <Link href="/login">
                          <span>Login</span>
                          <motion.div
                            className="group-hover:translate-x-1.5 duration-200"
                            transition={{
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowRightIcon weight="bold" />
                          </motion.div>
                        </Link>
                      </CxCButton>
                      <CxCButton
                        asChild
                        className="group text-sm md:text-base inline-flex items-center lg:px-4"
                      >
                        <Link href="/register">
                          <span>Register</span>
                          <motion.div
                            className="group-hover:translate-x-1.5 duration-200"
                            transition={{
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowRightIcon weight="bold" />
                          </motion.div>
                        </Link>
                      </CxCButton>
                    </div>
                  </SheetClose>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
