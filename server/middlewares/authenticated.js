const { verifyToken } = require('../helpers/token');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const tokenData = verifyToken(req.cookies.token);
    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
      res.send({ error: 'Пользователь не найден' });

      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.send({ error: error.message || 'Token error' });
  }
};
