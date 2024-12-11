// cartController.js
const Cart = require('../models/cartModel'); // Assuming Cart model is set up
const Product = require('../models/productModel'); // Assuming Product model is set up
const mongoose = require('mongoose');



exports.addToCart = async (req, res) => {
  const { productId } = req.body;  // productId from request body
  const userId = req.user._id;  // Use the decoded user ID  // Use the decoded user ID // userId from decoded JWT

  // Make sure userId exists
  if (!userId) {
    return res.status(400).json({ message: 'User ID missing' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create or update the cart
    let cart = await Cart.findOne({ user_id: userId });  // Check cart for this userId
    if (!cart) {
      cart = new Cart({
        user_id: userId,  // Ensure user_id is passed correctly
        items: [{ product_id: new mongoose.Types.ObjectId(productId), quantity: 1 }]
      });
    } else {
      const existingItemIndex = cart.items.findIndex(item => item.product_id.toString() === productId.toString());
      if (existingItemIndex === -1) {
        cart.items.push({ product_id: new mongoose.Types.ObjectId(productId), quantity: 1 });
      } else {
        cart.items[existingItemIndex].quantity += 1;
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // user ID from JWT

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product_id.toString() === productId.toString());
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // If quantity is more than 1, decrease the quantity, else remove the item
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);  // Remove the item from the cart
    }

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
};
// cartController.js
exports.getCart = async (req, res) => {
  const userId = req.user.id; // user ID from JWT

  try {
    let cart = await Cart.findOne({ userId }).populate('items.product_id');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Populate product details like name, price, etc.
    const cartItems = cart.items.map(item => ({
      product: item.product_id, // product details
      quantity: item.quantity,
    }));

    res.status(200).json({ message: 'Cart retrieved successfully', cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
  }
};
