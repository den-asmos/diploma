const Operation = require('../models/Operation');
const User = require('../models/User');

const addOperation = async (operation) => {
  const newOperation = await Operation.create(operation);

  await User.findByIdAndUpdate(operation.user, {
    $push: { operations: newOperation },
  });

  await newOperation.populate('user');

  return newOperation;
};

const editOperation = async (id, operation) => {
  const newOperation = await Operation.findByIdAndUpdate(id, operation, {
    returnDocument: 'after',
  });

  return newOperation;
};

const deleteOperation = async (id, userId) => {
  await Operation.deleteOne({ _id: id });

  await User.findByIdAndUpdate(userId, {
    $pull: { operations: id },
  });
};

const getOperationsList = async (limit = 10, page = 1, userId) => {
  const [operations, count] = await Promise.all([
    Operation.find({ user: userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ date: -1 }),
    Operation.countDocuments({}),
  ]);

  return { operations, lastPage: Math.ceil(count / limit) };
};

const getOperation = (id) => {
  return Operation.findById(id);
};

module.exports = {
  addOperation,
  getOperation,
  getOperationsList,
  editOperation,
  deleteOperation,
};
