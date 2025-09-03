import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import MobileNavigation from "@/components/organisms/MobileNavigation";
import Header from "@/components/organisms/Header";
import { cn } from "@/utils/cn";

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-72 transform transition-transform">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={cn(
        "flex flex-col min-h-screen",
        "lg:ml-72" // Offset for desktop sidebar
      )}>
        {/* Header */}
        <Header 
          showMobileMenu 
          onMenuToggle={toggleMobileMenu}
          className="lg:hidden"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <MobileNavigation />
        </div>
      </div>
    </div>
  );
};

export default Layout;