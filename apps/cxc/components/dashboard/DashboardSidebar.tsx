"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  cn,
  IdentificationCardIcon,
  FileTextIcon,
  UsersIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@uwdsc/ui";
import Image from "next/image";
import { QrCode } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  showForRoles?: string[]; // If undefined, show for all roles
}

const allNavItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <IdentificationCardIcon className="w-5 h-5" />,
  },
  {
    href: "/dashboard/nfc",
    label: "NFC Check-In",
    icon: <QrCode className="w-5 h-5" />,
    showForRoles: ["admin", "superadmin", "staff"], // Only show for non-default roles
  },
  {
    href: "/dashboard/application",
    label: "Application",
    icon: <FileTextIcon className="w-5 h-5" />,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: <UsersIcon className="w-5 h-5" />,
  },
  {
    href: "/dashboard/results",
    label: "Results",
    icon: <CheckCircleIcon className="w-5 h-5" />,
  },
];

interface DashboardSidebarProps {
  className?: string;
  onNavClick?: () => void;
}

export function DashboardSidebar({
  className,
  onNavClick,
}: Readonly<DashboardSidebarProps>) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Filter nav items based on user role
  const navItems = allNavItems.filter((item) => {
    if (!item.showForRoles) return true; // Show for all roles
    if (!user?.role) return false;
    // Show NFC tab only for non-default roles
    return user.role !== "default";
  });

  return (
    <nav className={cn("flex flex-col gap-2 p-6", className)}>
      <div className="mb-8">
        <Link href="/">
          <div className="relative w-20 h-8 md:w-36 md:h-16 cursor-pointer">
            <Image
              src="/logos/cxc_logo.svg"
              alt="CXC"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <p className="text-white/60 text-sm mt-2 uppercase tracking-wider">
          Hacker Dashboard
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className="relative"
            >
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors border-l-2",
                  isActive
                    ? "border-white bg-white/10 text-white"
                    : "border-transparent text-white/60 hover:text-white hover:bg-white/5",
                )}
                whileTap={{ scale: 0.98 }}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-8 border-t border-white/10">
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </motion.div>
        </Link>
      </div>
    </nav>
  );
}
