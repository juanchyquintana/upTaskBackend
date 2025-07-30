import { Types } from "mongoose";
import { Task } from "../tasks/Task";

export class Project {
  private _projectName: string;
  private _clientName: string;
  private _description: string;
  private _id?: Types.ObjectId;
  private _tasks?: Task[];

  constructor({
    projectName,
    clientName,
    description,
    id,
    tasks,
  }: {
    projectName: string;
    clientName: string;
    description: string;
    id?: string | Types.ObjectId;
    tasks?: Task[];
  }) {
    this._projectName = projectName;
    this._clientName = clientName;
    this._description = description;

    if (typeof id === "string") {
      this._id = new Types.ObjectId(id);
    } else if (id instanceof Types.ObjectId) {
      this._id = id;
    } else {
      this._id = undefined;
    }
    if (tasks) this._tasks = tasks;
  }

  get getProjectName(): string {
    return this._projectName;
  }

  set setProjectName(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Project name cannot be empty");
    }

    this._projectName = value.trim();
  }

  get getClientName(): string {
    return this._clientName;
  }

  set setClientName(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("The Client Name cannot be empty");
    }

    this._clientName = value.trim();
  }

  get getDescription(): string {
    return this._description;
  }

  set setDescription(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("The Description cannot be empty");
    }

    this._description = value.trim();
  }

  get getId(): Types.ObjectId | undefined {
    return this._id;
  }

  get getTaks(): Task[] {
    return this._tasks;
  }

  set setTaks(task: Task) {
    this._tasks.push(task);
  }

  toJSON() {
  return {
    _id: this._id,
    projectName: this.getProjectName,
    clientName: this.getClientName,
    description: this.getDescription,
    tasks: this._tasks,
  };
}
}
