import mongoose from 'mongoose'

const workerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  isPaid: { type: Boolean, default: false },
  startTime: { type: Date, default: null },
  endTime: { type: Date, default: null },
  status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'] },
})

const Worker = mongoose.model('Worker', workerSchema)

export default Worker