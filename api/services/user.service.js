const ApiError = require('../utils/ApiError');

const userDto = require('../utils/userDto');
const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.find().select('id email avatar fullName');
  if (!users) {
    throw ApiError.NothingFoundError();
  }
  return users;
};

const getUser = async (id) => {
  const user = await User.findById(id)
    .select('id email avatar fullName createdAt')
    .populate({
      path: 'events',
      select: 'title description banner startEvent price categories attendees maxAttendees id',
      match: { isPublic: true },
    })
    .populate({
      path: 'companies',
      select: 'name description logoUrl',
      match: { isPublic: true },
    });
  if (!user) {
    throw ApiError.NothingFoundError();
  }
  return user;
};

const updateUser = async (data, id) => {
  const user = await User.findById(id);
  if (data.email && user.email !== data.email) {
    const candidate = await User.findOne().where('email').equals(data.email);
    if (candidate) {
      throw ApiError.BadRequestError(
        `User with email ${data.email} is already registered`,
      );
    }
  }

  user.email = data.email || user.email;
  user.fullName = data.fullName || user.full_name;
  user.avatar = data.avatar || user.avatar;
  await user.save();
  return userDto(user);
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
};
