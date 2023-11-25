module.exports = (user) => {
  return {
    id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    operations: user.operations,
    accounts: user.accounts,
    categories: user.categories,
  };
};
