import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState('');

  const onSubmit = async (data) => {
    setStatus('Submitting...');
    try {
      await axios.post('http://localhost:5000/api/contact', data);
      setStatus('Message sent successfully!');
      toast.success('Message sent!');
      reset();
    } catch (error) {
      setStatus('Failed to send message.');
      toast.error('Failed to send message');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Contact Us
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            We'd love to hear from you! Fill out the form below.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                {...register('name', { required: 'Name is required' })}
                className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
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
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                {...register('message', { required: 'Message is required' })}
                className={`w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
          {status && (
            <p
              className={`text-center text-sm ${
                status.includes('successfully')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
