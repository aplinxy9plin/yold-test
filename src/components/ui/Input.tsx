"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, before, after, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.focus();
    };

    return (
      <div
        onClick={handleClick}
        className={cn(
          "h-[50px] px-5 py-3 rounded-[5px] gap-[10px] flex items-center cursor-text",
          "bg-background-primary border border-strokes-primary",
          "text-txt placeholder:text-primary-stroke",
          "hover:border-primary-stroke",
          "focus:outline-none focus:border-primary-stroke",
          error && "border-error",
          props?.disabled && "bg-background-secondary border-none cursor-not-allowed",
          className
        )}
      >
        {before && (
          <div className="flex items-center">
            {before}
          </div>
        )}
        <input 
          ref={(node) => {
            // Поддерживаем оба ref: внешний и внутренний
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
            inputRef.current = node;
          }} 
          className="w-full h-full outline-none" 
          {...props} 
        />
        {after && (
          <div className="flex items-center">
            {after}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
