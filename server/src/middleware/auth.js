const jwt = require('jsonwebtoken');

function authMiddleware(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
  } catch (_error) {
    req.user = null;
  }

  next();
}

module.exports = authMiddleware;
