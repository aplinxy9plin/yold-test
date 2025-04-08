"use client";
import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";
import { Typography } from "./Typography";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Typography variant="paragraph" className="text-primary-stroke mb-[-5px]">
            {label}
          </Typography>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full h-[100px] px-5 py-3 rounded-[5px] resize-none",
            "bg-background-primary border border-strokes-primary",
            "text-txt placeholder:text-primary-stroke",
            "hover:border-primary-stroke",
            "focus:outline-none focus:border-primary-stroke",
            error && "border-error",
            props?.disabled && "bg-background-secondary border-none cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
