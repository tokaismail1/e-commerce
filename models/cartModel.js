const mongoose = require('mongoose');

// Define the Cart schema
const cartSchema = new mongoose.Schema(
    {
    user_id: { type: String, required: true }, 
    items: [
        {
    //  name: {type : String},
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
    
}
]
});

// Create and export the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
