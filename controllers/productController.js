const Product = require('../models/productModel');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products); // Send products as response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product' });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, price, description, stock_quantity } = req.body;

    // Validate the input
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    try {
        // Create a new product object
        const newProduct = new Product({
            name,
            price,
            description,
            stock_quantity
        });

        // Save the product to the database
        await newProduct.save();
        res.status(201).json(newProduct); // Return the created product
    } catch (err) {
        res.status(500).json({ message: 'Error adding product' });
    }
};
