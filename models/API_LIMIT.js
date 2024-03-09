const mongoose = require('mongoose');

const apiLimitSchema = new mongoose.Schema({
  api: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('API_LIMIT', apiLimitSchema);
