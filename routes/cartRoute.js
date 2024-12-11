const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you have auth middleware to protect the routes



// Apply the auth middleware to all routes in this router
router.use(authMiddleware);

// Routes for the cart


router.post('/add', authMiddleware, cartController.addToCart);  // Add to cart
router.put('/remove', authMiddleware, cartController.removeFromCart);  // Remove from cart
router.get('/', authMiddleware, cartController.getCart);  // Get all products in the cart

module.exports = router;


module.exports = router;
