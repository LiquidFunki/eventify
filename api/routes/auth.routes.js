const { Router } = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = new Router();

router.post(
  '/register',
  body('email').trim().isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  body('repeatedPassword').isLength({ min: 6, max: 32 }),
  authController.registration,
);
router.post('/login', authController.mailAuthorization);
router.post('/google', authController.googleAuthorization);
router.post('/logout', authController.logout);
router.post('/password-reset', authController.passwordReset);
router.post(
  '/password-reset/:confirm_token',
  body('password').isLength({ min: 6, max: 32 }),
  body('repeatedPassword').isLength({ min: 6, max: 32 }),
  authController.passwordConfirm,
);
router.get('/refresh', authController.refreshToken);

module.exports = router;
