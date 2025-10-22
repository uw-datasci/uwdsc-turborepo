type GradientBorderProps = {
  className?: string;
  children: React.ReactNode;
};

export default function GradientBorder({
  className,
  children,
}: GradientBorderProps) {
  return (
    <div className={`bg-gradient-purple p-0.25 ${className}`}>{children}</div>
  );
}
