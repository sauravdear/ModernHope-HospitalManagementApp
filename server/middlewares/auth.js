// middlewares/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {  // Remove the 'function' keyword, use arrow function
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Invalid token. Please login again.' 
    });
  }
};

module.exports = auth;