"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserProfile } from "@/types/api";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/api";
import { useRouter } from "next/navigation";
import { RiArrowDropDownLine } from "@uwdsc/ui/index";

interface NavLink {
  href: string;
  label: string;
}

interface AdminLink {
  href: string;
  title: string;
  adminOnly?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  userStatus?: string | null;
}

const adminLinks: AdminLink[] = [
  {
    href: "/admin/memberships",
    title: "Memberships",
  },
  {
    href: "/admin/events",
    title: "Events",
  },
  {
    href: "/admin/applications",
    title: "Exec Apps",
    adminOnly: true,
  },
];

export function MobileMenu({
  isOpen,
  onClose,
  profile,
  userStatus,
}: MobileMenuProps) {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const { mutate } = useAuth();
  const router = useRouter();

  const navLinks: NavLink[] = useMemo(() => {
    const baseLinks: NavLink[] = [
      { href: "/", label: "Home" },
      { href: "/team", label: "Team" },
      { href: "/apply", label: "Apply" },
      { href: "/calendar", label: "Calendar" },
    ];

    if (profile) {
      baseLinks.splice(1, 0, { href: "/memCheckIn", label: "Check In" });
    }

    return baseLinks;
  }, [profile]);

  const isAdminOrExec = userStatus === "admin" || userStatus === "exec";
  const isAdmin = userStatus === "admin";
  const adminLabel = userStatus === "admin" ? "Admin" : "Exec";
  const visibleAdminLinks = adminLinks.filter(
    (link) => !link.adminOnly || isAdmin
  );

  const handleSignOut = async () => {
    try {
      await signOut();
      await mutate();
      onClose();
      router.push("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 overflow-y-auto bg-black/50 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" onClick={onClose} className="relative w-12 h-12">
          <Image
            src="/logos/dsc.svg"
            alt="uwdsc logo"
            fill
            className="object-contain"
          />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex flex-col gap-[5px] hover:cursor-pointer"
          aria-label="Close menu"
        >
          <div className="h-[3px] w-[22px] translate-x-[10px] rounded-full bg-white" />
          <div className="h-[3px] w-8 rounded-full bg-white" />
          <div className="h-[3px] w-[22px] rounded-full bg-white" />
        </button>
      </header>

      {/* Navigation */}
      <nav className="grid gap-4 px-6 py-6 text-white">
        {/* Main Navigation Links */}
        {navLinks.map((link) => (
          <div key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block text-4xl font-bold"
            >
              {link.label}
            </Link>
            <hr className="my-4 border-t-2 border-white" />
          </div>
        ))}

        {/* Admin/Exec Dropdown */}
        {isAdminOrExec && (
          <div>
            <button
              onClick={() => setIsAdminDropdownOpen((prev) => !prev)}
              className="flex w-full flex-row items-center justify-between text-4xl font-bold"
            >
              {adminLabel}
              <RiArrowDropDownLine
                className={`transform transition-transform duration-300 ${
                  isAdminDropdownOpen ? "rotate-180" : ""
                }`}
                size={50}
              />
            </button>
            {isAdminDropdownOpen && (
              <div className="rounded-md text-xl">
                <ul className="py-2 font-normal">
                  {visibleAdminLinks.map((link) => (
                    <li key={link.href} className="my-2">
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="hover:underline"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <hr className="my-4 border-t-2 border-white" />
          </div>
        )}

        {/* User Section */}
        {/* {profile ? (
          <div className="mt-8 space-y-4">
            <div className="text-lg text-gray-300">
              <p className="font-semibold">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="text-sm">{profile.email}</p>
            </div>
            <div className="space-y-2">
              <Link
                href="/passport"
                onClick={onClose}
                className="block text-xl font-semibold hover:underline"
              >
                My Passport
              </Link>
              <Link
                href="/settings"
                onClick={onClose}
                className="block text-xl font-semibold hover:underline"
              >
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="block text-xl font-semibold hover:underline text-red-400"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <Link
              href="/login"
              onClick={onClose}
              className="block text-2xl font-bold hover:underline"
            >
              Log In
            </Link>
          </div>
        )} */}
      </nav>
    </div>
  );
}
