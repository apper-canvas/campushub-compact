import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import GradeProgress from "@/components/molecules/GradeProgress";
import Loading, { SkeletonCard } from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { courseService } from "@/services/api/courseService";
import { assignmentService } from "@/services/api/assignmentService";
import { calculateGPA, calculateCourseGrade, getLetterGrade } from "@/utils/gradeUtils";

const Grades = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.error('Error loading grades:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const currentGPA = calculateGPA(courses);
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

const getAssignmentsForCourse = (courseId) => {
    return assignments.filter(assignment => assignment.courseId_c === courseId);
  };

const getGradedAssignmentsForCourse = (courseId) => {
    return assignments.filter(assignment => 
      assignment.courseId_c === courseId && 
      assignment.grade !== null && 
      assignment.grade !== undefined
    );
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SkeletonCard />
          </div>
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error onRetry={loadData} />;
  }

  if (courses.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Grades</h2>
            <p className="text-gray-600 mt-1">Track your academic performance</p>
          </div>
        </div>

        <Empty
          icon="BarChart3"
          title="No grades available"
          message="Add courses and assignments to start tracking your academic performance."
          actionLabel="Add a Course"
          onAction={() => window.location.href = "/courses"}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Grades</h2>
        <p className="text-gray-600 mt-1">Track your academic performance and GPA</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GPA Overview */}
        <div className="lg:col-span-1">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <GradeProgress grade={currentGPA * 25} size="lg" showLetter={false} />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentGPA > 0 ? currentGPA.toFixed(2) : "N/A"}
                </h3>
                <p className="text-sm text-gray-600">Current GPA</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{totalCredits}</div>
                  <div className="text-xs text-gray-600">Total Credits</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{courses.length}</div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center">
                  <Badge variant={currentGPA >= 3.5 ? "success" : currentGPA >= 3.0 ? "info" : currentGPA >= 2.5 ? "warning" : "error"}>
                    {currentGPA >= 3.7 ? "Excellent" : 
                     currentGPA >= 3.3 ? "Very Good" :
                     currentGPA >= 3.0 ? "Good" :
                     currentGPA >= 2.7 ? "Satisfactory" :
                     currentGPA >= 2.0 ? "Needs Improvement" : "Critical"}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Grades */}
        <div className="lg:col-span-2 space-y-6">
          {courses.map((course) => {
            const courseGrade = calculateCourseGrade(course);
            const courseAssignments = getAssignmentsForCourse(course.Id);
            const gradedAssignments = getGradedAssignmentsForCourse(course.Id);
            
            return (
              <Card key={course.Id} className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: course.color }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {course.code} • {course.professor} • {course.credits} credits
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {courseGrade ? Math.round(courseGrade) : "--"}%
                        </div>
                        <div className="text-sm text-gray-600">
                          {courseGrade ? getLetterGrade(courseGrade) : "No Grade"}
                        </div>
                      </div>
                      <GradeProgress grade={courseGrade} size="sm" showLetter={false} />
                    </div>
                  </div>
                </div>

                {/* Grade Categories */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Grade Categories</h4>
                  <div className="space-y-3">
                    {course.gradeCategories?.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {category.name}
                            </span>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-600">
                                {category.weight}%
                              </span>
                              <div className="text-sm font-medium">
                                {category.currentGrade !== null && category.currentGrade !== undefined
                                  ? `${category.currentGrade}%`
                                  : "Not graded"
                                }
                              </div>
                            </div>
                          </div>
                          {category.currentGrade !== null && category.currentGrade !== undefined && (
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(category.currentGrade, 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assignment Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      <ApperIcon name="FileText" size={16} className="inline mr-1" />
                      Assignments: {gradedAssignments.length} graded of {courseAssignments.length} total
                    </span>
                    {gradedAssignments.length > 0 && (
                      <span className="font-medium text-gray-900">
                        Avg: {Math.round(gradedAssignments.reduce((sum, a) => sum + a.grade, 0) / gradedAssignments.length)}%
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Grades;