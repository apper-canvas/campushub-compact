import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import QuickAddButton from "@/components/molecules/QuickAddButton";

const Header = ({ 
  title, 
  subtitle,
  onMenuToggle, 
  showMobileMenu = false,
  onQuickAdd,
  className 
}) => {
  return (
    <header className={cn("bg-white border-b border-gray-200 px-4 py-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showMobileMenu && (
            <Button
              variant="ghost"
              size="sm"
              icon="Menu"
              onClick={onMenuToggle}
              className="lg:hidden"
            />
          )}
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Academic Year</p>
              <p className="text-xs text-gray-500">2023-2024</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="text-white" size={20} />
            </div>
          </div>
          
          {onQuickAdd && (
            <div className="lg:hidden">
              <QuickAddButton {...onQuickAdd} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;