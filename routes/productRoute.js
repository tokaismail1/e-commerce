const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Routes for products
router.get('/', productController.getProducts);           // GET /api/products
router.get('/:id', productController.getProductById);    // GET /api/products/:id
router.post('/add',productController.addProduct);
router.put('/:id', productController.updateProduct);    // GET /api/products/:id
router.delete('/:id',productController.deleteProduct);
module.exports = router;
