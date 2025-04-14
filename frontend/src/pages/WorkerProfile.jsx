import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const WorkerProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [currentSession, setCurrentSession] = useState(null);
  const [productivity, setProductivity] = useState(null); // To store productivity score

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workers/${id}`);
        const data = res.data;
        setWorker(data);

        const ongoingSession = data.workHistory?.find((s) => !s.endTime);
        if (ongoingSession) {
          setIsWorking(true);
          setCurrentSession(ongoingSession);
          setSessionTime(Math.floor((Date.now() - new Date(ongoingSession.startTime)) / 1000));
        }
      } catch (err) {
        toast.error('Failed to fetch worker profile');
      }
    };

    fetchWorker();
  }, [id]);

  useEffect(() => {
    let workInterval, breakInterval;

    if (isWorking) {
      workInterval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }

    if (isOnBreak) {
      breakInterval = setInterval(() => {
        setBreakTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(workInterval);
      clearInterval(breakInterval);
    };
  }, [isWorking, isOnBreak]);

  const startWork = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/workers/${id}/start`);
      setIsWorking(true);
      setCurrentSession(res.data.session || {});
      setWorker(res.data.worker || {});
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to start work session');
    }
  };

  const toggleBreak = async () => {
    try {
      if (isOnBreak) {
        await axios.post(`http://localhost:5000/api/workers/${id}/break/stop`);
        toast.success('Break Ended');
      } else {
        await axios.post(`http://localhost:5000/api/workers/${id}/break/start`);
        toast.info('Break Started');
      }
      setIsOnBreak(!isOnBreak);
      setBreakTime(0);
    } catch (error) {
      toast.error('Failed to toggle break');
    }
  };

  const stopWork = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/workers/${id}/session/stop`);
      const updatedWorker = res.data.worker || res.data; // Fallback in case API returns differently
      setIsWorking(false);
      setCurrentSession(null);
      setWorker(updatedWorker);
      setSessionTime(0);

      // Calculate productivity only if data is available
      const avg = updatedWorker.avgSessionDuration || 0;
      const breakTime = updatedWorker.totalBreakTime || 0;
  
      await fetchProductivity(avg, breakTime);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to stop work session');
    }
  };

  const fetchProductivity = async (avgSessionDuration, totalBreakTime) => {
    try {
      const res = await axios.post('http://localhost:5000/api/productivity/predict', {
        avgDuration: avgSessionDuration,
        totalBreak: totalBreakTime,
      });

      if (res.data && res.data.productivity !== undefined) {
        setProductivity(res.data.productivity);
      } else {
        toast.error('No productivity data returned');
      }
    } catch (err) {
      toast.error('Failed to fetch productivity prediction');
    }
  };

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

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
            <p className="text-gray-600 dark:text-gray-300">
              Avg Session Duration: {formatTime(worker.avgSessionDuration || 0)}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Work Session</h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <p className="text-lg text-gray-800 dark:text-white">
              {isWorking ? `Session Time: ${formatTime(sessionTime)}` : 'No active session'}
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Break Timer</h2>
          <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded">
            <p className="text-lg text-gray-900 dark:text-white">
              {isOnBreak ? `Break Time: ${formatTime(breakTime)}` : 'Not on Break'}
            </p>
            <button
              onClick={toggleBreak}
              className="mt-4 py-2 px-4 rounded bg-yellow-600 text-white"
            >
              {isOnBreak ? 'Stop Break' : 'Start Break'}
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
                  <p className="text-gray-800 dark:text-gray-300">
                    End: {session.endTime ? new Date(session.endTime).toLocaleString() : 'Ongoing'}
                  </p>
                  <p className="text-gray-800 dark:text-gray-300">
                    Duration: {formatTime(session.duration || 0)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No work history available.</p>
          )}
        </div>

        {/* Display productivity score */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Productivity</h2>
          <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded">
            <p className="text-lg text-gray-900 dark:text-white">
              {productivity !== null
                ? `Productivity Score: ${(productivity).toFixed(2)}`
                : 'No productivity data available'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkerProfile;
