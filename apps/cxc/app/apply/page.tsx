"use client";

import { MobileAppWormhole } from "@/components/application/AppWormhole";
import DesktopApplication from "@/components/application/DesktopApplication";
import MobileApplication from "@/components/application/MobileApplication";

export default function ApplyPage() {
  return (
    <>
      <DesktopApplication />
      <MobileApplication />
    </>
  );
}
