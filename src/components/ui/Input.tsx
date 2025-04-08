"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useRef } from "react";
import { Typography } from "./Typography";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
  label?: string;
  prepend?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, before, after, label, prepend, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.focus();
    };

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <Typography variant="paragraph" className="text-primary-stroke mb-[-5px]">
            {label}
          </Typography>
        )}
        <div className="flex">
          {prepend && (
            <div className="flex items-center px-5 py-3 rounded-l-[5px] border border-r-0 border-strokes-primary bg-background-secondary">
              {prepend}
            </div>
          )}
          <div
            onClick={handleClick}
            className={cn(
              "h-[50px] px-5 py-3 gap-[10px] flex items-center cursor-text flex-1",
              "bg-background-primary border border-strokes-primary",
              "text-txt placeholder:text-primary-stroke",
              "hover:border-primary-stroke",
              "focus:outline-none focus:border-primary-stroke",
              error && "border-error",
              props?.disabled && "bg-background-secondary border-none cursor-not-allowed",
              prepend ? "rounded-r-[5px] rounded-l-none" : "rounded-[5px]",
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
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
