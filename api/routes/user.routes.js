const { Router } = require('express');
const { body } = require('express-validator');
const authMdw = require('../middlewares/auth.middleware');
const usersController = require('../controllers/user.controller');

const router = new Router();

router.get('/', usersController.allUsers);
router.get('/:id', usersController.userById);
router.patch(
  '/',
  body('email').trim().isEmail(),
  body('login').trim().isLength({ min: 3, max: 30 }),
  body('fullName').trim().isLength({ min: 3, max: 30 }),
  authMdw,
  usersController.userUpdate,
);

module.exports = router;
