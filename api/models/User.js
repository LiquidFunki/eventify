const mongoose = require('mongoose');

module.exports.userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'default.png',
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    companies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
      },
    ],
  },
  {
    versionKey: false,
  },
);
