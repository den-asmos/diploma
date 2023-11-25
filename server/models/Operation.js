const mongoose = require('mongoose');

const OperationSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Operation', OperationSchema);
