import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error loading your data. Please try again.", 
  onRetry,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4", className)}>
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-error-100 to-error-200 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="AlertCircle" className="text-error-600" size={32} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="primary"
            icon="RefreshCw"
            className="shadow-lg"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;