import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { getDateLabel, getDueDateUrgency } from "@/utils/dateUtils";

const AssignmentItem = ({ 
  assignment, 
  course, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}) => {
  const urgency = getDueDateUrgency(assignment.dueDate);
  
  return (
    <Card className={cn(
      "p-4 transition-all duration-200",
      assignment.completed && "opacity-75"
    )}>
      <div className="flex items-start justify-between space-x-4">
        <div className="flex items-start space-x-4 flex-1">
          <Checkbox
            checked={assignment.completed}
            onChange={(e) => onToggleComplete(assignment.Id, e.target.checked)}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className={cn(
                "font-semibold text-gray-900 truncate",
                assignment.completed && "line-through text-gray-500"
              )}>
                {assignment.title}
              </h3>
              <Badge variant={urgency} size="sm">
                {getDateLabel(assignment.dueDate)}
              </Badge>
              {assignment.priority === "High" && !assignment.completed && (
                <Badge variant="error" size="sm">High Priority</Badge>
              )}
            </div>
            
            {assignment.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {assignment.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: course?.color || '#6B7280' }}
                  />
                  <span>{course?.name || 'Unknown Course'}</span>
                </span>
                {assignment.grade !== null && assignment.grade !== undefined && (
                  <span className="font-medium text-primary-600">
                    Grade: {assignment.grade}%
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Edit2"
                  onClick={() => onEdit(assignment)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon="Trash2"
                  onClick={() => onDelete(assignment.Id)}
                  className="text-error-600 hover:text-error-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AssignmentItem;