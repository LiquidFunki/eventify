const ApiError = require('../utils/ApiError');

const { Comment, User, Event } = require('../models');

module.exports.createComment = async (eventId, comment) => {
  const temp = await Comment.create(comment).then(async (docCompany) => {
    await Event.findByIdAndUpdate(
      eventId,
      { $push: { comments: docCompany.id } },
      { new: true, useFindAndModify: false }
    );
    return docCompany;
  });
  return await Comment.findById(temp.id).populate({
    path: 'author',
    select: 'id fullName avatar',
  });
};

// Read all companies
module.exports.getAllComments = async (eventId) => {
  const comments = await Comment.find()
    .where('event')
    .equals(eventId)
    .populate({ path: 'author', select: 'id fullName avatar' });
  return comments;
};

// Update a company by ID
module.exports.updateComment = async (id, commentData) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw ApiError.NothingFoundError('Company not found');
  }
  Object.assign(comment, commentData);
  await comment.save();
  return comment;
};

// Delete a company by ID
module.exports.deleteComment = async (id) => {
  await Comment.findByIdAndDelete(id);
};
