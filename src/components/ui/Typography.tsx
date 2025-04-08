import { cn } from "@/lib/utils";
import { ElementType, HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: "title" | "subtitle" | "paragraph" | "paragraph-mini" | "button-text";
  as?: ElementType;
}

const variantStyles = {
  title: "font-inter font-medium text-[30px] leading-[140%]",
  subtitle: "font-inter text-lg leading-[140%]",
  paragraph: "font-inter text-base leading-[160%]",
  "paragraph-mini": "font-inter text-xs leading-[160%]",
  "button-text": "font-inter font-medium text-base leading-[160%]",
};

export function Typography({
  variant = "paragraph",
  as: Component = "p",
  className,
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn("text-txt", variantStyles[variant], className)}
      {...props}
    />
  );
}
