import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const tokenValue = token.split('Bearer ')[1];
  jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Expired' });
    }
    req.user = user;
    next();
  });
}

export default verifyToken;