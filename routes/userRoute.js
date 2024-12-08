const express = require('express'); 
const { param } = require('express-validator');



const { register, login } = require('../controllers/userController');



const router = express.Router();


router.post('/register', register);
router.post('/login', login);






module.exports = router;





