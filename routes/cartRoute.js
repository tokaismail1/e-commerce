const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming this is where your auth middleware is

// Apply the auth middleware to all routes in this router
router.use(authMiddleware);

// Routes for the cart
router.get('/', cartController.getCart);                 // GET /api/cart?user_id=USER_ID
router.put('/add', cartController.addTocart); // PUT /api/users/:id/cart
router.post('/remove', cartController.removeFromCart);   // POST /api/cart/remove

module.exports = router;
