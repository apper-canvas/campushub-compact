import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className,
  onClear,
  ...props 
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <ApperIcon name="Search" className="text-gray-400" size={20} />
      </div>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-12 pr-10"
        {...props}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;