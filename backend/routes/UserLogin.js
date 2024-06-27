// routes/UserLogin.js
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();
const JWT_SECRET_KEY="jDwzJuwDP6WP4U1Dze5lJU4BhWvFHLlW"

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }
    const jwtSecret = JWT_SECRET_KEY;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
