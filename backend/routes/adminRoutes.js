// backend/routes/AdminRoutes.js

import express from 'express';

const router = express.Router();

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin123';
const ADMIN_PASSWORD = 'adminpass';

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({
      message: 'Login successful!',
      adminId: 'admin-001', // You can change this ID as needed
    });
  } else {
    return res.status(401).json({
      message: 'Invalid username or password',
    });
  }
});

export default router;
