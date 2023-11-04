const express = require('express');
const bodyParser = require('body-parser');
const { register, login, profile } = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const jsonParser = bodyParser.json();

// User registration route
router.post('/register', jsonParser, register);

// User login route
router.post('/login', jsonParser, login);

// Protected route (user profile)
router.get('/profile', authenticateToken, profile);

module.exports = router;
