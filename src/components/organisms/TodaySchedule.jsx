import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import { formatTime } from "@/utils/dateUtils";

const TodaySchedule = ({ todaySchedules, courses, className }) => {
  const getCurrentDayName = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const todayClasses = todaySchedules.filter(schedule => 
    schedule.dayOfWeek === getCurrentDayName()
  ).sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (todayClasses.length === 0) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
          <Badge variant="info" size="sm">
            {getCurrentDayName()}
          </Badge>
        </div>
        <Empty 
          icon="Calendar"
          title="No classes today"
          message="Enjoy your free day or catch up on assignments!"
          actionLabel={null}
        />
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
        <Badge variant="info" size="sm">
          {getCurrentDayName()}
        </Badge>
      </div>

      <div className="space-y-4">
{todayClasses.map((schedule, index) => {
          const course = courses.find(c => c.Id === schedule.courseId_c);
          const currentTime = new Date();
          const classStart = new Date(`${currentTime.toDateString()} ${schedule.startTime}`);
          const classEnd = new Date(`${currentTime.toDateString()} ${schedule.endTime}`);
          const isCurrentClass = currentTime >= classStart && currentTime <= classEnd;
          const isUpcoming = currentTime < classStart;
          
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                isCurrentClass 
                  ? 'bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200 shadow-md' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: course?.color || '#6B7280' }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {course?.name || 'Unknown Course'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {course?.code} • {course?.professor}
                    </p>
                    {schedule.location && (
                      <p className="text-xs text-gray-500 mt-1">
                        <ApperIcon name="MapPin" size={12} className="inline mr-1" />
                        {schedule.location}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                  </div>
                  {isCurrentClass && (
                    <Badge variant="primary" size="sm" className="mt-1">
                      <ApperIcon name="Clock" size={12} className="mr-1" />
                      In Progress
                    </Badge>
                  )}
                  {isUpcoming && (
                    <Badge variant="info" size="sm" className="mt-1">
                      <ApperIcon name="Calendar" size={12} className="mr-1" />
                      Upcoming
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TodaySchedule;