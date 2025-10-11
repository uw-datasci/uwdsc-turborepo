import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@uwdsc/ui";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export function UserAvatar() {
  // TODO: Replace with actual user data from auth context
  const user = {
    name: "John Doe",
    email: "john@uwdsc.com",
    avatar: undefined,
    initials: "JD",
  };

  return (
    <NavigationMenuItem className="relative pl-8 before:absolute before:left-0 before:h-10 before:w-px before:bg-border">
      <NavigationMenuTrigger className="h-10 w-10 rounded-full p-0">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user.initials}
          </AvatarFallback>
        </Avatar>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-48 gap-1 p-2">
          <li className="px-3 py-2 border-b border-border">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                href="/profile"
                className="flex flex-row items-center gap-3 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <User className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium leading-normal">
                  Profile
                </span>
              </Link>
            </NavigationMenuLink>
          </li>

          <li>
            <NavigationMenuLink asChild>
              <Link
                href="/settings"
                className="flex flex-row items-center gap-3 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <Settings className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium leading-normal">
                  Settings
                </span>
              </Link>
            </NavigationMenuLink>
          </li>
          <li className="border-t border-border pt-1">
            <NavigationMenuLink asChild>
              <button className="flex flex-row w-full items-center gap-3 rounded-md p-3 outline-none transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive text-left">
                <LogOut className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium leading-normal">
                  Log out
                </span>
              </button>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
