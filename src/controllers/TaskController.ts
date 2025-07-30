import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";
import { ProjectService } from "../services/ProjectService";
import { Task } from "../models/tasks/Task";
import { Types } from "mongoose";

export class TaskController {
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = new Types.ObjectId(req.project.getId!);
      const tasks = await this.taskService.getAllTasks(projectId);

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error to get the task of projects" });
    }
  };

  createTask = async (req: Request, res: Response): Promise<void> => {
    const { name, description } = req.body;

    const projectId = req.project.getId!;
    const projectObjectId = new Types.ObjectId(projectId);

    try {
      if (!name || !description) {
        res.status(400).json({ error: "Missing Fields" });
        return;
      }

      const newTask = new Task(name, description, projectObjectId);
      const task = await this.taskService.createTask(newTask);

      await this.projectService.addTaskToProject(
        projectId.toString(),
        task.getId!.toString()
      );
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error to create task" });
    }
  };

  getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
      res.json(req.task);
    } catch (error) {
      res.status(500).json({ error: "Error to get the task of projects" });
    }
  };

  deleteTaskById = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;

    try {
      await Promise.allSettled([
        this.taskService.deleteTask(req.task.getId.toString()),
        this.projectService.removeTaskFromProject(
          req.project.getId.toString(),
          taskId
        ),
      ]);

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error to delete the task of projects" });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { name, description } = req.body;

    try {
      const updatedTask = new Task(name, description);
      const task = await this.taskService.updateTask(taskId, updatedTask);
      
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Error to update the task of projects" });
    }
  };

  updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { status } = req.body;

    try {
      const task = await this.taskService.updateTaskStatus(taskId, status);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Error to update the task of projects" });
    }
  };
}
