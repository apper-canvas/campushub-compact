class ScheduleService {
  constructor() {
    this.tableName = 'schedule_c';
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
          {"field": {"Name": "dayOfWeek"}},
          {"field": {"Name": "startTime"}},
          {"field": {"Name": "endTime"}},
          {"field": {"Name": "location"}},
          {"field": {"Name": "courseId_c"}}
        ],
        orderBy: [{"fieldName": "dayOfWeek", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch schedules:", response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching schedules:", error.message);
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "dayOfWeek"}},
          {"field": {"Name": "startTime"}},
          {"field": {"Name": "endTime"}},
          {"field": {"Name": "location"}},
          {"field": {"Name": "courseId_c"}}
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error("Failed to fetch schedule:", response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching schedule ${id}:`, error.message);
      return null;
    }
  }

  async getByCourseId(courseId) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "dayOfWeek"}},
          {"field": {"Name": "startTime"}},
          {"field": {"Name": "endTime"}},
          {"field": {"Name": "location"}},
          {"field": {"Name": "courseId_c"}}
        ],
        where: [{"FieldName": "courseId_c", "Operator": "EqualTo", "Values": [parseInt(courseId)]}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch schedules by course:", response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching schedules by course:", error.message);
      return [];
    }
  }

  async create(scheduleData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            dayOfWeek: scheduleData.dayOfWeek,
            startTime: scheduleData.startTime,
            endTime: scheduleData.endTime,
            location: scheduleData.location,
            courseId_c: parseInt(scheduleData.courseId)
          }
        ]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to create schedule:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          console.error("Schedule creation failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      throw new Error("No result returned from create operation");
    } catch (error) {
      console.error("Error creating schedule:", error.message);
      throw error;
    }
  }

  async update(id, scheduleData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            dayOfWeek: scheduleData.dayOfWeek,
            startTime: scheduleData.startTime,
            endTime: scheduleData.endTime,
            location: scheduleData.location,
            courseId_c: parseInt(scheduleData.courseId)
          }
        ]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to update schedule:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          console.error("Schedule update failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      throw new Error("No result returned from update operation");
    } catch (error) {
      console.error("Error updating schedule:", error.message);
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
        console.error("Failed to delete schedule:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return true;
        } else {
          console.error("Schedule deletion failed:", result.message);
          throw new Error(result.message);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting schedule:", error.message);
      throw error;
    }
  }
}

export const scheduleService = new ScheduleService();