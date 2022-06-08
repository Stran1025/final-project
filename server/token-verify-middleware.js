const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  if (!req.headers['x-access-token']) {
    throw new ClientError(401, 'authentication required');
  }
  req.user = jwt.verify(req.headers['x-access-token'], process.env.TOKEN_SECRET);
  next();
}

module.exports = authorizationMiddleware;
