const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Auth token required to access thin route',
    });
  }
  jwt.verify(req.headers.authorization, '00USER_JWT_TOKEN', (err, decoded) => {
    if (err) {
      res.status(401).json({
        status: 'ERROR',
        message: 'authentication fail',
      });
    }
    next();
  });
};
