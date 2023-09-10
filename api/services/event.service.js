const mongoose = require('mongoose');
const {
  Event, User, Category, Company
} = require('../models');
const ApiError = require('../utils/ApiError');

const createEvent = async (companyId, event) => {
  const company = await Company.findById(companyId);
  if (!company) {
    throw ApiError.BadRequestError('no such company found');
  }
  const createdEvent = await Event.create(event).then(async (docEvent) => {
    await Company.findByIdAndUpdate(
      companyId,
      { $push: { events: docEvent.id } },
      { new: true, useFindAndModify: false }
    );
    return docEvent;
  });
  return createdEvent;
};

const updateEvent = async (authorId, eventId, eventData) => {
  const event = await Event.findById(eventId).populate({
    path: 'organizer',
    select: 'owner',
  });
  if (!event) {
    throw ApiError.BadRequestError('no such event found');
  }
  if (event.organizer.owner.toString() !== authorId) {
    throw ApiError.ForbiddenError();
  }
  Object.assign(event, eventData);
  await event.save();
  return event;
};

const getAllCompanyEvents = async (companyId) => {
  const events = await Event.find()
    .where('organizer')
    .equals(companyId)
    .populate({ path: 'categories', select: 'id name' });
  return events;
};

const getMyEvents = async (userId) => {
  const events = await Event.find({ attendees: userId }).populate({
    path: 'categories',
    select: 'id name',
  });
  return events;
};

const getAllEvents = async () => {
  const events = await Event.find().populate({
    path: 'categories',
    select: 'id name',
    match: { isPublic: true },
  });
  return events;
};

const getCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

const getTodayEvents = async (userId) => {
  const todayDate = new Date();
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const events = await Event.find({
    startEvent: {
      $gte: new Date(
        todayDate.getUTCFullYear(),
        todayDate.getUTCMonth(),
        todayDate.getUTCDate()
      ),
      $lt: new Date(
        tomorrowDate.getUTCFullYear(),
        tomorrowDate.getUTCMonth(),
        tomorrowDate.getUTCDate()
      ),
    },
  })
    .where('attendees')
    .equals(userId)
    .populate({ path: 'categories', select: 'id name' });
  if (!events) {
    throw ApiError.NothingFoundError('no events found');
  }
  return events;
};

const getEventById = async (id) => {
  const event = await Event.findById(id)
    .populate({
      path: 'categories',
      select: 'id name description',
    })
    .populate({
      path: 'attendees',
      select: 'id fullName avatar',
    })
    .populate({
      path: 'organizer',
      select: 'id name logoUrl owner',
    });
  if (!event) {
    return null;
  }
  return event;
};

const subscribeEvent = async (userId, eventId) => {
  const candidate = await Event.findById(eventId);
  if (!candidate) {
    throw ApiError.BadRequestError('Wrong event`s id');
  }
  if (candidate.attendees.includes(userId)) {
    throw ApiError.BadRequestError('You have already subscribed this event');
  }
  if (candidate.attendees.length === candidate.maxAttendees) {
    throw ApiError.BadRequestError(
      'There are no available seats for this event'
    );
  }
  const event = await Event.findByIdAndUpdate(
    eventId,
    {
      $push: { attendees: userId },
    },
    { new: true, useFindAndModify: false }
  );
  await User.findByIdAndUpdate(
    userId,
    { $push: { events: event.id } },
    { new: true, useFindAndModify: false }
  );
  return event;
};

const unsubscribeEvent = async (userId, eventId) => {
  const candidate = await Event.findById(eventId);
  if (!candidate) {
    throw ApiError.BadRequestError('Wrong event`s id');
  }
  if (!candidate.attendees.includes(userId)) {
    throw ApiError.BadRequestError('You do not subscribed this event');
  }
  const event = await Event.findByIdAndUpdate(
    eventId,
    {
      $pull: { attendees: userId },
    },
    { new: true, useFindAndModify: false }
  );
  await User.findByIdAndUpdate(
    userId,
    { $pull: { events: event.id } },
    { new: true, useFindAndModify: false }
  );
  return event;
};

const deleteEvent = async (userId, eventId) => {
  const event = await Event.findById(eventId).populate({
    path: 'organizer',
    select: 'owner',
  });
  if (!event) {
    throw ApiError.BadRequestError('Event does not exist');
  }
  if (event.organizer.owner.toString() !== userId) {
    throw ApiError.ForbiddenError();
  }
  event.delete();
};

module.exports = {
  createEvent,
  updateEvent,
  getAllEvents,
  getAllCompanyEvents,
  getMyEvents,
  getTodayEvents,
  getCategories,
  getEventById,
  deleteEvent,
  subscribeEvent,
  unsubscribeEvent,
};
