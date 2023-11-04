const jwt = require('jsonwebtoken');

// Middleware to check if the request has a valid token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err)
    if (err) {
      return res.status(403).json({ error: 'Access denied. Invalid token.' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
