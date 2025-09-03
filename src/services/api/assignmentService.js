class AssignmentService {
  constructor() {
    this.tableName = 'assignment_c';
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
          {"field": {"Name": "title"}},
          {"field": {"Name": "description"}},
          {"field": {"Name": "dueDate"}},
          {"field": {"Name": "priority"}},
          {"field": {"Name": "completed"}},
          {"field": {"Name": "grade"}},
          {"field": {"Name": "courseId_c"}}
        ],
        orderBy: [{"fieldName": "dueDate", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch assignments:", response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching assignments:", error.message);
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "title"}},
          {"field": {"Name": "description"}},
          {"field": {"Name": "dueDate"}},
          {"field": {"Name": "priority"}},
          {"field": {"Name": "completed"}},
          {"field": {"Name": "grade"}},
          {"field": {"Name": "courseId_c"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error("Failed to fetch assignment:", response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching assignment ${id}:`, error.message);
      return null;
    }
  }

  async create(assignmentData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            title: assignmentData.title,
            description: assignmentData.description,
            dueDate: assignmentData.dueDate,
            priority: assignmentData.priority || "Medium",
            completed: assignmentData.completed || false,
            grade: assignmentData.grade,
            courseId_c: parseInt(assignmentData.courseId)
          }
        ]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to create assignment:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          console.error("Assignment creation failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      throw new Error("No result returned from create operation");
    } catch (error) {
      console.error("Error creating assignment:", error.message);
      throw error;
    }
  }

  async update(id, assignmentData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            title: assignmentData.title,
            description: assignmentData.description,
            dueDate: assignmentData.dueDate,
            priority: assignmentData.priority,
            completed: assignmentData.completed,
            grade: assignmentData.grade,
            courseId_c: parseInt(assignmentData.courseId)
          }
        ]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to update assignment:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          console.error("Assignment update failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      throw new Error("No result returned from update operation");
    } catch (error) {
      console.error("Error updating assignment:", error.message);
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
        console.error("Failed to delete assignment:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return true;
        } else {
          console.error("Assignment deletion failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting assignment:", error.message);
      throw error;
    }
  }
}

export const assignmentService = new AssignmentService();