import { useRouter } from "next/navigation";
import DSCLogo from "../DSCLogo";

export default function MobileAppNav() {
  const router = useRouter();
  return (
    <div className="w-full px-5 pt-10 pb-5 flex flex-row justify-between cxc-app-font">
      <DSCLogo size={16} className="z-10" onClick={() => router.push("/")} />
      <p className="text-2xl font-normal">CXC 2026</p>
    </div>
  );
}
