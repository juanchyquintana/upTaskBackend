import { Types } from "mongoose";
import { TaskStatus } from "./TaskSchema";

export class Task {
  private _id?: Types.ObjectId;
  private _name: String;
  private _description: String;
  private _status: TaskStatus = "pending";
  private _project: Types.ObjectId;

  constructor(
    name: String,
    description: String,
    project?: Types.ObjectId,
    id?: Types.ObjectId,
    status: TaskStatus = "pending"
  ) {
    this._name = name;
    this._description = description;
    this._project = project;
    this._status = status;
    this._id = id;
  }

  get getId(): Types.ObjectId | undefined {
    return this._id;
  }

  get getName(): String {
    return this._name;
  }

  set setName(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("The name of task cannot be empty");
    }

    this._name = value.trim();
  }

  get getDescription(): String {
    return this._description;
  }

  set setDescription(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("The description of task cannot be empty");
    }

    this._description = value.trim();
  }

  get getStatus(): String {
    return this._status;
  }

  set setStatus(value: TaskStatus) {
    if (
      !["pending", "onHold", "inProgress", "underReview", "completed"].includes(
        value
      )
    ) {
      throw new Error("Invalid status");
    }
    this._status = value;
  }

  get getProject(): Types.ObjectId {
    return this._project;
  }

  set setProject(value: Types.ObjectId) {
    this._project = value;
  }

    toJSON() {
    return {
      _id: this._id,
      name: this.getName,
      description: this.getDescription,
      status: this.getStatus,
      project: this.getProject,
    };
  }
}
