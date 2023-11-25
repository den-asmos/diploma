const Category = require('../models/Category');
const User = require('../models/User');

const addCategory = async (category) => {
  const newCategory = await Category.create(category);

  await User.findByIdAndUpdate(category.user, {
    $push: { categories: newCategory },
  });

  await newCategory.populate('user');

  return newCategory;
};

const editCategory = async (id, category) => {
  const newCategory = await Category.findByIdAndUpdate(id, category, {
    returnDocument: 'after',
  });

  return newCategory;
};

const deleteCategory = async (id, userId) => {
  await Category.deleteOne({ _id: id });

  await User.findByIdAndUpdate(userId, {
    $pull: { categories: id },
  });
};

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
};
