const mongoose = require('mongoose');

module.exports.categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    versionKey: false,
  },
);
