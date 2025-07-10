const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getSingleTaskById,
  assignTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/task.controllers");
const {
  validationCreateTask,
  validationObjectIdParam,
} = require("../middleware/task.validation");

/**
 * @route POST /api/tasks
 * @description Create a task
 */
router.post("/", validationCreateTask, createTask);

/**
 * @route GET /api/tasks
 * @description Browse tasks with optional filters and sort
 */
router.get("/", validationObjectIdParam, getAllTasks);

/**
 * @route GET /api/tasks/:id
 * @description Get single task by ID
 */
router.get("/:id", validationObjectIdParam, getSingleTaskById);

/**
 * @route PUT /api/tasks/:id/assign
 * @description Assign or unassign task to a user
 */
router.put("/:id/assign", validationObjectIdParam, assignTask);

/**
 * @route PATCH /api/tasks/:id/status
 * @description Update status of a task
 */
router.patch("/:id/status", validationObjectIdParam, updateTaskStatus);
/**
 * @route DELETE /api/tasks/:id
 * @description Soft delete task
 */
router.delete("/:id", validationObjectIdParam, deleteTask);
module.exports = router;
