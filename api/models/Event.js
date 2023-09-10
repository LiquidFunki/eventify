const mongoose = require('mongoose');

module.exports.eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      default:
        'https://www.seekpng.com/png/detail/125-1257164_search-event-fiesta-icon-png.png',
    },
    location: {
      type: String,
      required: true,
    },
    startEvent: {
      type: Date,
      require: true,
    },
    endEvent: {
      type: Date,
      require: true,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    isPerformed: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    maxAttendees: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
