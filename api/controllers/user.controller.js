const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');

const allUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const userById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const user = await userService.updateUser(req.body, req.user.id);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  allUsers,
  userById,
  userUpdate,
};
