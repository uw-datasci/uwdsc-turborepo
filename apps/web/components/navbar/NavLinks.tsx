import Link from "next/link";
import { NavigationMenuItem, navigationMenuTriggerStyle } from "@uwdsc/ui";
import { cn } from "@uwdsc/ui/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/apply", label: "Apply" },
  { href: "/calendar", label: "Calendar" },
];

export function NavLinks() {
  return (
    <>
      {navLinks.map((link) => (
        <NavigationMenuItem key={link.href}>
          <Link
            href={link.href}
            className={cn(
              navigationMenuTriggerStyle(),
              "rounded-full text-base"
            )}
          >
            {link.label}
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );
}
