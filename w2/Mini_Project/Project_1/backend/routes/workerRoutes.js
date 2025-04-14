import express from 'express'
import Worker from '../models/Worker.js'

const router = express.Router()

// Register a new worker
// POST /api/workers/register
router.post('/register', async (req, res) => {
  const { name, phone } = req.body

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' })
  }

  try {
    const newWorker = new Worker({
      name,
      phone,
      isPaid: false,
      startTime: null,
      endTime: null,
      status: 'pending',
    })

    const savedWorker = await newWorker.save()
    res.status(201).json(savedWorker)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to register worker' })
  }
})

// Get all workers, optionally filter by status
router.get('/getWorker', async (req, res) => {
  try {
    const { status } = req.query
    const query = status ? { status } : {}
    const workers = await Worker.find(query)
    res.json(workers)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching workers' })
  }
})

// Accept a worker
router.post('/:id/accept', async (req, res) => {
  const { id } = req.params
  try {
    const worker = await Worker.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true }
    )
    if (!worker) return res.status(404).json({ error: 'Worker not found' })
    res.json(worker)
  } catch (err) {
    res.status(500).json({ error: 'Error accepting worker' })
  }
})

// Reject a worker
router.post('/:id/reject', async (req, res) => {
  const { id } = req.params
  try {
    const worker = await Worker.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    )
    if (!worker) return res.status(404).json({ error: 'Worker not found' })
    res.json(worker)
  } catch (err) {
    res.status(500).json({ error: 'Error rejecting worker' })
  }
})

// Start work
router.post('/:id/start', async (req, res) => {
  const { id } = req.params
  try {
    const worker = await Worker.findByIdAndUpdate(
      id,
      { startTime: new Date(), endTime: null },
      { new: true }
    )
    if (!worker) return res.status(404).json({ error: 'Worker not found' })
    res.json(worker)
  } catch (err) {
    res.status(500).json({ error: 'Error starting work' })
  }
})

// Stop work
router.post('/:id/stop', async (req, res) => {
  const { id } = req.params
  try {
    const worker = await Worker.findByIdAndUpdate(
      id,
      { endTime: new Date() },
      { new: true }
    )
    if (!worker) return res.status(404).json({ error: 'Worker not found' })
    res.json(worker)
  } catch (err) {
    res.status(500).json({ error: 'Error stopping work' })
  }
})

// Get worker by ID (used for login)
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id)
    if (!worker) return res.status(404).json({ error: 'Worker not found' })
    res.json(worker)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching worker' })
  }
})

export default router