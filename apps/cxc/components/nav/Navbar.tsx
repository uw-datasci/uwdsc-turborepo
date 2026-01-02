"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { MobileMenu } from "./MobileMenu";
import UserAvatar from "./UserAvatar";
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
];

export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();
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

  return (
    // Hide navbar on dashboard routes
    pathname?.startsWith("/dashboard") ? null : (
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
                <NavigationMenu className="hidden sm:flex">
                  <NavigationMenuList>
                    {navLinks.map((link) => (
                      <NavigationMenuItem key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 !text-base font-medium",
                              "transition-colors hover:text-gray-400 focus:text-gray-400 outline-none",
                              "hover:bg-transparent focus:bg-transparent bg-transparent",
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

            {/* Right section - Auth Buttons (includes mobile menu on small screens) */}
            {showAuthButtons && !isLoading && (
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <>
                    <div className="hidden sm:block">
                      <UserAvatar />
                    </div>
                    <div className="block sm:hidden flex items-center justify-center">
                      <MobileMenu navLinks={navLinks} user={user ?? null} />
                    </div>
                  </>
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
    )
  );
}
