const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom-error');
const messages = require('../variables/messages');
const devSecret = require('../config/dev-secret');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let token = req.cookies.jwt;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '');
  }
  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecret);
    req.user = payload;
    next();
  } catch (err) {
    next(new CustomError(401, messages.authorizationRequired));
  }
};
