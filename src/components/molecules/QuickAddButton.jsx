import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const QuickAddButton = ({ onAddAssignment, onAddCourse }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <Button
        onClick={toggleOpen}
        variant="primary"
        size="lg"
        className="rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
        icon={isOpen ? "X" : "Plus"}
      />
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col space-y-3 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <Button
            onClick={() => {
              onAddAssignment();
              setIsOpen(false);
            }}
            variant="accent"
            size="md"
            icon="FileText"
            className="whitespace-nowrap shadow-lg"
          >
            Add Assignment
          </Button>
          <Button
            onClick={() => {
              onAddCourse();
              setIsOpen(false);
            }}
            variant="secondary"
            size="md"
            icon="BookOpen"
            className="whitespace-nowrap shadow-lg"
          >
            Add Course
          </Button>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default QuickAddButton;