import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  variant = "primary", 
  size = "md", 
  children, 
  className, 
  icon,
  iconPosition = "left",
  disabled,
  loading,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    outline: "border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-primary-300 focus:ring-primary-500 shadow-sm hover:shadow-md",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:ring-gray-500",
    danger: "bg-gradient-to-r from-error-500 to-error-600 text-white hover:from-error-600 hover:to-error-700 focus:ring-error-500 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
    xl: "px-8 py-4 text-lg gap-3"
  };
  
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed transform-none",
        className
      )}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" className="animate-spin" size={16} />}
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon name={icon} size={16} />
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} size={16} />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;