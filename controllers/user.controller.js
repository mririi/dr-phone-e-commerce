const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Create a new user
const register = async(req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'email already exists' });
    }

    // Create a new User document
    const newUser = new User({ email, password });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// Authenticate a user
const login = async(req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Validate the password
      const passwordMatch = await user.validatePassword(password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // If the credentials are valid, create and return a JWT
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      });
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

const profile = async(req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { register, login, profile };
