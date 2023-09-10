const mongoose = require('mongoose');

module.exports.promocodeSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);
