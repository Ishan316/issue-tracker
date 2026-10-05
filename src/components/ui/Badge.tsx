import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "accent" | "navy";
};

const tones = {
  accent: "bg-accent/20 text-accent-dark",
  navy: "bg-navy-light/30 text-white",
};

export function Badge({ tone = "accent", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
