import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children, 
  className, 
  hover = false,
  gradient = false,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl border border-gray-200 transition-all duration-200";
  const hoverStyles = hover ? "hover:shadow-card-hover hover:scale-[1.02] cursor-pointer" : "";
  const gradientStyles = gradient ? "bg-gradient-to-br from-white to-gray-50" : "";
  
  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        "shadow-card",
        hoverStyles,
        gradientStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;