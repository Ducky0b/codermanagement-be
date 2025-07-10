const { body, param } = require("express-validator");

const validationCreateTask = [
  body("name", "Name is required")
    .exists()
    .isString()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must only contain letters"),
  body("description", "Description is required").exists().isString(),
];

const validationObjectIdParam = [
  param("id", "Invalid Mongo ID").exists().isMongoId(),
];
module.exports = { validationCreateTask, validationObjectIdParam };
