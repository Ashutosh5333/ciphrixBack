const Task = require("../models/Task");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    const { title, description, status } = req.body;
    const task = new Task({
      title,
      description,
      status: status || "pending",
      createdBy: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array()[0].msg });

    const { id } = req.params;
    const update = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to edit" });
    }

    Object.assign(task, update);
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Admin-only is already handled in requireAdmin middleware
    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("createdBy", "name email");
    if (!task) return res.status(404).json({ message: "Task not found" });

    // normal users can only access their own task
    if (
      req.user.role !== "admin" &&
      task.createdBy._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to view" });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.listTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const status = req.query.status;
    const search = req.query.search;

    const filter = {};
    if (status) filter.status = status;
    if (search) filter.title = new RegExp(search, "i");

    if (req.user.role !== "admin") {
      filter.createdBy = req.user._id;
    }

    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "name email"),
      Task.countDocuments(filter),
    ]);

    res.json({
      tasks,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};
