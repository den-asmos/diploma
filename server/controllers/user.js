const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../helpers/token');

const register = async (name, login, email, password) => {
  if (!password) {
    throw new Error('Password is empty');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    login,
    email,
    password: passwordHash,
  });
  const token = generateToken({ id: user._id });

  return { user, token };
};

const login = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Неверный пароль');
  }

  const token = generateToken({ id: user._id });

  await user.populate(['operations', 'categories', 'accounts']);

  return { user, token };
};

const getInfo = async (id) => {
  return await User.findById(id).populate([
    'operations',
    'categories',
    'accounts',
  ]);
};

const update = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, {
    returnDocument: 'after',
  });
};

module.exports = {
  register,
  login,
  update,
  getInfo,
};
