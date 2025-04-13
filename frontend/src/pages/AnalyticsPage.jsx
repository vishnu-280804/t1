import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ChartComponent from '../components/ChartComponent';
import { toast } from 'react-toastify';

const AnalyticsPage = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/workers/getWorker?status=accepted')
      .then((res) => setWorkers(res.data))
      .catch((err) => toast.error('Failed to fetch analytics data'));
  }, []);

  const hoursData = {
    labels: workers.map((w) => w.name),
    datasets: [
      {
        label: 'Hours Worked',
        data: workers.map((w) =>
          w.workHistory
            ? w.workHistory.reduce(
                (sum, session) =>
                  sum +
                  (session.endTime
                    ? (new Date(session.endTime) - new Date(session.startTime)) /
                      (1000 * 60 * 60)
                    : 0),
                0
              )
            : 0
        ),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: '#10B981',
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Analytics Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <ChartComponent
            type="bar"
            data={hoursData}
            title="Hours Worked by Worker"
          />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <ChartComponent
            type="line"
            data={hoursData}
            title="Worker Activity Trend"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
