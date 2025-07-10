const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getSingleById,
  searchEmployeeByName,
  getTasksByUserId,
} = require("../controllers/user.controllers");
const { requireManager } = require("../middleware/auth");

/**
 * @route GET api/users
 * @description Get a list of users
 * @access private
 * @allowedQueries: name
 */
router.get("/", getAllUsers);
router.get("/search", searchEmployeeByName);
/**
 * @route GET api/users
 * @description Get tasks by user id
 * @access public
 */
router.get("/:id/tasks", getTasksByUserId);
/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access public
 */
router.get("/:id", getSingleById);
/**
 * @route POST api/users
 * @description Create a new user
 * @access private, manager
 * @requiredBody: name
 */
router.post("/", requireManager, createUser);

module.exports = router;
