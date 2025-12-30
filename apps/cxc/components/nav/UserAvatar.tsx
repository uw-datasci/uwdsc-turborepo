"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  GlassSurface,
} from "@uwdsc/ui";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/api";

export default function UserAvatar() {
  const { user, isLoading, isAuthenticated, mutate } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      await mutate();
      router.push("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <Link href="/login">
        <Button variant="ghost" className="h-10 px-3">
          Log In
        </Button>
      </Link>
    );
  }

  const initials = (() => {
    if (!user) return "??";
    const fn = user.first_name ?? "";
    const ln = user.last_name ?? "";
    if (fn && ln) return `${fn.charAt(0)}${ln.charAt(0)}`.toUpperCase();
    return "??";
  })();

  const fullName = user?.first_name + " " + user?.last_name || "User";

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        onClick={() => setOpen((s) => !s)}
        className="h-10 w-10 rounded-full p-0 !bg-transparent hover:!bg-transparent"
        aria-expanded={open}
        aria-label="User menu"
      >
        <Avatar className="h-9 w-9">
          <AvatarImage src={undefined} alt={fullName} />
          <AvatarFallback className="bg-white text-black border border-border">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 z-50">
          <GlassSurface
            width={220}
            height="auto"
            borderRadius={10}
            backgroundOpacity={0.5}
            brightness={95}
            className="p-0"
          >
            <ul className="grid w-56 gap-1 p-2">
              <li className="px-3 py-2 border-b border-border/50">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex flex-row items-center gap-3 rounded-md p-3 no-underline outline-none transition-colors hover:bg-muted/75 focus:bg-muted/75 mb-1"
                >
                  <User className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium leading-normal">
                    Dashboard
                  </span>
                </Link>
              </li>

              <li className="border-t border-white/30 pt-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    handleSignOut();
                  }}
                  className="w-full h-auto flex flex-row items-center justify-start gap-3 p-3 rounded-md hover:cursor-pointer hover:bg-destructive/15"
                >
                  <LogOut className="h-4 w-4 shrink-0 text-destructive" />
                  <span className="text-sm font-medium leading-normal text-destructive">
                    Log out
                  </span>
                </button>
              </li>
            </ul>
          </GlassSurface>
        </div>
      )}
    </div>
  );
}
