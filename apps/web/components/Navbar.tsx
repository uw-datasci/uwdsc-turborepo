"use client";

import { NavigationMenu, NavigationMenuList, GlassSurface } from "@uwdsc/ui";
import { NavLinks } from "./navbar/NavLinks";
import { AdminDropdown } from "./navbar/AdminDropdown";
import { UserAvatar } from "./navbar/UserAvatar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const pathname = usePathname();
  const { profile } = useAuth();

  const hideNavbar = pathname === "/login" || pathname === "/register";

  if (hideNavbar) return null;

  // Check if user is admin or exec
  const userStatus = profile?.user_status;
  const isAdminOrExec = userStatus === "admin" || userStatus === "exec";

  return (
    <div className="fixed left-0 right-0 z-50 px-12 py-8">
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

        {/* Centered Navbar */}
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
                  <AdminDropdown userStatus={userStatus as "admin" | "exec"} />
                )}
                <UserAvatar />
              </NavigationMenuList>
            </NavigationMenu>
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}
