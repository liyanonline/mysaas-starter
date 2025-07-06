import * as React from "react";
import { cn } from "@/lib/utils"; // Optional: remove if you don’t use classnames helper

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
