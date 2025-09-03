class CourseService {
  constructor() {
    this.tableName = 'course_c';
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name"}},
          {"field": {"Name": "code"}},
          {"field": {"Name": "professor"}},
          {"field": {"Name": "credits"}},
          {"field": {"Name": "color"}},
          {"field": {"Name": "schedule"}},
          {"field": {"Name": "gradeCategories"}}
        ],
        orderBy: [{"fieldName": "name", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch courses:", response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name"}},
          {"field": {"Name": "code"}},
          {"field": {"Name": "professor"}},
          {"field": {"Name": "credits"}},
          {"field": {"Name": "color"}},
          {"field": {"Name": "schedule"}},
          {"field": {"Name": "gradeCategories"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error("Failed to fetch course:", response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error.message);
      return null;
    }
  }

  async create(courseData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            name: courseData.name,
            code: courseData.code,
            professor: courseData.professor,
            credits: courseData.credits,
            color: courseData.color || "#5B3FF9",
            schedule: JSON.stringify(courseData.schedule || []),
            gradeCategories: JSON.stringify(courseData.gradeCategories || [])
          }
        ]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to create course:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          console.error("Course creation failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      throw new Error("No result returned from create operation");
    } catch (error) {
      console.error("Error creating course:", error.message);
      throw error;
    }
  }

  async update(id, courseData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            name: courseData.name,
            code: courseData.code,
            professor: courseData.professor,
            credits: courseData.credits,
            color: courseData.color,
            schedule: JSON.stringify(courseData.schedule || []),
            gradeCategories: JSON.stringify(courseData.gradeCategories || [])
          }
        ]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to update course:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          console.error("Course update failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      throw new Error("No result returned from update operation");
    } catch (error) {
      console.error("Error updating course:", error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to delete course:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return true;
        } else {
          console.error("Course deletion failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting course:", error.message);
      throw error;
    }
  }
}

export const courseService = new CourseService();