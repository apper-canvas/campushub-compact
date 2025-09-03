import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import WeeklySchedule from "@/components/organisms/WeeklySchedule";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { courseService } from "@/services/api/courseService";
import { scheduleService } from "@/services/api/scheduleService";

const Schedule = () => {
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

  function getCurrentWeek() {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Monday
    return startOfWeek.toISOString().split('T')[0];
  }

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [coursesData, schedulesData] = await Promise.all([
        courseService.getAll(),
        scheduleService.getAll()
      ]);
      
      setCourses(coursesData);
      setSchedules(schedulesData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleScheduleClick = (schedule, course) => {
    toast.info(
      `${course?.name || 'Unknown Course'} - ${schedule.startTime} to ${schedule.endTime}${
        schedule.location ? ` at ${schedule.location}` : ''
      }`
    );
  };

  const navigateWeek = (direction) => {
    const currentDate = new Date(selectedWeek);
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + (direction * 7)));
    setSelectedWeek(newDate.toISOString().split('T')[0]);
  };

  const formatWeekRange = (weekStart) => {
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(end.getDate() + 4); // Friday
    
    const options = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="flex space-x-2">
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        <div className="h-96 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return <Error onRetry={loadData} />;
  }

  if (schedules.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Schedule</h2>
            <p className="text-gray-600 mt-1">View your weekly class schedule</p>
          </div>
        </div>

        <Empty
          icon="Calendar"
          title="No schedule available"
          message="Add courses with schedule information to see your weekly timetable here."
          actionLabel="Add a Course"
          onAction={() => window.location.href = "/courses"}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Schedule</h2>
          <p className="text-gray-600 mt-1">Your weekly class timetable</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            icon="ChevronLeft"
            onClick={() => navigateWeek(-1)}
            size="sm"
          >
            Previous
          </Button>
          
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              Week of {formatWeekRange(selectedWeek)}
            </div>
            <button
              onClick={() => setSelectedWeek(getCurrentWeek())}
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              Go to current week
            </button>
          </div>
          
          <Button
            variant="outline"
            icon="ChevronRight"
            iconPosition="right"
            onClick={() => navigateWeek(1)}
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Weekly Schedule */}
      <WeeklySchedule
        courses={courses}
        schedules={schedules}
        onScheduleClick={handleScheduleClick}
      />

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Course Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {courses.map((course) => (
            <div key={course.Id} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: course.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {course.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {course.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;