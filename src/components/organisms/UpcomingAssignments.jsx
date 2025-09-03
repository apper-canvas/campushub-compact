import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { getDateLabel, getDueDateUrgency } from "@/utils/dateUtils";

const UpcomingAssignments = ({ 
  assignments, 
  courses, 
  onToggleComplete, 
  onViewAll,
  className,
  limit = 5 
}) => {
  const upcomingAssignments = assignments
    .filter(assignment => !assignment.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, limit);

  if (upcomingAssignments.length === 0) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h3>
          {onViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              View All
            </Button>
          )}
        </div>
        <Empty 
          icon="CheckCircle"
          title="All caught up!"
          message="You have no pending assignments. Great job!"
          actionLabel={null}
        />
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h3>
        {onViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All <ApperIcon name="ArrowRight" size={16} className="ml-1" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {upcomingAssignments.map((assignment) => {
const course = courses.find(c => c.Id === assignment.courseId_c);
          const urgency = getDueDateUrgency(assignment.dueDate);
          
          return (
            <div
              key={assignment.Id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Checkbox
                checked={assignment.completed}
                onChange={(e) => onToggleComplete(assignment.Id, e.target.checked)}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900 truncate">
                    {assignment.title}
                  </h4>
                  <Badge variant={urgency} size="sm">
                    {getDateLabel(assignment.dueDate)}
                  </Badge>
                  {assignment.priority === "High" && (
                    <Badge variant="error" size="sm">High</Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center space-x-1 text-gray-600">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: course?.color || '#6B7280' }}
                    />
                    <span>{course?.name || 'Unknown Course'}</span>
                  </span>
                  
                  {assignment.grade !== null && assignment.grade !== undefined && (
                    <span className="text-primary-600 font-medium">
                      {assignment.grade}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {assignments.filter(a => !a.completed).length > limit && onViewAll && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={onViewAll}
            className="w-full"
          >
            View All {assignments.filter(a => !a.completed).length} Assignments
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UpcomingAssignments;