import React, { useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import SavingsGoals from '../components/SavingsGoals';
import Subscriptions from '../components/Subscriptions';
import AddFundsModal from '../components/AddFundsModal';
import AddSubscriptionModal from '../components/AddSubscriptionModal';
import IncomeAnimation from '../components/IncomeAnimation';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

const plantStates = {
  stressed: {
    src: 'https://i.ibb.co/P9T0Gk9/plant-stressed.png',
    alt: 'A wilting plant, symbolizing financial stress.',
  },
  young: {
    src: 'https://i.ibb.co/c8pTfQd/plant-young.png',
    alt: 'A small sapling, symbolizing the start of a savings journey.',
  },
  healthy: {
    src: 'https://i.ibb.co/9gfY7T5/zenbudget-dashboard.png',
    alt: 'A healthy, lush green plant in a pot, symbolizing good financial health.',
  },
  thriving: {
    src: 'https://i.ibb.co/yqg4YyP/plant-thriving.png',
    alt: 'A thriving, flowering plant, symbolizing excellent financial health.',
  },
};

function DashboardPage() {
  const { user, goals, updateGoalProgress, subscriptions, removeSubscription, addSubscription, transactions, showIncomeAnimation, setShowIncomeAnimation } = useOutletContext();
  const [isAddFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [isAddSubModalOpen, setAddSubModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    if (showIncomeAnimation) {
      const timer = setTimeout(() => setShowIncomeAnimation(false), 4000); // Animation lasts 4s
      return () => clearTimeout(timer);
    }
  }, [showIncomeAnimation, setShowIncomeAnimation]);

  const financialHealthStatus = useMemo(() => {
    if (!transactions || transactions.length === 0) return 'young';

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

    if (totalIncome === 0) return 'young';

    const savingsRate = (totalIncome - totalExpenses) / totalIncome;

    if (savingsRate < 0.1) return 'stressed';
    if (savingsRate < 0.3) return 'young';
    if (savingsRate < 0.5) return 'healthy';
    return 'thriving';
  }, [transactions]);

  const handleOpenAddFundsModal = (goal) => {
    setSelectedGoal(goal);
    setAddFundsModalOpen(true);
  };

  const handleCloseAddFundsModal = () => {
    setAddFundsModalOpen(false);
    setSelectedGoal(null);
  };

  const handleSaveFunds = (amount) => {
    if (selectedGoal) {
      updateGoalProgress(selectedGoal.id, amount);
      toast.success(`$${amount} added to "${selectedGoal.title}"!`);
    }
    handleCloseAddFundsModal();
  };

  const handleRemoveSubscription = (subId, subTitle) => {
    removeSubscription(subId);
    toast.success(`Subscription "${subTitle}" removed!`);
  }

  const handleAddSubscription = (newSub) => {
    addSubscription(newSub);
    setAddSubModalOpen(false);
    toast.success(`Subscription "${newSub.title}" added!`);
  }

  const currentPlant = plantStates[financialHealthStatus];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
      {showIncomeAnimation && <IncomeAnimation />}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-zen-text-primary mb-2">Welcome back, {user?.name}</h1>
        <p className="text-md md:text-lg text-zen-text-secondary">Your financial garden is blooming! Let's see how it's growing.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-12 md:mb-16"
      >
        <div className="bg-zen-accent-bg rounded-2xl p-4 sm:p-6 overflow-hidden shadow-sm flex justify-center items-center h-64 md:h-80">
          <motion.img
            key={currentPlant.src}
            src={currentPlant.src} 
            alt={currentPlant.alt}
            className="w-auto h-full object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <SavingsGoals goals={goals} onAddFunds={handleOpenAddFundsModal} />
      <div className="mt-12 md:mt-16">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zen-text-primary">Subscriptions</h2>
            <button 
                onClick={() => setAddSubModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zen-button hover:text-zen-button-hover transition-colors"
            >
                <PlusCircle size={20} />
                Add New
            </button>
        </div>
        <Subscriptions subscriptions={subscriptions} onRemove={handleRemoveSubscription} />
      </div>

      {selectedGoal && (
        <AddFundsModal
          isOpen={isAddFundsModalOpen}
          onClose={handleCloseAddFundsModal}
          onSave={handleSaveFunds}
          goal={selectedGoal}
        />
      )}
      <AddSubscriptionModal 
        isOpen={isAddSubModalOpen}
        onClose={() => setAddSubModalOpen(false)}
        onSave={handleAddSubscription}
      />
    </div>
  );
}

export default DashboardPage;
