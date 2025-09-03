import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ className }) => {
  const location = useLocation();

  const navigationItems = [
    { 
      name: "Dashboard", 
      href: "/", 
      icon: "LayoutDashboard",
      description: "Overview and today's focus"
    },
    { 
      name: "Courses", 
      href: "/courses", 
      icon: "BookOpen",
      description: "Manage your courses"
    },
    { 
      name: "Assignments", 
      href: "/assignments", 
      icon: "FileText",
      description: "Track assignments and deadlines"
    },
    { 
      name: "Schedule", 
      href: "/schedule", 
      icon: "Calendar",
      description: "Weekly class schedule"
    },
    { 
      name: "Grades", 
      href: "/grades", 
      icon: "BarChart3",
      description: "View grades and GPA"
    }
  ];

  return (
    <div className={cn("bg-white border-r border-gray-200 h-full flex flex-col", className)}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <ApperIcon name="GraduationCap" className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              CampusHub
            </h1>
            <p className="text-xs text-gray-500">Academic Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary-700"
                  )}
                >
                  <ApperIcon 
                    name={item.icon} 
                    size={20}
                    className={cn(
                      "transition-colors duration-200",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-primary-600"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{item.name}</div>
                    <div className={cn(
                      "text-xs truncate",
                      isActive ? "text-white/80" : "text-gray-500"
                    )}>
                      {item.description}
                    </div>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-4 text-center">
          <ApperIcon name="Star" className="mx-auto mb-2 text-primary-600" size={24} />
          <p className="text-sm font-medium text-gray-900 mb-1">Stay Organized!</p>
          <p className="text-xs text-gray-600">Keep track of all your academic goals</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;