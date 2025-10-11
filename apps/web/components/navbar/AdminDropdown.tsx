import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@uwdsc/ui";

interface AdminLink {
  href: string;
  title: string;
  description: string;
}

const adminLinks: AdminLink[] = [
  {
    href: "/admin/events",
    title: "Events",
    description: "Create and manage club events",
  },
  {
    href: "/admin/applications",
    title: "Exec Apps",
    description: "Review executive applications",
  },
  {
    href: "/admin/settings",
    title: "Settings",
    description: "Configure application settings",
  },
];

export function AdminDropdown() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="rounded-full text-base">
        Admin
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <Link
                href="/admin/memberships"
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
              >
                <div className="mb-2 mt-4 text-lg font-medium">Memberships</div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Manage club members, roles, and permissions for UWDSC.
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          {adminLinks.map((link) => (
            <li key={link.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={link.href}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">
                    {link.title}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {link.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
