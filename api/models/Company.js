const mongoose = require('mongoose');

module.exports.companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    founded: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    location: {
      type: String,
      required: true,
    },
    logoUrl: String,
    websiteUrl: String,
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
  },
);
