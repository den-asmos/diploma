const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
  },
  operations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Operation',
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
