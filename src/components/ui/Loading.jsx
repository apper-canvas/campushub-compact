import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, text = "Loading..." }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-secondary-500 rounded-full animate-spin animation-delay-75"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{text}</p>
    </div>
  );
};

export const SkeletonCard = ({ className }) => (
  <div className={cn("bg-white rounded-xl border border-gray-200 p-6 animate-pulse", className)}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="flex space-x-2">
      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
    </div>
  </div>
);

export const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Loading;