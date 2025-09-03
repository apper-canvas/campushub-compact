import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  label,
  error,
  helper,
  className,
  containerClassName,
  children,
  placeholder = "Select an option",
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none pr-10";
  
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            baseStyles,
            error && "border-error-500 focus:ring-error-500",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ApperIcon name="ChevronDown" className="text-gray-400" size={20} />
        </div>
      </div>
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;