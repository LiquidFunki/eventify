const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const mailService = require('./mail.service');
const calendarService = require('./company.service');
const tokenService = require('./token.service');
const ApiError = require('../utils/ApiError');
const userDto = require('../utils/userDto');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require('../models');

const registration = async (email, password, repeatedPassword, fullName) => {
  if (password !== repeatedPassword) {
    throw ApiError.BadRequestError('Passwords don\'t match');
  }
  const emailCandidate = await User.findOne({ email });
  if (emailCandidate) {
    throw ApiError.BadRequestError(
      `User with email ${email} is already registered`,
    );
  }
  const hashPassword = await bcrypt.hash(password, 4);
  const user = await User.create({
    email,
    password: hashPassword,
    fullName,
    avatar: `https://robohash.org/${email}.png`,
  });
  mailService.sendGreeting(email);

  const tokens = tokenService.generateTokens(userDto(user));
  await tokenService.saveToken(user.id, tokens.refreshToken);

  return {
    ...tokens,
    ...userDto(user),
  };
};

const googleAuthorization = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  // console.log(payload);

  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    const tokens = tokenService.generateTokens(userDto(existingUser));
    await tokenService.saveToken(existingUser.id, tokens.refreshToken);
    return {
      ...tokens,
      ...userDto(existingUser),
    };
  }
  const user = await User.create({
    email: payload.email,
    password: 'google',
    fullName: payload.name,
    avatar: payload.picture,
  });
  mailService.sendGreeting(payload.email);

  const tokens = tokenService.generateTokens(userDto(user));
  await tokenService.saveToken(user.id, tokens.refreshToken);

  return {
    ...tokens,
    ...userDto(user),
  };
};

const mailAuthorization = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.BadRequestError(`Incorrect email`);
  }
  const isEqualsPswd = await bcrypt.compare(password, user.password);
  if (!isEqualsPswd) {
    throw ApiError.BadRequestError(`Incorrect password`);
  }

  const tokens = tokenService.generateTokens(userDto(user));
  await tokenService.saveToken(user.id, tokens.refreshToken);
  return {
    ...tokens,
    ...userDto(user),
  };
};

const refreshToken = async (Token) => {
  if (!Token) {
    throw ApiError.UnauthorizedError();
  }
  const userInfo = tokenService.validateRefreshToken(Token);
  const tokenFromDB = await tokenService.findToken(Token);
  if (!userInfo || !tokenFromDB) {
    throw ApiError.UnauthorizedError();
  }
  const user = await User.findById(userInfo.id);
  const tokens = tokenService.generateTokens(userDto(user));
  await tokenService.saveToken(user.id, tokens.refreshToken);

  return {
    ...tokens,
    ...userDto(user),
  };
};

const passwordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.BadRequestError(
      `User with email ${email} is not registered`,
    );
  }
  await mailService.sendPswResetMail(email);
};

const passwordConfirm = async (token, password, repeatedPassword) => {
  const userInfo = tokenService.validateAccessToken(token);
  const user = await User.findOne({ email: userInfo.email });
  if (!user) {
    throw ApiError.BadRequest('No user found');
  }
  if (password !== repeatedPassword) {
    throw ApiError.BadRequest('Passwords do not match');
  }
  const hashPassword = await bcrypt.hash(password, 4);
  user.password = hashPassword;
  await user.save();
};

module.exports = {
  registration,
  mailAuthorization,
  googleAuthorization,
  refreshToken,
  passwordReset,
  passwordConfirm,
};
