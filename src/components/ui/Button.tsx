import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Typography } from "./Typography";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

const variantStyles = {
  primary: "cursor-pointer bg-txt text-background-primary h-[50px] px-[22px] py-[12px] rounded-[5px] gap-[10px] focus:outline-1 focus:outline-primary-stroke disabled:bg-strokes-primary disabled:text-background-secondary flex items-center gap-2.5",
  secondary: "cursor-pointer bg-background-primary outline outline-strokes-primary h-[40px] px-[22px] py-[7px] rounded-[5px] gap-[10px] hover:outline-primary-stroke focus:outline-primary-stroke disabled:bg-strokes-primary disabled:text-background-secondary disabled:outline-none flex items-center gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, before, after, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {before}
        <Typography variant="button-text" className="text-button-text text-center w-full">{children}</Typography>
        {after}
      </button>
    );
  }
);

Button.displayName = "Button";
