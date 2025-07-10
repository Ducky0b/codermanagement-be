const { sendResponse, AppError } = require("../helpers/utils.js");
const User = require("../models/User.js");
const userControllers = {};
//Create
userControllers.createUser = async (req, res, next) => {
  const data = req.body;
  try {
    if (!data) throw new AppError(400, "Bad Request", "Create User Error");
    const created = await User.create(data);
    sendResponse(res, 200, true, created, null, "Create User Success");
  } catch (error) {
    next(error);
  }
};
//Update
//Get
userControllers.getAllUsers = async (req, res, next) => {
  const { name, role } = req.query;
  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }
  if (role) {
    filter.role = role;
  }
  try {
    const result = await User.find(filter);
    sendResponse(res, 200, true, result, null, "Found list of users success");
  } catch (error) {
    next(error);
  }
};
userControllers.searchEmployeeByName = async (req, res, next) => {
  const { name } = req.query;
  const filter = {
    name: { $regex: name, $options: "i" },
    role: "employee",
  };
  try {
    if (!name) {
      throw new AppError(
        400,
        "Name query is required",
        "Search Employee Error"
      );
    }
    const result = await User.find(filter);
    sendResponse(res, 200, true, result, null, "Search Employees Success");
  } catch (error) {
    next(error);
  }
};
userControllers.getSingleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findById(id);
    if (!result) {
      throw new AppError(404, "User not found", "Get Single User Error");
    }
    sendResponse(res, 200, true, result, null, "Found list of users success");
  } catch (error) {
    next(error);
  }
};
//Get task assigned
userControllers.getTasksByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.find({ assignedTo: id, isDeleted: false });
    sendResponse(res, 200, true, result, null, "Get Tasks for User Success");
  } catch (error) {
    next(error);
  }
};
//Delete
module.exports = userControllers;
