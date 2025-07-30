import type { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/TaskService";

declare global {
  namespace Express {
    interface Request {
      task: import("../models/tasks/Task").Task;
    }
  }
}

export function taskExist(taskService: TaskService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const taskFound = await taskService.getTaskById(taskId);
      if (!taskFound) {
        res.status(400).json({ error: "Task not found" });
        return;
      }

      req.task = taskFound;
      
      next();
    } catch (error) {
      res.status(500).json({ error: "Ops! Error." });
    }
  };
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
      if (req.task.getProject.toString() !== req.project.getId.toString()) {
        res.status(400).json({ error: "Action not valid!" });
        return;
      }

      next();
  };
