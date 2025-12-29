"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/api";
import {
  ArrowRightIcon,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@uwdsc/ui";
import { cn } from "@uwdsc/ui/lib/utils";
import CxCButton from "../CxCButton";
import DSCLogo from "../DSCLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/calendar", label: "Calendar" },
];

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, isLoading, mutate } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const showAuthButtons =
    process.env.NODE_ENV === "development" || pathname !== "/start";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      }
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleSignOut = async () => {
    try {
      await signOut();
      await mutate(); // Refresh auth state
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <motion.nav
      className="w-full fixed top-0 left-0 right-0 bg-background z-50 cxc-app-font"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="w-full py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 w-full items-center justify-between">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <DSCLogo size={12} href="/" />

            {/* Navigation Links - only show to authenticated users */}
            {!isLoading && isAuthenticated && (
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  {navLinks.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 !text-base font-medium",
                            "transition-colors hover:text-gray-400 focus:text-gray-400 outline-none",
                            "hover:bg-transparent focus:bg-transparent bg-transparent"
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* Right section - Auth Buttons */}
          {showAuthButtons && !isLoading && (
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <CxCButton
                  onClick={handleSignOut}
                  className="group text-sm md:text-base inline-flex items-center lg:px-4"
                >
                  <span>Sign Out</span>
                  <motion.div
                    className="group-hover:translate-x-1.5 duration-200"
                    transition={{
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRightIcon weight="bold" />
                  </motion.div>
                </CxCButton>
              ) : (
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
              )}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
