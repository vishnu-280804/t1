import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const SchedulePage = () => {
  const [workers, setWorkers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/workers/getWorker?status=accepted')
      .then((res) => setWorkers(res.data))
      .catch((err) => toast.error('Failed to fetch workers'));
    axios
      .get('http://localhost:5000/api/schedules')
      .then((res) => setSchedules(res.data))
      .catch((err) => toast.error('Failed to fetch schedules'));
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/schedules', data);
      setSchedules([...schedules, { ...data, _id: Date.now() }]); // Mock ID
      toast.success('Schedule added');
      reset();
    } catch (err) {
      toast.error('Failed to add schedule');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Work Schedule
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Worker
            </label>
            <select
              {...register('workerId', { required: true })}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Worker</option>
              {workers.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              {...register('date', { required: true })}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Task
            </label>
            <input
              type="text"
              {...register('task', { required: true })}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="E.g., Harvesting"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Schedule
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-primary text-white dark:bg-gray-700">
              <th className="px-4 py-2">Worker</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Task</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s._id} className="text-center border-t dark:border-gray-700">
                <td className="px-4 py-2">
                  {workers.find((w) => w._id === s.workerId)?.name || 'Unknown'}
                </td>
                <td className="px-4 py-2">{new Date(s.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{s.task}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SchedulePage;

