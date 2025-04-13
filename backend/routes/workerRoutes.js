import express from 'express';
import multer from 'multer';
import Worker from '../models/Worker.js';

const router = express.Router();

// Multer config for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

/**
 * @route   POST /api/workers/register
 * @desc    Register new worker with photo, username, password
 */
router.post('/register', upload.single('photo'), async (req, res) => {
  const { name, phone, username, password, skills } = req.body;
  const photo = req.file ? req.file.path : null;

  if (!name || !phone || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existing = await Worker.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const newWorker = new Worker({
      name,
      phone,
      username,
      password,
      skills: skills ? skills.split(',').map(s => s.trim()) : [],
      photo,
      isPaid: false,
      startTime: null,
      endTime: null,
      status: 'pending',
    });

    const saved = await newWorker.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register worker' });
  }
});

/**
 * @route   POST /api/workers/login
 * @desc    Login worker via username & password
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const worker = await Worker.findOne({ username, password });
    if (!worker) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', worker });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

/**
 * @route   GET /api/workers/getWorker
 * @desc    Get all workers (optional ?status=accepted/pending/rejected)
 */
router.get('/getWorker', async (req, res) => {
  try {
    const query = req.query.status ? { status: req.query.status } : {};
    const workers = await Worker.find(query);
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching workers' });
  }
});

/**
 * @route   POST /api/workers/:id/accept
 * @desc    Accept a worker
 */
router.post('/:id/accept', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: 'Error accepting worker' });
  }
});

/**
 * @route   POST /api/workers/:id/reject
 * @desc    Reject a worker
 */
router.post('/:id/reject', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: 'Error rejecting worker' });
  }
});

/**
 * @route   POST /api/workers/:id/start
 * @desc    Start work for worker
 */
router.post('/:id/start', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { startTime: new Date(), endTime: null },
      { new: true }
    );
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: 'Error starting work' });
  }
});

/**
 * @route   POST /api/workers/:id/stop
 * @desc    Stop work for worker
 */
router.post('/:id/stop', async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(
      req.params.id,
      { endTime: new Date() },
      { new: true }
    );
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: 'Error stopping work' });
  }
});

/**
 * @route   GET /api/workers/:id
 * @desc    Get single worker by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching worker' });
  }
});

export default router;
