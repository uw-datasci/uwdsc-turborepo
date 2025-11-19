"use client";

import { ArrowRightIcon } from "@uwdsc/ui/index";
import CxCButton from "../CxCButton";

interface StepButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  marginLeft?: string;
  iconSize?: number;
}

export default function AppStepButton({
  text,
  onClick,
  className = "",
  marginLeft,
  iconSize,
}: Readonly<StepButtonProps>) {
  return (
    <CxCButton
      onClick={onClick}
      className={`!bg-white !text-black font-normal rounded-none !h-auto hover:!scale-105 hover:!bg-white flex items-center ${className}`}
    >
      {text}
      <ArrowRightIcon
        size={iconSize ?? 24}
        className={`${marginLeft ?? "ml-16"} !w-${iconSize ?? 24} !h-${iconSize ?? 24}`}
      />
    </CxCButton>
  );
}
