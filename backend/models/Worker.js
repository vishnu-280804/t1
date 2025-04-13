import mongoose from 'mongoose'

const workerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  username: { type: String, unique: true },
  password: String,
  skills: [String],
  photo: String,
  isPaid: Boolean,
  startTime: Date,
  endTime: Date,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const Worker = mongoose.model('Worker', workerSchema)

export default Worker