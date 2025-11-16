interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepName?: string;
  subStepName?: string;
  label?: string;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  stepName,
  subStepName,
  label = "CXC 2026",
}: StepIndicatorProps) {
  // for extra step number validation
  const stepNumber = currentStep > totalSteps ? totalSteps : currentStep;
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-10">
        <div
          className={`flex flex-col gap-3 ${subStepName ? "font-normal" : "font-light"}`}
        >
          <h3 className="block md:hidden text-white/75 text-2xl">
            Step {stepNumber}: {stepName}
          </h3>
          <h2 className="text-4xl md:text-6xl lg:text-7xl">
            {subStepName ? subStepName : `Step ${stepNumber}`}
          </h2>
        </div>

        {/* Step Progress Bars */}
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 transition-colors duration-300 ${
                index < stepNumber ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
      {label && <p className="text-lg md:text-3xl">{label}</p>}
    </div>
  );
}
