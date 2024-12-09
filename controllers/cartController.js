const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Assuming you have a Product model


exports.addTocart = async (req, res) => {
  const { productId } = req.body;  // productId is expected as a string
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create or update the cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ product_id: mongoose.Types.ObjectId(productId), quantity: 1 }]
      });
    } else {
      const existingItemIndex = cart.items.findIndex(item => item.product_id.toString() === productId.toString());
      if (existingItemIndex === -1) {
        cart.items.push({ product_id: mongoose.Types.ObjectId(productId), quantity: 1 });
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
  const userId = req.user.id; 

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'cart not found' });
    }

    
    const index = cart.products.indexOf(productId);
    if (index !== -1) {
      cart.products.splice(index, 1);
    } else {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from  cart' });
  }
};


exports.getCart = async (req, res) => {
  const userId = req.user.id; 

  try {
    const cart = await Cart.findOne({ userId }).populate('products');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
};
