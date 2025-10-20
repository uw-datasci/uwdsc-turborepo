type InputFeedbackProps = {
  state: "success" | "error";
  children: React.ReactNode;
  classes?: string;
};

export default function InputFeedback({
  state,
  children,
  classes,
}: InputFeedbackProps) {
  return (
    <p
      className={
        (classes ? classes : "mt-4 leading-relaxed") +
        (state === "success" ? " text-green-300" : " text-red-400")
      }
    >
      {children}
    </p>
  );
}
