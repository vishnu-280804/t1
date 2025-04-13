// backend/controllers/authController.js
import Worker from '../models/Worker.js';
import Admin from '../models/Admin.js';

// Admin Login
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Admin login successful', adminId: admin._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Worker Login
export const loginWorker = async (req, res) => {
  const { phone } = req.body;

  try {
    const worker = await Worker.findOne({ phone });

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    res.status(200).json({ message: 'Worker login successful', workerId: worker._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
