import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Droplet } from 'lucide-react';

const AddFundsModal = ({ isOpen, onClose, onSave, goal }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (numericAmount > 0) {
      onSave(numericAmount);
      setAmount('');
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
              <h2 className="text-2xl font-bold text-zen-text-primary">Water Your Goal</h2>
              <button onClick={onClose} className="p-2 rounded-full text-zen-text-secondary hover:bg-gray-200/80 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-center text-zen-text-secondary mb-6">
              You're adding funds to your <strong className="text-zen-text-primary">"{goal.title}"</strong> goal.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-zen-text-secondary mb-2">
                    How much would you like to add?
                  </label>
                   <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="50.00"
                      min="0.01"
                      step="0.01"
                      className="w-full pl-7 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-zen-accent focus:border-zen-accent transition"
                      required
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-zen-button text-white font-semibold rounded-full shadow-lg hover:bg-zen-button-hover transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!amount || parseFloat(amount) <= 0}
                >
                  <Droplet size={20} />
                  Add Funds
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddFundsModal;
