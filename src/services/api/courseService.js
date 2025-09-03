import coursesData from "@/services/mockData/courses.json";

class CourseService {
  constructor() {
    this.courses = [...coursesData];
  }

  async getAll() {
    await this.delay();
    return [...this.courses];
  }

  async getById(id) {
    await this.delay();
    const course = this.courses.find(course => course.Id === parseInt(id));
    if (!course) {
      throw new Error("Course not found");
    }
    return { ...course };
  }

  async create(courseData) {
    await this.delay();
    const maxId = this.courses.length > 0 ? Math.max(...this.courses.map(c => c.Id)) : 0;
    const newCourse = {
      Id: maxId + 1,
      ...courseData,
      createdAt: new Date().toISOString()
    };
    this.courses.push(newCourse);
    return { ...newCourse };
  }

  async update(id, courseData) {
    await this.delay();
    const index = this.courses.findIndex(course => course.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Course not found");
    }
    
    this.courses[index] = {
      ...this.courses[index],
      ...courseData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...this.courses[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.courses.findIndex(course => course.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Course not found");
    }
    
    this.courses.splice(index, 1);
    return true;
  }

  delay(ms = Math.random() * 300 + 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const courseService = new CourseService();