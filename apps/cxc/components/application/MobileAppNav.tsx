import DSCLogo from "../DSCLogo";

export default function MobileAppNav() {
  return (
    <div className="w-full px-5 pt-28 pb-5 flex flex-row justify-between cxc-app-font">
      <DSCLogo size={16} className="z-10" href="/" />
      <p className="text-2xl font-normal">CXC 2026</p>
    </div>
  );
}
