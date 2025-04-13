import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const WorkerLoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/workers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Invalid login credentials');
      }
  
      localStorage.setItem('workerId', result.worker._id); // Assuming 'worker._id' is available
      history(`/worker-profile/${result.worker._id}`); // Redirect to the worker's profile page
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Worker Login
        </h2>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
            className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-secondary text-white py-2 w-full rounded hover:bg-green-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Need help?{' '}
          <Link to="/contact" className="text-secondary hover:underline">
            Contact us
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default WorkerLoginPage;
