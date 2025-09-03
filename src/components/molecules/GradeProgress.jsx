import React from "react";
import { cn } from "@/utils/cn";
import { getGradeColor, getLetterGrade } from "@/utils/gradeUtils";

const GradeProgress = ({ grade, size = "md", showLetter = true, className }) => {
  const percentage = Math.min(Math.max(grade || 0, 0), 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const sizes = {
    sm: { circle: 60, text: "text-sm", grade: "text-xs" },
    md: { circle: 80, text: "text-base", grade: "text-sm" },
    lg: { circle: 100, text: "text-xl", grade: "text-base" }
  };
  
  const currentSize = sizes[size];
  
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg 
        className="transform -rotate-90" 
        width={currentSize.circle} 
        height={currentSize.circle}
      >
        <circle
          cx={currentSize.circle / 2}
          cy={currentSize.circle / 2}
          r="40"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx={currentSize.circle / 2}
          cy={currentSize.circle / 2}
          r="40"
          stroke="url(#gradeGradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
        <defs>
          <linearGradient id="gradeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B3FF9" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold", currentSize.text, getGradeColor(grade))}>
          {grade ? Math.round(grade) : '--'}%
        </span>
        {showLetter && grade && (
          <span className={cn("font-medium text-gray-600", currentSize.grade)}>
            {getLetterGrade(grade)}
          </span>
        )}
      </div>
    </div>
  );
};

export default GradeProgress;