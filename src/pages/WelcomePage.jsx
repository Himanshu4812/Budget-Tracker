import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zen-bg-alt text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="flex flex-col items-center"
      >
        <Leaf className="h-16 w-16 text-zen-green-dark mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-zen-green-dark">
          Welcome to ZenBudget
        </h1>
        <p className="mt-4 text-lg text-zen-text-secondary max-w-lg mx-auto">
          Your financial journey begins with a single seed. Let's help it grow into a flourishing garden.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/login"
          className="px-10 py-3 bg-zen-button text-white font-semibold rounded-full shadow-lg hover:bg-zen-button-hover transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-10 py-3 bg-white text-zen-green-dark font-semibold rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
        >
          Sign Up
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 p-4"
      >
        <img src="https://i.ibb.co/c8pTfQd/plant-young.png" alt="A small sapling" className="h-32 mx-auto" />
      </motion.div>
    </div>
  );
};

export default WelcomePage;
