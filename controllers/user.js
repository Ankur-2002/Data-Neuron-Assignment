const Joi = require('joi');
const TodoModel = require('../models/Details');

const allTodos = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate(req.params);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const todos = await TodoModel.find({
      window: req.params.id,
    });
    return res.status(200).json({
      message: 'All users details',
      todos,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createNewTodo = async (req, res) => {
  try {
    const schema = Joi.object({
      text: Joi.string().required(),
      window: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const todo = new TodoModel({
      text: req.body.text,
      window: req.body.window,
    });
    await todo.save();
    return res.status(201).json({
      message: 'New user created',
      todo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await TodoModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      message: 'User details',
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTodoDetails = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
      text: Joi.string().required(),
    });

    const { error } = schema.validate({ ...req.params, ...req.body });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const details = await TodoModel.findByIdAndUpdate(req.params.id, {
      text: req.body.text,
    });

    if (!details) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({
      message: 'User details updated',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  allTodos,
  createNewTodo,
  getTodoById,
  updateTodoDetails,
};
