import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import SearchBar from "@/components/molecules/SearchBar";
import AssignmentItem from "@/components/molecules/AssignmentItem";
import AssignmentForm from "@/components/organisms/AssignmentForm";
import Loading, { SkeletonList } from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { assignmentService } from "@/services/api/assignmentService";
import { courseService } from "@/services/api/courseService";
import { getDueDateUrgency } from "@/utils/dateUtils";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [assignmentsData, coursesData] = await Promise.all([
        assignmentService.getAll(),
        courseService.getAll()
      ]);
      
      setAssignments(assignmentsData);
      setCourses(coursesData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredAssignments = assignments
    .filter(assignment => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const course = courses.find(c => c.Id === assignment.courseId);
        if (
          !assignment.title.toLowerCase().includes(searchLower) &&
          !assignment.description?.toLowerCase().includes(searchLower) &&
          !course?.name.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Status filter
      if (filterStatus === "completed" && !assignment.completed) return false;
      if (filterStatus === "pending" && assignment.completed) return false;
      if (filterStatus === "overdue") {
        const urgency = getDueDateUrgency(assignment.dueDate);
        if (assignment.completed || urgency !== "overdue") return false;
      }

      // Course filter
      if (filterCourse !== "all" && assignment.courseId !== filterCourse) return false;

      // Priority filter
      if (filterPriority !== "all" && assignment.priority !== filterPriority) return false;

      return true;
    })
    .sort((a, b) => {
      // Sort by due date, then by priority
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      
      if (dateA.getTime() === dateB.getTime()) {
        const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      return dateA - dateB;
    });

  const handleCreateAssignment = async (assignmentData) => {
    try {
      const newAssignment = await assignmentService.create(assignmentData);
      setAssignments(prev => [...prev, newAssignment]);
      setShowForm(false);
      toast.success("Assignment created successfully!");
    } catch (err) {
      toast.error("Failed to create assignment");
      console.error('Error creating assignment:', err);
    }
  };

  const handleUpdateAssignment = async (assignmentData) => {
    try {
      const updatedAssignment = await assignmentService.update(editingAssignment.Id, assignmentData);
      setAssignments(prev => 
        prev.map(assignment => assignment.Id === editingAssignment.Id ? updatedAssignment : assignment)
      );
      setShowForm(false);
      setEditingAssignment(null);
      toast.success("Assignment updated successfully!");
    } catch (err) {
      toast.error("Failed to update assignment");
      console.error('Error updating assignment:', err);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      return;
    }

    try {
      await assignmentService.delete(assignmentId);
      setAssignments(prev => prev.filter(assignment => assignment.Id !== assignmentId));
      toast.success("Assignment deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete assignment");
      console.error('Error deleting assignment:', err);
    }
  };

  const handleToggleComplete = async (assignmentId, completed) => {
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

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAssignment(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterCourse("all");
    setFilterPriority("all");
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <SkeletonList count={5} />
      </div>
    );
  }

  if (error) {
    return <Error onRetry={loadData} />;
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingAssignment ? "Edit Assignment" : "Add New Assignment"}
          </h2>
        </div>
        
        <AssignmentForm
          assignment={editingAssignment}
          courses={courses}
          onSubmit={editingAssignment ? handleUpdateAssignment : handleCreateAssignment}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
          <p className="text-gray-600 mt-1">Track your assignments and deadlines</p>
        </div>
        
        <Button
          variant="primary"
          icon="Plus"
          onClick={() => setShowForm(true)}
          className="shadow-lg"
        >
          Add Assignment
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SearchBar
          placeholder="Search assignments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
        />
        
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          placeholder="Filter by status"
        >
          <option value="all">All Assignments</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </Select>
        
        <Select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          placeholder="Filter by course"
        >
          <option value="all">All Courses</option>
          {courses.map((course) => (
            <option key={course.Id} value={course.Id}>
              {course.name}
            </option>
          ))}
        </Select>
        
        <Select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          placeholder="Filter by priority"
        >
          <option value="all">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </Select>
      </div>

      {(searchTerm || filterStatus !== "all" || filterCourse !== "all" || filterPriority !== "all") && (
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            Showing {filteredAssignments.length} of {assignments.length} assignments
          </span>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Assignments List */}
      {filteredAssignments.length === 0 ? (
        (searchTerm || filterStatus !== "all" || filterCourse !== "all" || filterPriority !== "all") ? (
          <Empty
            icon="Search"
            title="No assignments found"
            message="No assignments match your current filters"
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        ) : (
          <Empty
            icon="FileText"
            title="No assignments yet"
            message="Start by adding your first assignment to stay organized!"
            actionLabel="Add Your First Assignment"
            onAction={() => setShowForm(true)}
          />
        )
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => {
            const course = courses.find(c => c.Id === assignment.courseId);
            return (
              <AssignmentItem
                key={assignment.Id}
                assignment={assignment}
                course={course}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditAssignment}
                onDelete={handleDeleteAssignment}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Assignments;