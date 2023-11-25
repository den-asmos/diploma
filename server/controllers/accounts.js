const Account = require('../models/Account');
const User = require('../models/User');

const addAccount = async (account) => {
  const newAccount = await Account.create(account);

  await User.findByIdAndUpdate(account.user, {
    $push: { accounts: newAccount },
  });

  await newAccount.populate('user');

  return newAccount;
};

const editAccount = async (id, account) => {
  const newAccount = await Account.findByIdAndUpdate(id, account, {
    returnDocument: 'after',
  });

  return newAccount;
};

const deleteAccount = async (id, userId) => {
  await Account.deleteOne({ _id: id });

  await User.findByIdAndUpdate(userId, {
    $pull: { accounts: id },
  });
};

module.exports = {
  addAccount,
  editAccount,
  deleteAccount,
};
