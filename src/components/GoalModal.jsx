import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target } from 'lucide-react';

const GoalModal = ({ isOpen, onClose, onSave, selectedFlowerName }) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (goalName.trim() && parseFloat(goalAmount) > 0) {
      onSave({ name: goalName, amount: parseFloat(goalAmount) });
      setGoalName('');
      setGoalAmount('');
    }
  };
  
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-zen-bg-alt rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 sm:p-8"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-zen-text-primary">Plant a New Goal</h2>
              <button onClick={onClose} className="p-2 rounded-full text-zen-text-secondary hover:bg-gray-200/80 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="goalName" className="block text-sm font-medium text-zen-text-secondary mb-2">
                    What are you saving for?
                  </label>
                  <input
                    type="text"
                    id="goalName"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder={`e.g., "Trip to Japan"`}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-zen-accent focus:border-zen-accent transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="goalAmount" className="block text-sm font-medium text-zen-text-secondary mb-2">
                    How much do you need?
                  </label>
                   <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="goalAmount"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      placeholder="2000"
                      min="1"
                      className="w-full pl-7 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-zen-accent focus:border-zen-accent transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-zen-button text-white font-semibold rounded-full shadow-lg hover:bg-zen-button-hover transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!goalName.trim() || !goalAmount}
                >
                  <Target size={20} />
                  Start Growing
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoalModal;
