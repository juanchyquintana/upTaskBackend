import { Types } from "mongoose";
import { Task } from "../models/tasks/Task";
import TaskModel from "../models/tasks/TaskSchema";

export class TaskService {
  // Create Method
  async createTask(task: Task): Promise<Task> {
    const newTask = await TaskModel.create({
      name: task.getName,
      description: task.getDescription,
      project: task.getProject,
      status: task.getStatus,
    });

    return new Task(
      newTask.name,
      newTask.description,
      newTask.project,
      newTask.id,
      newTask.status
    );
  }

  // Get All Method
  async getAllTasks(projectId: Types.ObjectId): Promise<Task[]> {
    const tasks = await TaskModel.find({ project: projectId }).populate(
      "project"
    );

    return tasks.map(
      (task) =>
        new Task(
          task.name,
          task.description,
          task.project,
          task.id,
          task.status
        )
    );
  }

  // Get by ID
  async getTaskById(id: string): Promise<Task | null> {
    const task = await TaskModel.findById(id);
    if (!task) {
      return null;
    }

    return new Task(
      task.name,
      task.description,
      task.project,
      task.id,
      task.status
    );
  }

  // Delete by ID
  async deleteTask(id: string): Promise<boolean> {
    const task = await TaskModel.findByIdAndDelete(id);
    await task.deleteOne();

    return task !== null;
  }

  // Update by ID
  async updateTask(id: string, taskUpdate: Task): Promise<Task | null> {
    const task = await TaskModel.findById(id);
    if (!task) {
      return null;
    }

    task.name = taskUpdate.getName;
    task.description = taskUpdate.getDescription;
    await task.save();

    return new Task(
      task.name,
      task.description,
      task.project,
      task.id,
      task.status
    );
  }

  // Update Status
  async updateTaskStatus(id: string, taskUpdate: Task['_status']): Promise<Task | null> {
    const task = await TaskModel.findById(id);
    if (!task) {
      return null;
    }

    task.status = taskUpdate;
    await task.save();

    return new Task(
      task.name,
      task.description,
      task.project,
      task.id,
      task.status
    );
  }
}
