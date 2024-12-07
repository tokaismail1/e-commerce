const express = require('express'); 
const { param } = require('express-validator');



const { postCategory } = require('../controllers/categoryController');
const { getCategories } = require('../controllers/categoryController');
const { getCategory } = require('../controllers/categoryController');
const { updateCategory } = require('../controllers/categoryController');
const { deleteCategory } = require('../controllers/categoryController');


const router = express.Router();

router.post('/' ,postCategory);

router.get('/' ,getCategories);

router.get('/' ,getCategory);

router.put('/:id' ,updateCategory);

router.delete('/:id' ,deleteCategory);



module.exports = router;





