import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ 
  variant = "default", 
  size = "md", 
  children, 
  className,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800",
    success: "bg-gradient-to-r from-success-100 to-success-200 text-success-800",
    warning: "bg-gradient-to-r from-warning-100 to-warning-200 text-warning-800",
    error: "bg-gradient-to-r from-error-100 to-error-200 text-error-800",
    info: "bg-gradient-to-r from-info-100 to-info-200 text-info-800",
    overdue: "bg-gradient-to-r from-error-500 to-error-600 text-white shadow-lg",
    today: "bg-gradient-to-r from-warning-500 to-warning-600 text-white shadow-lg",
    urgent: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md",
    soon: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md",
    normal: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };
  
  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;