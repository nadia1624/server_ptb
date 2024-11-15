const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authToken');
const { login } = require('../controllers/authController');

// Route untuk login
router.post('/login', login);

// Route yang dilindungi, membutuhkan autentikasi token
router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: "Access granted to protected route", user: req.user });
});

module.exports = router;
