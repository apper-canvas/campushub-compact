import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "BookOpen",
  title = "No data found", 
  message = "Get started by adding your first item.", 
  actionLabel = "Get Started",
  onAction,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4", className)}>
      <div className="text-center max-w-md">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name={icon} className="text-primary-600" size={40} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        {onAction && (
          <Button 
            onClick={onAction}
            variant="primary"
            icon="Plus"
            className="shadow-lg"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;