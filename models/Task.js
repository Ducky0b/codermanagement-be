const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
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
      enum: ["pending", "working", "review", "done", "archive"],
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    assignedTo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
