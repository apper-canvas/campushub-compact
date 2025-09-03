import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({ 
  label,
  error,
  helper,
  className,
  containerClassName,
  rows = 4,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical";
  
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          baseStyles,
          error && "border-error-500 focus:ring-error-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;