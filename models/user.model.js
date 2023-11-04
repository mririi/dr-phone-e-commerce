const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware for hashing the password before saving to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


// Method to validate the user's password
userSchema.methods.validatePassword = async function (password) {
    try {
      const passwordMatch = await bcrypt.compare(password, this.password);
      return passwordMatch;
    } catch (error) {
      throw error;
    }
  };

module.exports = User = mongoose.model('User', userSchema);