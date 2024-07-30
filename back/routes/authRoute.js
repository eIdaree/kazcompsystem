const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');

router.post('/register', asyncHandler(async (req, res) => {
  const { fname, lname, password, phone_number, email, roles } = req.body;

  if (!fname || !lname || !phone_number || !email || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = { fname, lname, password: hashedPwd, email, phone_number, roles };

  try {
    const user = await User.create(userObject);
    res.status(201).json({ message: `New user ${user.email} created` });
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyValue.email) {
        return res.status(409).json({ message: 'Email already registered' });
      } else if (err.keyValue.phone_number) {
        return res.status(409).json({ message: 'Phone number already registered' });
      }
    }
    res.status(500).json({ message: 'An error occurred while creating the user', error: err.message });
  }
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const fname= user.fname
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful' , token , fname });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred during login', error: err.message });
  }
}));


module.exports = router;
