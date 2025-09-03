import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardStats from "@/components/organisms/DashboardStats";
import TodaySchedule from "@/components/organisms/TodaySchedule";
import UpcomingAssignments from "@/components/organisms/UpcomingAssignments";
import QuickAddButton from "@/components/molecules/QuickAddButton";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { courseService } from "@/services/api/courseService";
import { assignmentService } from "@/services/api/assignmentService";
import { scheduleService } from "@/services/api/scheduleService";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [coursesData, assignmentsData, schedulesData] = await Promise.all([
        courseService.getAll(),
        assignmentService.getAll(),
        scheduleService.getAll()
      ]);
      
      setCourses(coursesData);
      setAssignments(assignmentsData);
      setSchedules(schedulesData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleAssignmentComplete = async (assignmentId, completed) => {
    try {
      const assignment = assignments.find(a => a.Id === assignmentId);
      if (!assignment) return;

      const updatedAssignment = { ...assignment, completed };
      await assignmentService.update(assignmentId, updatedAssignment);
      
      setAssignments(prev => 
        prev.map(a => a.Id === assignmentId ? updatedAssignment : a)
      );
      
      toast.success(completed ? "Assignment marked as complete!" : "Assignment marked as incomplete");
    } catch (err) {
      toast.error("Failed to update assignment");
      console.error('Error updating assignment:', err);
    }
  };

  const handleQuickAdd = {
    onAddAssignment: () => navigate("/assignments"),
    onAddCourse: () => navigate("/courses")
  };

  if (loading) {
    return <Loading text="Loading your dashboard..." />;
  }

  if (error) {
    return <Error onRetry={loadData} />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-primary-100 text-lg">
            Here's what's happening with your academic journey today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats 
        courses={courses} 
        assignments={assignments}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <TodaySchedule 
          todaySchedules={schedules}
          courses={courses}
        />

        {/* Upcoming Assignments */}
        <UpcomingAssignments 
          assignments={assignments}
          courses={courses}
          onToggleComplete={handleToggleAssignmentComplete}
          onViewAll={() => navigate("/assignments")}
          limit={5}
        />
      </div>

      {/* Quick Add Button */}
      <div className="fixed bottom-6 right-6 lg:hidden z-10">
        <QuickAddButton {...handleQuickAdd} />
      </div>
    </div>
  );
};

export default Dashboard;