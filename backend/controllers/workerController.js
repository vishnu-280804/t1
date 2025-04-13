import Worker from '../models/Worker.js'

export const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find()
    res.json(workers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createWorker = async (req, res) => {
    const { name, phone } = req.body
    try {
      const worker = new Worker({ name, phone })
      await worker.save()
      res.status(201).json(worker)
    } catch (err) {
      res.status(500).json({ error: 'Server error' })
    }
  }
  

 // Start work
 export const startWork = async (req, res) => {
    try {
      const worker = await Worker.findByIdAndUpdate(
        req.params.id,
        { startTime: new Date() },
        { new: true }
      );
      res.json(worker);
    } catch (err) {
      res.status(500).json({ error: 'Error starting work' });
    }
  };
  
  export const stopWork = async (req, res) => {
    try {
      const worker = await Worker.findByIdAndUpdate(
        req.params.id,
        { endTime: new Date() },
        { new: true }
      );
      res.json(worker);
    } catch (err) {
      res.status(500).json({ error: 'Error stopping work' });
    }
  };
  

export const markPaid = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id)
    worker.isPaid = true
    await worker.save()
    res.json(worker)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
