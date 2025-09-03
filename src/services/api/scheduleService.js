import schedulesData from "@/services/mockData/schedules.json";

class ScheduleService {
  constructor() {
    this.schedules = [...schedulesData];
  }

  async getAll() {
    await this.delay();
    return [...this.schedules];
  }

  async getById(id) {
    await this.delay();
    const schedule = this.schedules.find(schedule => schedule.Id === parseInt(id));
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    return { ...schedule };
  }

  async getByCourseId(courseId) {
    await this.delay();
    return this.schedules.filter(schedule => schedule.courseId === courseId);
  }

  async create(scheduleData) {
    await this.delay();
    const maxId = this.schedules.length > 0 ? Math.max(...this.schedules.map(s => s.Id)) : 0;
    const newSchedule = {
      Id: maxId + 1,
      ...scheduleData,
      createdAt: new Date().toISOString()
    };
    this.schedules.push(newSchedule);
    return { ...newSchedule };
  }

  async update(id, scheduleData) {
    await this.delay();
    const index = this.schedules.findIndex(schedule => schedule.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Schedule not found");
    }
    
    this.schedules[index] = {
      ...this.schedules[index],
      ...scheduleData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...this.schedules[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.schedules.findIndex(schedule => schedule.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Schedule not found");
    }
    
    this.schedules.splice(index, 1);
    return true;
  }

  delay(ms = Math.random() * 300 + 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const scheduleService = new ScheduleService();