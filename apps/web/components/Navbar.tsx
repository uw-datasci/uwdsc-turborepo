"use client";

import { NavigationMenu, NavigationMenuList, GlassSurface } from "@uwdsc/ui";
import { NavLinks } from "./navbar/NavLinks";
import { AdminDropdown } from "./navbar/AdminDropdown";
import { UserAvatar } from "./navbar/UserAvatar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MobileMenu } from "./navbar/MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hideNavbar = pathname === "/login" || pathname === "/register";

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  if (hideNavbar) return null;

  // Check if user is admin or exec
  const userStatus = profile?.user_status;
  const isAdminOrExec = userStatus === "admin" || userStatus === "exec";

  return (
    <>
      <div
        className={`fixed left-0 right-0 z-50 px-6 py-6 lg:px-12 lg:py-8 ${
          isMobileMenuOpen ? "hidden lg:block" : ""
        }`}
      >
        <div className="relative flex items-center justify-between mx-auto">
          {/* DSC Logo */}
          <Link
            href="/"
            className="relative w-12 h-12 lg:w-14 lg:h-14 hover:cursor-pointer"
          >
            <Image
              src="/logos/dsc.svg"
              alt="uwdsc logo"
              fill
              className="object-contain"
            />
          </Link>

          {/* Centered Desktop Navbar */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <GlassSurface
              width="100%"
              height="auto"
              borderRadius={9999}
              className="hidden lg:block px-8 py-2 !overflow-visible"
            >
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-4">
                  <NavLinks profile={profile} />
                  {isAdminOrExec && (
                    <AdminDropdown
                      userStatus={userStatus as "admin" | "exec"}
                    />
                  )}
                  <UserAvatar />
                </NavigationMenuList>
              </NavigationMenu>
            </GlassSurface>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="ml-auto flex flex-col gap-[5px] lg:hidden hover:cursor-pointer"
            aria-label="Open menu"
          >
            <div className="h-[3px] w-[22px] rounded-full bg-white" />
            <div className="h-[3px] w-8 rounded-full bg-white" />
            <div className="h-[3px] w-[22px] translate-x-[10px] rounded-full bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        profile={profile}
        userStatus={userStatus}
      />
    </>
  );
}
