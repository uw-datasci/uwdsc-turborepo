"use client";

import { ReactNode } from "react";

interface AppBackgroundProps {
  readonly children: ReactNode;
}

export function AppBackground({ children }: AppBackgroundProps) {
  return <>{children}</>;
}
