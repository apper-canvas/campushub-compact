import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import CourseCard from "@/components/molecules/CourseCard";
import CourseForm from "@/components/organisms/CourseForm";
import Loading, { SkeletonCard } from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { courseService } from "@/services/api/courseService";
import { assignmentService } from "@/services/api/assignmentService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [coursesData, assignmentsData] = await Promise.all([
        courseService.getAll(),
        assignmentService.getAll()
      ]);
      
      setCourses(coursesData);
      setAssignments(assignmentsData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAssignmentCount = (courseId) => {
    return assignments.filter(assignment => assignment.courseId === courseId).length;
  };

  const handleCreateCourse = async (courseData) => {
    try {
      const newCourse = await courseService.create(courseData);
      setCourses(prev => [...prev, newCourse]);
      setShowForm(false);
      toast.success("Course created successfully!");
    } catch (err) {
      toast.error("Failed to create course");
      console.error('Error creating course:', err);
    }
  };

  const handleUpdateCourse = async (courseData) => {
    try {
      const updatedCourse = await courseService.update(editingCourse.Id, courseData);
      setCourses(prev => 
        prev.map(course => course.Id === editingCourse.Id ? updatedCourse : course)
      );
      setShowForm(false);
      setEditingCourse(null);
      toast.success("Course updated successfully!");
    } catch (err) {
      toast.error("Failed to update course");
      console.error('Error updating course:', err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course? This will also delete all related assignments.")) {
      return;
    }

    try {
      await courseService.delete(courseId);
      setCourses(prev => prev.filter(course => course.Id !== courseId));
      
      // Also remove assignments for this course
      setAssignments(prev => prev.filter(assignment => assignment.courseId !== courseId));
      
      toast.success("Course deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete course");
      console.error('Error deleting course:', err);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
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
            {editingCourse ? "Edit Course" : "Add New Course"}
          </h2>
        </div>
        
        <CourseForm
          course={editingCourse}
          onSubmit={editingCourse ? handleUpdateCourse : handleCreateCourse}
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
          <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
          <p className="text-gray-600 mt-1">Manage your academic courses</p>
        </div>
        
        <Button
          variant="primary"
          icon="Plus"
          onClick={() => setShowForm(true)}
          className="shadow-lg"
        >
          Add Course
        </Button>
      </div>

      {/* Search */}
      <SearchBar
        placeholder="Search courses by name, code, or professor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm("")}
        className="max-w-md"
      />

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        searchTerm ? (
          <Empty
            icon="Search"
            title="No courses found"
            message={`No courses match your search for "${searchTerm}"`}
            actionLabel="Clear Search"
            onAction={() => setSearchTerm("")}
          />
        ) : (
          <Empty
            icon="BookOpen"
            title="No courses yet"
            message="Start by adding your first course to get organized!"
            actionLabel="Add Your First Course"
            onAction={() => setShowForm(true)}
          />
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.Id}
              course={course}
              assignmentCount={getAssignmentCount(course.Id)}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
              onClick={() => {/* TODO: Navigate to course detail */}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;