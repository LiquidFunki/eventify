const { validationResult } = require('express-validator');

const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');
const ApiError = require('../utils/ApiError');

const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const {
      email,
      password,
      repeatedPassword,
      fullName,
    } = req.body;
    const userData = await authService.registration(
      email,
      password,
      repeatedPassword,
      fullName,
    );
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.json({ ...userData, refreshToken: undefined });
  } catch (err) {
    next(err);
  }
};

const googleAuthorization = async (req, res, next) => {
  try {
    const { token } = req.body;
    const userData = await authService.googleAuthorization(token);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.json({ ...userData, refreshToken: undefined });
  } catch (err) {
    next(err);
  }
};

const mailAuthorization = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.mailAuthorization(email, password);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.json({ ...userData, refreshToken: undefined });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await tokenService.removeToken(refreshToken);

    res.clearCookie('refreshToken');
    return res.status(204).json('OK');
  } catch (err) {
    next(err);
  }
};

const passwordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.passwordReset(email);
    res.status(204).json({ message: 'The link has been sent to your email' });
  } catch (err) {
    next(err);
  }
};

const passwordConfirm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequestError('validation error', errors.array()));
    }
    const token = req.params.confirm_token;
    const { password, repeatedPassword } = req.body;
    await authService.passwordConfirm(token, password, repeatedPassword);
    res.status(204).json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const userData = await authService.refreshToken(req.cookies.refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 3600 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(200).json({ ...userData, refreshToken: undefined });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registration,
  mailAuthorization,
  googleAuthorization,
  logout,
  passwordReset,
  passwordConfirm,
  refreshToken,
};
