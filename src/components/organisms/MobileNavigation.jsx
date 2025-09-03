import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const MobileNavigation = ({ className }) => {
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Courses", href: "/courses", icon: "BookOpen" },
    { name: "Assignments", href: "/assignments", icon: "FileText" },
    { name: "Schedule", href: "/schedule", icon: "Calendar" },
    { name: "Grades", href: "/grades", icon: "BarChart3" }
  ];

  return (
    <div className={cn("bg-white border-t border-gray-200 px-2 py-2", className)}>
      <nav className="flex justify-around">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1",
                isActive
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-500 hover:text-primary-600 hover:bg-gray-50"
              )}
            >
              <ApperIcon 
                name={item.icon} 
                size={20}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-primary-600" : "text-gray-500"
                )}
              />
              <span className={cn(
                "text-xs font-medium truncate",
                isActive ? "text-primary-600" : "text-gray-500"
              )}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNavigation;