import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    professor: "",
    credits: 3,
    color: "#5B3FF9",
    schedule: [],
    gradeCategories: [
      { name: "Assignments", weight: 30, currentGrade: null },
      { name: "Exams", weight: 40, currentGrade: null },
      { name: "Participation", weight: 10, currentGrade: null },
      { name: "Final Project", weight: 20, currentGrade: null }
    ]
  });

  const [scheduleForm, setScheduleForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    location: ""
  });

  const colors = [
    "#5B3FF9", "#7C3AED", "#F59E0B", "#10B981", "#EF4444", 
    "#3B82F6", "#8B5CF6", "#F97316", "#06B6D4", "#84CC16"
  ];

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || "",
        code: course.code || "",
        professor: course.professor || "",
        credits: course.credits || 3,
        color: course.color || "#5B3FF9",
        schedule: course.schedule || [],
        gradeCategories: course.gradeCategories || [
          { name: "Assignments", weight: 30, currentGrade: null },
          { name: "Exams", weight: 40, currentGrade: null },
          { name: "Participation", weight: 10, currentGrade: null },
          { name: "Final Project", weight: 20, currentGrade: null }
        ]
      });
    }
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.code.trim() || !formData.professor.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const totalWeight = formData.gradeCategories.reduce((sum, cat) => sum + cat.weight, 0);
    if (totalWeight !== 100) {
      toast.error("Grade category weights must total 100%");
      return;
    }

    onSubmit(formData);
  };

  const handleScheduleAdd = () => {
    if (!scheduleForm.dayOfWeek || !scheduleForm.startTime || !scheduleForm.endTime) {
      toast.error("Please fill in all schedule fields");
      return;
    }

    const newSchedule = { ...scheduleForm };
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, newSchedule]
    }));
    
    setScheduleForm({
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      location: ""
    });
  };

  const handleScheduleRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const handleGradeCategoryChange = (index, field, value) => {
    const updatedCategories = [...formData.gradeCategories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      [field]: field === "weight" ? parseInt(value) || 0 : value
    };
    
    setFormData(prev => ({
      ...prev,
      gradeCategories: updatedCategories
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Course Name *"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Introduction to Computer Science"
            required
          />
          
          <Input
            label="Course Code *"
            value={formData.code}
            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
            placeholder="e.g., CS 101"
            required
          />
          
          <Input
            label="Professor *"
            value={formData.professor}
            onChange={(e) => setFormData(prev => ({ ...prev, professor: e.target.value }))}
            placeholder="e.g., Dr. Smith"
            required
          />
          
          <Select
            label="Credits"
            value={formData.credits}
            onChange={(e) => setFormData(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
          >
            <option value={1}>1 Credit</option>
            <option value={2}>2 Credits</option>
            <option value={3}>3 Credits</option>
            <option value={4}>4 Credits</option>
            <option value={5}>5 Credits</option>
          </Select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Color
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full transition-transform duration-200 ${
                  formData.color === color ? 'scale-110 ring-2 ring-offset-2 ring-primary-500' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setFormData(prev => ({ ...prev, color }))}
              />
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <Select
            label="Day"
            value={scheduleForm.dayOfWeek}
            onChange={(e) => setScheduleForm(prev => ({ ...prev, dayOfWeek: e.target.value }))}
            placeholder="Select day"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </Select>
          
          <Input
            label="Start Time"
            type="time"
            value={scheduleForm.startTime}
            onChange={(e) => setScheduleForm(prev => ({ ...prev, startTime: e.target.value }))}
          />
          
          <Input
            label="End Time"
            type="time"
            value={scheduleForm.endTime}
            onChange={(e) => setScheduleForm(prev => ({ ...prev, endTime: e.target.value }))}
          />
          
          <Input
            label="Location"
            value={scheduleForm.location}
            onChange={(e) => setScheduleForm(prev => ({ ...prev, location: e.target.value }))}
            placeholder="e.g., Room 101"
          />
        </div>
        
        <Button
          type="button"
          variant="outline"
          icon="Plus"
          onClick={handleScheduleAdd}
          className="mb-4"
        >
          Add Schedule
        </Button>

        {formData.schedule.length > 0 && (
          <div className="space-y-2">
            {formData.schedule.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">
                  {schedule.dayOfWeek} {schedule.startTime} - {schedule.endTime}
                  {schedule.location && ` at ${schedule.location}`}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  icon="X"
                  onClick={() => handleScheduleRemove(index)}
                  className="text-error-600"
                />
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Categories</h3>
        
        <div className="space-y-3">
          {formData.gradeCategories.map((category, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Category Name"
                value={category.name}
                onChange={(e) => handleGradeCategoryChange(index, "name", e.target.value)}
                placeholder="e.g., Assignments"
              />
              <Input
                label="Weight (%)"
                type="number"
                min="0"
                max="100"
                value={category.weight}
                onChange={(e) => handleGradeCategoryChange(index, "weight", e.target.value)}
              />
              <Input
                label="Current Grade (%)"
                type="number"
                min="0"
                max="100"
                value={category.currentGrade || ""}
                onChange={(e) => handleGradeCategoryChange(index, "currentGrade", e.target.value ? parseFloat(e.target.value) : null)}
                placeholder="Enter when available"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Total Weight:</strong> {formData.gradeCategories.reduce((sum, cat) => sum + cat.weight, 0)}% 
            {formData.gradeCategories.reduce((sum, cat) => sum + cat.weight, 0) !== 100 && (
              <span className="text-error-600 ml-2">(Must equal 100%)</span>
            )}
          </p>
        </div>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" icon="Save">
          {course ? "Update Course" : "Create Course"}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;