import { Project } from "../models/project/Project";
import ProjectModel from "../models/project/ProjectSchema";
import { Task } from "../models/tasks/Task";

type TaskDTO = {
  _id: string;
  name: string;
  description: string;
  status: string;
  project: string;
};

type ProjectDTO = {
  _id: string;
  projectName: string;
  clientName: string;
  description: string;
  tasks: TaskDTO[];
};

export class ProjectService {
  // Create Method
  async createProject(project: Project): Promise<Project> {
    const newProject = await ProjectModel.create({
      projectName: project.getProjectName,
      clientName: project.getClientName,
      description: project.getDescription,
    });

    return new Project({
      projectName: project.getProjectName,
      clientName: project.getClientName,
      description: project.getDescription,
      id: project.getId,
      tasks: [],
    });
  }

  // Get All Method
  async getAllProjects(): Promise<ProjectDTO[]> {
    const projects = await ProjectModel.find().populate("tasks");

    return projects.map((project) => ({
      _id: project._id.toString(),
      projectName: project.projectName.toString(),
      clientName: project.clientName.toString(),
      description: project.description.toString(),
      tasks: Array.isArray(project.tasks)
        ? project.tasks.map((task: any) => ({
            _id: task._id.toString(),
            name: task.name.toString(),
            description: task.description.toString(),
            status: task.status.toString(),
            project: task.project.toString(),
          }))
        : [],
    }));
  }

  // Get by ID
  async getProjectById(id: string): Promise<Project | null> {
    const project = await ProjectModel.findById(id).populate("tasks");
    if (!project) {
      return null;
    }

    const tasks = Array.isArray(project.tasks)
      ? project.tasks.map(
          (task: any) =>
            new Task(
              task.name,
              task.description,
              task.project,
              task.id,
              task.status
            )
        )
      : [];

    return new Project({
      projectName: project.projectName.toString(),
      clientName: project.clientName.toString(),
      description: project.description.toString(),
      id: project._id.toString(),
      tasks: [], // o tasks si querés incluirlas
    });
  }

  // Delete by ID
  async deleteProjectById(id: string): Promise<boolean> {
    const project = await ProjectModel.findById(id);
    await project.deleteOne();

    return project !== null;
  }

  // Update by ID
  async updateProject(
    id: string,
    projectToUpdate: Project
  ): Promise<Project | null> {
    const project = await ProjectModel.findById(id);
    if (!project) {
      return null;
    }

    project.projectName = projectToUpdate.getProjectName;
    project.clientName = projectToUpdate.getClientName;
    project.description = projectToUpdate.getDescription;
    await project.save();

    return new Project({
      projectName: project.projectName.toString(),
      clientName: project.clientName.toString(),
      description: project.description.toString(),
      id: project._id.toString(),
      tasks: [], 
    });
  }

  // Add Task into the project
  async addTaskToProject(projectId: string, taskId: string): Promise<void> {
    await ProjectModel.findByIdAndUpdate(projectId, {
      $push: { tasks: taskId },
    });
  }

  // Remove Task into the project
  async removeTaskFromProject(
    projectId: string,
    taskId: string
  ): Promise<void> {
    await ProjectModel.findByIdAndUpdate(projectId, {
      $pull: { tasks: taskId },
    });
  }
}
