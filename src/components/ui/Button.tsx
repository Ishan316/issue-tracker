import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-accent text-navy-dark hover:bg-accent-light",
  secondary: "bg-navy-light text-white hover:bg-navy",
  ghost: "bg-transparent text-accent hover:bg-navy-light/30",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
