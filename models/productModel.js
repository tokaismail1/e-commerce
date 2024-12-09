const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock_quantity: { type: Number, default: 0 }
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
