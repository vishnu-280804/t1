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
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });

    // If a session is already running, stop it first
    const hasActiveSession = worker.workHistory.some(s => !s.endTime);
    if (hasActiveSession) return res.status(400).json({ error: 'Active session already running' });

    // Start new session
    worker.workHistory.push({ startTime: new Date(), breaks: [] });
    await worker.save();

    res.status(200).json(worker.workHistory[worker.workHistory.length - 1]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to start session' });
  }
});

/**
 * @route   POST /api/workers/:id/stop
 * @desc    Stop work for worker
 */
router.post('/:id/session/stop', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(400).json({ message: 'Worker not found' });

    // Find the index of the ongoing session
    const sessionIndex = worker.workHistory.findIndex(s => !s.endTime);
    if (sessionIndex === -1) {
      return res.status(400).json({ message: 'No ongoing session found' });
    }

    const session = worker.workHistory[sessionIndex];

    // Stop the session
    session.endTime = new Date();

    // Calculate total work time
    const totalWorkTime = session.endTime - session.startTime;

    // Calculate total break time
    const totalBreakTime = session.breaks.reduce((total, brk) => {
      if (brk.startTime && brk.endTime) {
        return total + (new Date(brk.endTime) - new Date(brk.startTime));
      }
      return total;
    }, 0);

    // Calculate session duration (excluding breaks)
    const sessionDuration = totalWorkTime - totalBreakTime;
    const avgSessionDuration = sessionDuration / 1000; // in seconds

    // Update fields
    worker.avgSessionDuration = avgSessionDuration;
    worker.duration = totalWorkTime;

    // IMPORTANT: Mark the workHistory field as modified so Mongoose knows it changed
    worker.markModified('workHistory');

    // Save the worker document
    await worker.save();

    res.json({
      message: 'Work session stopped',
      worker
    });

  } catch (err) {
    console.error('Error stopping session:', err);
    res.status(500).json({ message: 'Server error' });
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

/**
 * @route   POST /api/workers/:id/break/start
 * @desc    Start break for worker
 */
router.post('/:id/break/start', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(400).json({ message: 'Worker not found' });

    const session = worker.workHistory.find(s => !s.endTime); // ongoing session
    if (!session) return res.status(400).json({ message: 'No ongoing session found' });

    // Start the break
    const breakStartTime = new Date();
    session.breaks.push({ startTime: breakStartTime });

    // Update session's working duration excluding breaks
    const workStartTime = session.startTime;
    const totalWorkTime = (session.endTime ? session.endTime : breakStartTime) - workStartTime;

    // Calculate total break time
    const totalBreakTime = session.breaks.reduce((total, brk) => {
      if (brk.endTime) {
        return total + (brk.endTime - brk.startTime);
      }
      return total;
    }, 0);

    const sessionDuration = totalWorkTime - totalBreakTime;
    const avgSessionDuration = sessionDuration / 1000;  // in seconds

    // Update the worker's avgSessionDuration
    worker.avgSessionDuration = avgSessionDuration;

    // Save the worker's session and update avgSessionDuration
    await worker.save();

    res.json({ message: 'Break started', worker });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/workers/:id/break/stop
 * @desc    Stop break for worker
 */
router.post('/:id/break/stop', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).send('Worker not found.');

    // Find ongoing session and active break
    const session = worker.workHistory.find(s => !s.endTime);
    if (!session) return res.status(400).send('No ongoing session found.');

    const activeBreak = session.breaks.find(b => !b.endTime);
    if (!activeBreak) return res.status(400).send('No active break found.');

    // End the break
    activeBreak.endTime = new Date();
    await worker.save();

    res.json({ message: 'Break ended', session });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/**
 * @route   GET /api/workers/:id/session/status
 * @desc    Get session status (working or on break)
 */
router.get('/:id/session/status', async (req, res) => {
  const worker = await Worker.findById(req.params.id);
  if (!worker) return res.status(404).json({ error: 'Worker not found' });

  const session = worker.workHistory.find(s => !s.endTime);
  const activeBreak = session?.breaks.find(b => !b.endTime);

  res.json({
    isWorking: !!session,
    isOnBreak: !!activeBreak,
    currentSession: session || null,
  });
});

export default router;
