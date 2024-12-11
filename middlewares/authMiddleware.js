const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verify and decode the token with the secret key
    const decoded = jwt.verify(token, 'secret'); // 'secret' should be the same as used to sign the token
    console.log('Decoded Token:', decoded); // Log the decoded token for debugging

    // Attach decoded user info to request object
    req.user = decoded;  // Attach the user to the request object
    next();  // Continue to the next middleware or route handler
  } catch (error) {
    console.log('Token Error:', error); // Log the error if token verification fails
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
