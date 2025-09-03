import React from "react";
import { cn } from "@/utils/cn";
import { formatTime } from "@/utils/dateUtils";

const ScheduleBlock = ({ schedule, course, onClick }) => {
  const startHour = parseInt(schedule.startTime.split(':')[0]);
  const startMin = parseInt(schedule.startTime.split(':')[1]);
  const endHour = parseInt(schedule.endTime.split(':')[0]);
  const endMin = parseInt(schedule.endTime.split(':')[1]);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  const duration = endMinutes - startMinutes;
  
  // Calculate position (assuming 8 AM start)
  const topOffset = ((startMinutes - 480) / 60) * 60; // 60px per hour
  const height = (duration / 60) * 60;
  
  return (
    <div
      className={cn(
        "absolute left-1 right-1 rounded-lg p-2 cursor-pointer transition-all duration-200 hover:shadow-md",
        "text-white text-sm font-medium"
      )}
      style={{
        top: `${topOffset}px`,
        height: `${height}px`,
        backgroundColor: course?.color || '#6B7280',
        minHeight: '40px'
      }}
      onClick={onClick}
    >
      <div className="truncate font-semibold">
        {course?.name || 'Unknown Course'}
      </div>
      <div className="text-xs opacity-90 truncate">
        {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
      </div>
      {schedule.location && (
        <div className="text-xs opacity-80 truncate">
          {schedule.location}
        </div>
      )}
    </div>
  );
};

export default ScheduleBlock;