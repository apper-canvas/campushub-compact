import assignmentsData from "@/services/mockData/assignments.json";

class AssignmentService {
  constructor() {
    this.assignments = [...assignmentsData];
  }

  async getAll() {
    await this.delay();
    return [...this.assignments];
  }

  async getById(id) {
    await this.delay();
    const assignment = this.assignments.find(assignment => assignment.Id === parseInt(id));
    if (!assignment) {
      throw new Error("Assignment not found");
    }
    return { ...assignment };
  }

  async create(assignmentData) {
    await this.delay();
    const maxId = this.assignments.length > 0 ? Math.max(...this.assignments.map(a => a.Id)) : 0;
    const newAssignment = {
      Id: maxId + 1,
      ...assignmentData,
      createdAt: new Date().toISOString()
    };
    this.assignments.push(newAssignment);
    return { ...newAssignment };
  }

  async update(id, assignmentData) {
    await this.delay();
    const index = this.assignments.findIndex(assignment => assignment.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Assignment not found");
    }
    
    this.assignments[index] = {
      ...this.assignments[index],
      ...assignmentData,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    
    return { ...this.assignments[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.assignments.findIndex(assignment => assignment.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Assignment not found");
    }
    
    this.assignments.splice(index, 1);
    return true;
  }

  delay(ms = Math.random() * 300 + 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const assignmentService = new AssignmentService();