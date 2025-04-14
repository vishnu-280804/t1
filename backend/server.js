// backend/index.js
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from "path"

// Routes
import workerRoutes from './routes/workerRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = 'mongodb://localhost:27017/cooliemitra'

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(path.dirname(''), 'uploads')));


// Routes
app.use('/api/workers', workerRoutes)
app.use('/api/admin', adminRoutes)

// DB + Server Init
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
  })
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err)
})

app.post('/api/productivity/predict', async (req, res) => {
  const { avgSessionDuration, totalBreakTime } = req.body;

  if (avgSessionDuration == null || totalBreakTime == null) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    // Simulate a model prediction
    const productivity = (avgSessionDuration / 3600) - (totalBreakTime / 3600);
    
    res.json({ productivity });
  } catch (error) {
    console.error('Error in productivity prediction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
