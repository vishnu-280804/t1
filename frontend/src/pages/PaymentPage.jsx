import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const PaymentPage = () => {
  const [users, setUsers] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(100); // Example rate in INR

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/workers/getWorker?status=accepted')
      .then((res) =>
        setUsers(
          res.data.map((user) => ({
            ...user,
            hoursWorked: calculateHours(user.startTime, user.endTime),
          }))
        )
      )
      .catch((err) => toast.error('Failed to fetch workers'));
  }, []);

  const calculateHours = (start, end) => {
    if (!start || !end) return 0;
    const startTime = new Date(start);
    const endTime = new Date(end);
    return ((endTime - startTime) / (1000 * 60 * 60)).toFixed(2);
  };

  const handlePay = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/api/workers/${userId}/pay`, {
        amount: users.find((u) => u._id === userId).hoursWorked * hourlyRate,
      });
      setUsers(users.map((u) => (u._id === userId ? { ...u, isPaid: true } : u)));
      toast.success('Payment processed');
    } catch (err) {
      toast.error('Failed to process payment');
    }
  };

  const exportReport = () => {
    const data = users.map((u) => ({
      Name: u.name,
      HoursWorked: u.hoursWorked,
      Amount: (u.hoursWorked * hourlyRate).toFixed(2),
      Paid: u.isPaid ? 'Yes' : 'No',
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payments');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'Payment_Report.xlsx');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Process Payments
      </h1>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Hourly Rate (INR):
        </label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
          className="w-32 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={exportReport}
          className="ml-4 bg-accent text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Export Report
        </button>
      </div>
      <ul className="space-y-4">
        {users.map((user) => (
          <motion.li
            key={user._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between"
          >
            <div>
              <span className="font-medium text-gray-800 dark:text-white">
                {user.name}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Hours: {user.hoursWorked} | Amount: ₹
                {(user.hoursWorked * hourlyRate).toFixed(2)}
              </p>
            </div>
            {!user.isPaid && (
              <button
                onClick={() => handlePay(user._id)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Pay Now
              </button>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PaymentPage;
