import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import GradeProgress from "@/components/molecules/GradeProgress";
import { calculateCourseGrade } from "@/utils/gradeUtils";

const CourseCard = ({ course, assignmentCount, onEdit, onDelete, onClick }) => {
  const currentGrade = calculateCourseGrade(course);
  
  return (
    <Card 
      hover
      className="p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-4 h-4 rounded-full shadow-sm"
            style={{ backgroundColor: course.color }}
          />
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {course.name}
            </h3>
            <p className="text-sm text-gray-600">{course.code}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            icon="Edit2"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(course);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon="Trash2"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(course.Id);
            }}
            className="text-error-600 hover:text-error-700"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Professor:</span> {course.professor}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Credits:</span> {course.credits}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Assignments:</span> {assignmentCount || 0}
          </div>
        </div>
        
        <GradeProgress grade={currentGrade} size="md" />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {course.schedule?.map((schedule, index) => (
          <Badge key={index} variant="info" size="sm">
            {schedule.dayOfWeek} {schedule.startTime}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default CourseCard;