import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { TaskInterface } from "../tasks/TaskSchema";

export interface ProjectInterface extends Document {
  projectName: String;
  clientName: String;
  description: String;
  tasks: PopulatedDoc<TaskInterface & Document>[];
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      require: true,
      trim: true,
    },
    clientName: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model<ProjectInterface>("Project", ProjectSchema);
export default ProjectModel;
