const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assuming you have a User model

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token from header
  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secret'); // 'secret' should be your JWT secret key
    const user = await User.findById(decoded._id); // Find the user by decoded _id

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
