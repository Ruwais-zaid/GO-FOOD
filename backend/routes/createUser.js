// routes/createUser.js
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();
const JWT_SECRET_KEY="jDwzJuwDP6WP4U1Dze5lJU4BhWvFHLlW"

router.post('/register', async (req, res) => {
  const { name, email, password, location } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
    });

    await newUser.save();

    const jwtSecret = JWT_SECRET_KEY;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1d' });

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        location: newUser.location,
      }
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
