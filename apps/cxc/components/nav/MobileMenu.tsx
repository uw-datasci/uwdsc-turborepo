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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@uwdsc/ui";
import Link from "next/link";
import { signOut, type UserProfile } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import DSCLogo from "../DSCLogo";
import { motion } from "framer-motion";
import CxCButton from "../CxCButton";
import { cn } from "@uwdsc/ui/lib/utils";
import { ChevronDownIcon } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface AdminPage {
  href: string;
  label: string;
  description: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  user: UserProfile | null;
  adminPages?: AdminPage[];
  superadminPages?: AdminPage[];
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

export function MobileMenu({
  navLinks,
  user,
  adminPages = [],
  superadminPages = [],
}: Readonly<MobileMenuProps>) {
  const router = useRouter();
  const { mutate } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSuperadminOpen, setIsSuperadminOpen] = useState(false);

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

          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="px-6 py-6 flex-1">
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

              {/* Admin section - only show to admin or superadmin users */}
              {(user?.role === "admin" || user?.role === "superadmin") && adminPages.length > 0 && (
                <div className="mt-6">
                  <Separator className="my-4 border-border/40" />
                  <Collapsible
                    open={isAdminOpen}
                    onOpenChange={setIsAdminOpen}
                    className="space-y-2"
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-2xl py-5 px-4 h-auto font-semibold hover:bg-accent/10 transition-colors rounded-lg"
                      >
                        Admin
                        <ChevronDownIcon
                          className={cn(
                            "h-6 w-6 transition-transform duration-200",
                            isAdminOpen && "rotate-180",
                          )}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {adminPages.map((page) => (
                        <SheetClose key={page.href} asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-left text-base py-3 px-6 h-auto font-medium hover:bg-accent/10 transition-colors rounded-lg ml-4"
                            asChild
                          >
                            <Link href={page.href}>
                              <div className="flex flex-col items-start gap-0.5">
                                <span className="font-medium">
                                  {page.label}
                                </span>
                                <span className="text-xs text-muted-foreground font-normal">
                                  {page.description}
                                </span>
                              </div>
                            </Link>
                          </Button>
                        </SheetClose>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}

              {/* Superadmin section - only show to superadmin users */}
              {user?.role === "superadmin" && superadminPages.length > 0 && (
                <div className="mt-6">
                  <Separator className="my-4 border-border/40" />
                  <Collapsible
                    open={isSuperadminOpen}
                    onOpenChange={setIsSuperadminOpen}
                    className="space-y-2"
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-2xl py-5 px-4 h-auto font-semibold hover:bg-accent/10 transition-colors rounded-lg"
                      >
                        Superadmin
                        <ChevronDownIcon
                          className={cn(
                            "h-6 w-6 transition-transform duration-200",
                            isSuperadminOpen && "rotate-180",
                          )}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2">
                      {superadminPages.map((page) => (
                        <SheetClose key={page.href} asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-left text-base py-3 px-6 h-auto font-medium hover:bg-accent/10 transition-colors rounded-lg ml-4"
                            asChild
                          >
                            <Link href={page.href}>
                              <div className="flex flex-col items-start gap-0.5">
                                <span className="font-medium">
                                  {page.label}
                                </span>
                                <span className="text-xs text-muted-foreground font-normal">
                                  {page.description}
                                </span>
                              </div>
                            </Link>
                          </Button>
                        </SheetClose>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
            </div>

            {user ? (
              <div className="mt-auto border-t border-border/50 bg-muted/30 mx-0 px-0 mb-6">
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
              <div className="mt-auto border-t border-border/50 bg-muted/30 mx-0 px-0 mb-6">
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
