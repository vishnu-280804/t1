import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', data);
      toast.success('Password reset link sent to your email');
    } catch (err) {
      toast.error('Failed to send reset link');
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
          Reset Password
        </h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email',
              },
            })}
            className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 w-full rounded hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
      </form>
    </motion.div>
  );
};

export default PasswordReset;



