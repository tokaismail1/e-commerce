const Product = require('../models/productModel');
const slugify = require('slugify');


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


//update specific product
exports.updateProduct =async function(req,res){
    try{
        const {id} = req.params;
        const {price} = req.body;
        const {stock_quantity} = req.body;
        const product = await Product.findOneAndUpdate(
            { _id: id },
            {
              price: price,
              slug: slugify(price.toString()), // Create a slug for price
              stock_quantity: stock_quantity,
              stock_slug: slugify(stock_quantity.toString()) // Create a slug for stock_quantity
            },
            { new: true } // Return the updated document
          );
      

        if(!product){  
            // return res.status(404).json({ message: `No product found for ID: ${id}` });
            return next(new ApiError(`No product found for ID: ${id}` , 404))
            }
        res.json({data : product})
    }
    catch(err){
     
        console.log("ERROR",err)
        res.status(400).json({message:"something is wrong", err})
       
    }

};

//delete by id
exports.deleteProduct = async function(req,res){
    try{
        const {id} = req.params;
      
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            // return res.status(404).json({ message: `No category found for ID: ${id}` });
            return next(new ApiError(`No product found for ID: ${id}`, 404))
            
            }
           res.json({data : product , message : "product is removed"})
    }
    catch(err){
     
        console.log("ERROR",err)
        res.status(400).json({message:"something is wrong", err})
       
    }

};