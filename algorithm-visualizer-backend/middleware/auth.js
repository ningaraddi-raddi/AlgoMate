const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // look in Authorization header or cookie
  const authHeader = req.header('Authorization');
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // payload we signed (id, email, name)
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
