const { Router } = require('express');
const { body } = require('express-validator');
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();
// GET /comments - отримати всі коментарі
router.get('/:eventId', commentController.getComments);

// POST /comments - створити новий коментар
router.post(
  '/:id',
  authMiddleware,
  body('body').trim().notEmpty().withMessage('Body is required'),
  commentController.createComment
);

// PUT /comments/:id - оновити коментар
router.patch('/:id', authMiddleware, commentController.updateComment);

// DELETE /comments/:id - видалити коментар
router.delete('/:id', commentController.deleteComment);

module.exports = router;
