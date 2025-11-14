// middlewares/auth.js
const jwt = require('jsonwebtoken');


// Add this in your auth middleware for debugging
const auth = (req, res, next) => {
  try {
    console.log('🔐 Auth Middleware - Checking token...');
    console.log('Authorization Header:', req.header('Authorization'));
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Extracted Token:',token);
    if (!token) {
      console.log('❌ No token found');
      return res.status(401).json({ 
        message: 'Access denied. No token provided.' 
      });
    }

    console.log('📝 Token found:', token);
    console.log('🔑 JWT Secret exists:', !!process.env.JWT_SECRET_KEY);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('✅ Token decoded successfully:', decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.log('❌ Token verification failed:', error.message);
    res.status(401).json({ 
      message: 'Invalid token. Please login again.',
      error: error.message 
    });
  }
};


// const auth = (req, res, next) => {  // Remove the 'function' keyword, use arrow function
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ 
//         message: 'Access denied. No token provided.' 
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ 
//       message: 'Invalid token. Please login again.' 
//     });
//   }
// };

module.exports = auth;