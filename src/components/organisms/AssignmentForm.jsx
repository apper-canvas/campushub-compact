import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
const AssignmentForm = ({ assignment, courses, onSubmit, onCancel }) => {
const [formData, setFormData] = useState({
    courseId_c: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    completed: false,
    grade: null
  });

  useEffect(() => {
if (assignment) {
      setFormData({
        courseId_c: assignment.courseId_c || "",
        title: assignment.title || "",
        description: assignment.description || "",
        dueDate: assignment.dueDate?.split('T')[0] || "",
        priority: assignment.priority || "Medium",
        completed: assignment.completed || false,
        grade: assignment.grade || null
      });
    }
  }, [assignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
if (!formData.courseId_c || !formData.title.trim() || !formData.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const assignmentData = {
      ...formData,
      courseId: formData.courseId_c,
      dueDate: new Date(formData.dueDate).toISOString(),
      grade: formData.grade ? parseFloat(formData.grade) : null
};

    onSubmit(assignmentData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Details</h3>
        
        <div className="space-y-4">
<Select
            label="Course *"
            value={formData.courseId_c}
            onChange={(e) => setFormData(prev => ({ ...prev, courseId_c: e.target.value }))}
            placeholder="Select a course"
            required
          >
            {courses.map((course) => (
              <option key={course.Id} value={course.Id}>
                {course.name} ({course.code})
              </option>
            ))}
          </Select>
          
          <Input
            label="Assignment Title *"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Essay on Data Structures"
            required
          />
          
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Additional details about the assignment..."
            rows={3}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Due Date *"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              required
            />
            
            <Select
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Grade (%)"
              type="number"
              min="0"
              max="100"
              value={formData.grade || ""}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                grade: e.target.value ? parseFloat(e.target.value) : null 
              }))}
              placeholder="Enter when graded"
            />
            
            <div className="flex items-center space-x-3 pt-8">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.completed}
                  onChange={(e) => setFormData(prev => ({ ...prev, completed: e.target.checked }))}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Mark as completed
                </span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" icon="Save">
          {assignment ? "Update Assignment" : "Create Assignment"}
        </Button>
      </div>
    </form>
  );
};

export default AssignmentForm;