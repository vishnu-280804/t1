import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const WorkerProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0); // Time in seconds
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    // Fetch worker profile
    axios
      .get(`http://localhost:5000/api/workers/${id}`)
      .then((res) => setWorker(res.data))
      .catch((err) => toast.error('Failed to fetch worker profile'));

    // If worker has an ongoing session, initialize timer
    const ongoingSession = worker?.workHistory?.find((session) => !session.endTime);
    if (ongoingSession) {
      setIsWorking(true);
      setCurrentSession(ongoingSession);
      setSessionTime(Math.floor((Date.now() - new Date(ongoingSession.startTime)) / 1000));
    }
  }, [id, worker]);

  useEffect(() => {
    let interval;
    if (isWorking && currentSession) {
      interval = setInterval(() => {
        setSessionTime((prevTime) => prevTime + 1); // Update session time every second
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isWorking, currentSession]);

  const startWork = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/workers/start-session`, { workerId: id });
      setIsWorking(true);
      setCurrentSession(response.data); // Set current work session
    } catch (error) {
      toast.error('Failed to start work session');
    }
  };

  const stopWork = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/workers/stop-session`, { workerId: id });
      setIsWorking(false);
      setSessionTime(0);
      setCurrentSession(null);
      toast.success('Work session stopped');
    } catch (error) {
      toast.error('Failed to stop work session');
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!worker) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={worker.photo || '/images/worker-placeholder.png'}
            alt={worker.name}
            className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{worker.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">Phone: {worker.phone}</p>
            <p className="text-gray-600 dark:text-gray-300">Skills: {worker.skills?.join(', ') || 'None'}</p>
            <p className="text-gray-600 dark:text-gray-300">Status: {worker.status}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Work Session</h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <p className="text-lg text-gray-800 dark:text-white">
              {isWorking
                ? `Session Time: ${formatTime(sessionTime)}`
                : 'No active session'}
            </p>

            <button
              onClick={isWorking ? stopWork : startWork}
              className={`mt-4 py-2 px-4 rounded ${isWorking ? 'bg-red-600' : 'bg-green-600'} text-white`}
            >
              {isWorking ? 'Stop Work' : 'Start Work'}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Work History</h2>
          {worker.workHistory?.length > 0 ? (
            <ul className="space-y-4">
              {worker.workHistory.map((session, index) => (
                <li key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                  <p className="text-gray-800 dark:text-white">
                    Start: {new Date(session.startTime).toLocaleString()}
                  </p>
                  <p className="text-gray-800 dark:text-white">
                    End: {session.endTime ? new Date(session.endTime).toLocaleString() : 'Ongoing'}
                  </p>
                  <p className="text-gray-800 dark:text-white">
                    Breaks: {session.breaks?.length || 0}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No work history available.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkerProfile;
