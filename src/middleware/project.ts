import type { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/ProjectService";

declare global {
  namespace Express {
    interface Request {
      project: import("../models/project/Project").Project;
    }
  }
}

export function projectExists(projectService: ProjectService) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;

      const projectFound = await projectService.getProjectById(projectId);
      if (!projectFound) {
        res.status(404).json({ error: "Project not found" });
        return;
      }

      req.project = projectFound;
      next();
    } catch (error) {
      res.status(500).json({ error: "Ops! Error." });
    }
  };
}
