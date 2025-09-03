import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { calculateGPA } from "@/utils/gradeUtils";
import { getDueDateUrgency } from "@/utils/dateUtils";

const DashboardStats = ({ courses, assignments, className }) => {
  const totalCourses = courses.length;
  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter(a => a.completed).length;
  const pendingAssignments = totalAssignments - completedAssignments;
  const overdueAssignments = assignments.filter(a => 
    !a.completed && getDueDateUrgency(a.dueDate) === "overdue"
  ).length;
  const currentGPA = calculateGPA(courses);
  
  const completionRate = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;

  const stats = [
    {
      title: "Current GPA",
      value: currentGPA > 0 ? currentGPA.toFixed(2) : "N/A",
      icon: "TrendingUp",
      color: "text-success-600",
      bgColor: "from-success-500 to-success-600",
      change: currentGPA >= 3.5 ? "Excellent" : currentGPA >= 3.0 ? "Good" : currentGPA >= 2.5 ? "Fair" : "Needs Improvement"
    },
    {
      title: "Active Courses",
      value: totalCourses,
      icon: "BookOpen",
      color: "text-primary-600",
      bgColor: "from-primary-500 to-primary-600",
      change: `${totalCourses} enrolled`
    },
    {
      title: "Pending Tasks",
      value: pendingAssignments,
      icon: "Clock",
      color: overdueAssignments > 0 ? "text-error-600" : "text-warning-600",
      bgColor: overdueAssignments > 0 ? "from-error-500 to-error-600" : "from-warning-500 to-warning-600",
      change: overdueAssignments > 0 ? `${overdueAssignments} overdue` : "On track"
    },
    {
      title: "Completion Rate",
      value: `${Math.round(completionRate)}%`,
      icon: "CheckCircle",
      color: "text-info-600",
      bgColor: "from-info-500 to-info-600",
      change: `${completedAssignments}/${totalAssignments} done`
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-card-hover transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.bgColor} rounded-xl flex items-center justify-center shadow-lg`}>
              <ApperIcon name={stat.icon} className="text-white" size={24} />
            </div>
            <Badge variant="default" size="sm">
              Today
            </Badge>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;