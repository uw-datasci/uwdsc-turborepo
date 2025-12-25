"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  cn,
  IdentificationCardIcon,
  CalendarIcon,
  FileTextIcon,
  UsersIcon,
  GithubLogoIcon,
} from "@uwdsc/ui";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <IdentificationCardIcon className="w-5 h-5" />,
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
    href: "/dashboard/schedule",
    label: "Schedule",
    icon: <CalendarIcon className="w-5 h-5" />,
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

  return (
    <nav className={cn("flex flex-col gap-2 p-4", className)}>
      <div className="mb-6">
        <Link href="/" className="flex items-center gap-2">
          <GithubLogoIcon className="w-8 h-8 text-white" />
          <span className="text-xl font-bold text-white">CxC</span>
        </Link>
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
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  "hover:bg-white/10",
                  isActive ? "text-white" : "text-white/60"
                )}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-8">
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white/60 transition-colors"
            whileHover={{ x: 4 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium">Back to Home</span>
          </motion.div>
        </Link>
      </div>
    </nav>
  );
}
