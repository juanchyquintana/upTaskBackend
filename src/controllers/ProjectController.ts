import { Request, Response } from "express";
import { ProjectService } from "../services/ProjectService";
import { Project } from "../models/project/Project";

export class ProjectController {
  constructor(private projectService: ProjectService) {}

  getAllProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectFounded = await this.projectService.getAllProjects();
      res.status(200).json(projectFounded);
    } catch (error) {
      res.status(500).json({ error: "Error to get all projects." });
    }
  };

  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const { projectName, clientName, description } = req.body;

      if (!projectName || !clientName || !description) {
        res.status(400).json({ error: "Missing Fields" });
        return;
      }

      const newProject = new Project(req.body);
      const project = await this.projectService.createProject(newProject);

      res.status(201).json({
        message: "Project created successfuly",
        project
      });
    } catch (error) {
      res.status(500).json({ error: "Error to create project." });
    }
  };

  getProjectById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const projectFounded = await this.projectService.getProjectById(id);

      if (!projectFounded) {
        res.status(400).json({ error: "Project not found" });
        return;
      }

      res.status(200).json(projectFounded);
    } catch (error) {
      res.status(500).json({ error: `Error to search the projects with id` });
    }
  };

  deleteProjectById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const projectFounded = await this.projectService.deleteProjectById(id);

      if (!projectFounded) {
        res.status(400).json({ error: "Project not found" });
        return;
      }

      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting project" });
    }
  };

  updateProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const updatedProject = new Project(req.body);
      const projectFounded = await this.projectService.updateProject(
        id,
        updatedProject
      );

      if (!projectFounded) {
        res.status(400).json({ error: "Project not found" });
        return;
      }

      res.status(200).json({
        message: "Project updated successfully",
        project: projectFounded
      });
    } catch (error) {
      res.status(500).json({ error: "Error deleting project" });
    }
  };
}
