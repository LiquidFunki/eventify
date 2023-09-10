const commentService = require('../services/comment.service');
const ApiError = require('../utils/ApiError');

// Отримати всі коментарі
module.exports.getComments = async (req, res, next) => {
  try {
    const comments = await commentService.getAllComments(req.params.eventId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// Створити новий коментар
module.exports.createComment = async (req, res, next) => {
  try {
    const comment = await commentService.createComment(req.params.id, {
      body: req.body.body,
      author: req.user.id,
      event: req.params.id,
    });
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

// Оновити коментар
module.exports.updateComment = async (req, res, next) => {
  try {
    const comment = await commentService.updateComment(req.params.id, req.body);
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

// Видалити коментар
module.exports.deleteComment = async (req, res, next) => {
  try {
    const result = await commentService.deleteComment(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
