import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface TaskInterface extends Document {
  name: String;
  description: String;
  status: TaskStatus;
  project: Types.ObjectId;
}

const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<TaskInterface>("Task", TaskSchema);

export default TaskModel;
