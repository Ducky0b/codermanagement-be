const { sendResponse, AppError } = require("../helpers/utils.js");
const { validationResult } = require("express-validator");
const Task = require("../models/Task.js");
const taskControllers = {};

//Create
taskControllers.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw new AppError(
        400,
        "Validation failed",
        "Validation Error",
        errors.array()
      );

    const { name, description } = req.body;
    if (!name || !description) {
      throw new AppError(
        400,
        "Name and description are required",
        "Create Task Error"
      );
    }
    const result = await Task.create({ name, description });
    sendResponse(res, 201, true, result, null, "Create Task Success");
  } catch (error) {
    next(error);
  }
};
//GET
taskControllers.getAllTasks = async (req, res, next) => {
  try {
    const { name, status } = req.query;
    const filter = { isDeleted: false };
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }
    const result = await Task.find(filter).sort({ createdAt: -1 });
    sendResponse(res, 200, true, result, null, "Get Tasks Success");
  } catch (error) {
    next(error);
  }
};
taskControllers.getSingleTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Task.findById(id);
    sendResponse(res, 200, true, result, null, "Found list of tasks success");
  } catch (error) {
    next(error);
  }
};
taskControllers.assignTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const result = await Task.findById(id);
    result.assignedTo = userId || null;
    await result.save();
    sendResponse(res, 200, true, result, null, "Assign Task Success");
  } catch (error) {
    next(error);
  }
};
//UPDATE
taskControllers.updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await Task.findById(id);
    if (result.status === "done" && status !== "archive") {
      throw new AppError(
        400,
        "Cannot change status from 'done' unless to 'archive'",
        "Update Status Error"
      );
    }

    if (!result || result.isDeleted) {
      throw new AppError(404, "Task not found", "Update Status Error");
    }
    result.status = status;
    await result.save();
    const updated = await Task.findById(result._id).populate("assignedTo");
    sendResponse(
      res,
      200,
      true,
      updated,
      null,
      "Update Status of Task Success"
    );
  } catch (error) {
    next(error);
  }
};
//DELETE
taskControllers.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Task.findById(id);
    result.isDeleted = true;
    await result.save();
    sendResponse(res, 200, true, result, null, "Soft Delete Success");
  } catch (error) {
    next(error);
  }
};
module.exports = taskControllers;
