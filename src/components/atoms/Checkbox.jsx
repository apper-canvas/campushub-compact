import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  label,
  className,
  containerClassName,
  checked,
  ...props 
}, ref) => {
  return (
    <label className={cn("flex items-center space-x-3 cursor-pointer", containerClassName)}>
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          className="sr-only"
          {...props}
        />
        <div className={cn(
          "w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200",
          checked 
            ? "bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500" 
            : "bg-white border-gray-300 hover:border-primary-300",
          className
        )}>
          {checked && (
            <ApperIcon 
              name="Check" 
              size={14} 
              className="text-white animate-in zoom-in-50 duration-200" 
            />
          )}
        </div>
      </div>
      {label && (
        <span className={cn(
          "text-sm text-gray-700 transition-colors duration-200",
          checked && "line-through text-gray-500"
        )}>
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;