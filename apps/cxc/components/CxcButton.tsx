"use client";

import { Button } from "@uwdsc/ui";
import { cn } from "@uwdsc/ui/lib/utils";
import type { ComponentProps } from "react";

export default function CxcButton({
  className,
  children,
  ...props
}: Readonly<ComponentProps<typeof Button>>) {
  return (
    <Button
      className={cn(
        "!bg-white !text-black font-normal rounded-none !h-auto hover:!scale-105 hover:!bg-white",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
