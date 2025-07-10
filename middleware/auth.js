const { AppError } = require("../helpers/utils");

const requireManager = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== "manager")
    throw new AppError(
      403,
      "Forbidden",
      "Only managers can perform this action"
    );
  next();
};

module.exports = { requireManager };
