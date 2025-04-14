import mongoose from "mongoose"
// Define the Break schema
const breakSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
});

// Define the Work Session schema
const workSessionSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  breaks: [breakSchema],  // Array of break times for this session
});

// Define the Worker schema
const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  workHistory: [workSessionSchema],  // Array of work sessions
  avgSessionDuration: {
    type: Number,
    default: 0,
  },
});

const Worker = mongoose.model('Worker', workerSchema);

export default Worker;