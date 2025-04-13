import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const HireEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('skills', data.skills);
      formData.append('username', data.username);
      formData.append('password', data.password);
      if (data.photo[0]) formData.append('photo', data.photo[0]);

      await axios.post('http://localhost:5000/api/workers/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Worker registered successfully');
      reset();
    } catch (err) {
      toast.error('Failed to register worker');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
          Register Worker
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            {...register('name', { required: 'Name is required' })}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone"
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid phone number',
              },
            })}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Skills (comma-separated)"
            {...register('skills')}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            {...register('photo')}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default HireEmployee;
