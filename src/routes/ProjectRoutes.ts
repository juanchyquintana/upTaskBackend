import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectService } from "../services/ProjectService";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskService } from "../services/TaskService";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExist } from "../middleware/task";

const router = Router();

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

const taskService = new TaskService();
const taskController = new TaskController(taskService, projectService);

// Get all projects
router.get("/", projectController.getAllProjects);

// Get project by id
router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID not valid"),
  handleInputErrors,
  projectController.getProjectById
);

// Create a project
router.post(
  "/",
  body("projectName").notEmpty().withMessage("The name is required"),
  body("clientName").notEmpty().withMessage("The Client Name is required"),
  body("description").notEmpty().withMessage("The Description is required"),
  handleInputErrors,
  projectController.createProject
);

// Update a project
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID not valid"),
  body("projectName").notEmpty().withMessage("The name is required"),
  body("clientName").notEmpty().withMessage("The Client Name is required"),
  body("description").notEmpty().withMessage("The Description is required"),
  handleInputErrors,
  projectController.updateProject
);

// Delete a project
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID not valid"),
  handleInputErrors,
  projectController.deleteProjectById
);

/* Routes for taks */
router.param("projectId", projectExists(projectService));

// Create a Task
router.post(
  "/:projectId/tasks",
  body("projectName").notEmpty().withMessage("The name of Task is required"),
  body("description").notEmpty().withMessage("The Description of Task is required"),
  taskController.createTask
);

// Get all tasks
router.get(
  "/:projectId/tasks",
  taskController.getAllTasks
);

router.param('taskId', taskExist(taskService))
router.param('taskId', taskBelongsToProject)

// Get Task by id
router.get(
  "/:projectId/tasks/:taskId",
  taskController.getTaskById
);

// Update a Task
router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID not valid"),
  body("name").notEmpty().withMessage("The name is required"),
  body("description").notEmpty().withMessage("The Description is required"),
  handleInputErrors,
  taskController.updateTask
);

// Delete a tasks
router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID not valid"),
  handleInputErrors,
  taskController.deleteTaskById
);

// Updated the status of task
router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("ID not valid"),
  body('status').notEmpty().withMessage('The status is required'),
  handleInputErrors,
  taskController.updateTaskStatus
);

export default router;
