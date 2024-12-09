const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// Define register function
const register = asyncHandler(async (req, res) => {
    try {
        let newUser = new userModel(req.body);

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        newUser.password = hashedPassword;

        let createdUser = await newUser.save();
        res.json({ message: "User added successfully", user: createdUser });

    } catch (err) {
        console.error("Error registering user:", err);
        res.status(400).json({ message: "Error registering user", error: err.message });
    }
});

// Define login function
const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Successful login response
        const token = jwt.sign({ _id: user._id, name: user.name }, 'secret');
        res.status(200).json({ message: "User logged in", user: { name: user.name, email: user.email, token } });

    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
});

// Export the functions
module.exports = { register, login, updateProfile,changePassword };
