"use client";

import { NavigationMenu, NavigationMenuList } from "@uwdsc/ui";
import { NavLinks } from "./navbar/NavLinks";
import { AdminDropdown } from "./navbar/AdminDropdown";
import { UserAvatar } from "./navbar/UserAvatar";

export function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
      <nav className="flex items-center gap-8 bg-background/80 backdrop-blur-md border border-border rounded-full px-12 py-3 shadow-lg">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-8">
            <NavLinks />
            <AdminDropdown />
            <UserAvatar />
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}
