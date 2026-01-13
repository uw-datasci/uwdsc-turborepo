"use client";

import CxCButton from "@/components/CxCButton";

interface ScoreButtonsProps {
  readonly selected: number | null;
  readonly onSelect: (score: number) => void;
  readonly label: string;
  readonly maxScore?: number;
}

export function ScoreButtons({
  selected,
  onSelect,
  label,
  maxScore = 10,
}: Readonly<ScoreButtonsProps>) {
  const scores = Array.from({ length: maxScore + 1 }, (_, i) => i);

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-2">
        {scores.map((score) => (
          <CxCButton
            key={score}
            type="button"
            variant={selected === score ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(score)}
            className={
              selected === score
                ? "w-10 h-10 p-0 aspect-square"
                : "!bg-transparent !text-white border border-white/20 w-10 h-10 p-0 aspect-square"
            }
          >
            {score}
          </CxCButton>
        ))}
      </div>
    </div>
  );
}
