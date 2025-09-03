import React from "react";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import ScheduleBlock from "@/components/molecules/ScheduleBlock";
import { formatTime } from "@/utils/dateUtils";

const WeeklySchedule = ({ courses, schedules, onScheduleClick }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [];
  
  // Generate time slots from 8 AM to 8 PM
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  const getSchedulesForDay = (day) => {
    return schedules.filter(schedule => schedule.dayOfWeek === day);
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-6 gap-4 mb-4">
        {/* Time column header */}
        <div className="text-sm font-medium text-gray-500 text-center">
          Time
        </div>
        
        {/* Day headers */}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-sm font-medium text-gray-900 text-center">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-6 gap-4">
        {/* Time column */}
        <div className="space-y-2">
          {timeSlots.map((time) => (
            <div key={time} className="h-[60px] flex items-center justify-center text-xs text-gray-500 border-t border-gray-100 first:border-t-0">
              {formatTime(time)}
            </div>
          ))}
        </div>
        
        {/* Day columns */}
        {daysOfWeek.map((day) => (
          <div key={day} className="relative">
            {/* Hour grid lines */}
            {timeSlots.map((time) => (
              <div key={time} className="h-[60px] border-t border-gray-100 first:border-t-0" />
            ))}
            
            {/* Schedule blocks */}
            {getSchedulesForDay(day).map((schedule) => {
              const course = courses.find(c => c.Id === schedule.courseId);
              return (
                <ScheduleBlock
                  key={`${schedule.courseId}-${schedule.dayOfWeek}-${schedule.startTime}`}
                  schedule={schedule}
                  course={course}
                  onClick={() => onScheduleClick && onScheduleClick(schedule, course)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeeklySchedule;