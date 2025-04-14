// frontend/src/pages/WorkerPage.jsx
import React, { useState } from 'react';

const WorkerPage = () => {
  const [started, setStarted] = useState(false);
  const workerId = localStorage.getItem('workerId');

  const handleStart = async () => {
    try {
      await fetch(`http://localhost:5000/api/workers/${workerId}/start`, { method: 'POST' });
      setStarted(true);
    } catch (err) {
      console.error('Start error', err);
    }
  };

  const handleStop = async () => {
    try {
      await fetch(`http://localhost:5000/api/workers/${workerId}/stop`, { method: 'POST' });
      setStarted(false);
    } catch (err) {
      console.error('Stop error', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 shadow-md rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Work Session</h2>
        <button
          onClick={started ? handleStop : handleStart}
          className={`w-full py-2 text-white rounded ${started ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {started ? 'Stop Work' : 'Start Work'}
        </button>
      </div>
    </div>
  );
};

export default WorkerPage;
