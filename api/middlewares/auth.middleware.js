const ApiError = require('../utils/ApiError');
const tokenService = require('../services/token.service');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }
    const decoded = tokenService.validateAccessToken(token);
    if (!decoded) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = decoded;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
