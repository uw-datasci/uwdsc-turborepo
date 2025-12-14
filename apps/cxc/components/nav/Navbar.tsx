"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/api";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@uwdsc/ui";
import { cn } from "@uwdsc/ui/lib/utils";
import CxCButton from "../CxCButton";
import DSCLogo from "../DSCLogo";

interface NavbarProps {
  readonly showAuthButtons?: boolean;
}

export default function Navbar({ showAuthButtons = true }: NavbarProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, mutate } = useAuth();

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
    <nav className="w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <DSCLogo size={10} href="/" />

            {/* Navigation Links */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={cn(
                        "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                        "transition-colors hover:text-gray-400 focus:text-gray-400 outline-none",
                        "hover:bg-transparent focus:bg-transparent bg-transparent"
                      )}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className={cn(
                        "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                        "transition-colors hover:text-gray-400 focus:text-gray-400 outline-none",
                        "hover:bg-transparent focus:bg-transparent bg-transparent"
                      )}
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/events"
                      className={cn(
                        "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                        "transition-colors hover:text-gray-400 focus:text-gray-400 outline-none",
                        "hover:bg-transparent focus:bg-transparent bg-transparent"
                      )}
                    >
                      Events
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className={cn(
                        "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                        "transition-colors hover:text-gray-400 focus:text-gray-400 outline-none",
                        "hover:bg-transparent focus:bg-transparent bg-transparent"
                      )}
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right section - Auth Buttons */}
          {showAuthButtons && !isLoading && (
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <CxCButton onClick={handleSignOut}>Sign Out</CxCButton>
              ) : (
                <>
                  <CxCButton onClick={() => router.push("/login")}>
                    Login
                  </CxCButton>
                  <CxCButton onClick={() => router.push("/register")}>
                    Register
                  </CxCButton>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
