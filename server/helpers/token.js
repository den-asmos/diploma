const jwt = require('jsonwebtoken');
const sign = process.env.JWT_SECRET;

const generateToken = (data) => {
  return jwt.sign(data, sign, { expiresIn: '30d' });
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error('Invalid token');
  }
  return jwt.verify(token, sign);
};

module.exports = { generateToken, verifyToken };
