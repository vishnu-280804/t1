import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminLoginPage = () => {
  const navigate = useNavigate(); // For redirecting after login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Assuming the response contains a message and adminId
        alert('Login successful!');
        // You can store the adminId in localStorage or manage it as needed
        localStorage.setItem('adminId', result.adminId);
        navigate('/admin'); // Redirect to the admin page
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
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
          Admin Login
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
            className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${
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
            className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white py-2 w-full rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Forgot password?{' '}
          <Link to="/password-reset" className="text-secondary hover:underline">
            Reset it
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default AdminLoginPage;
