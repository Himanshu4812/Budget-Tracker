import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const ProgressBar = ({ current, goal }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <motion.div
        className="bg-zen-green-progress h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

const SavingsGoalCard = ({ goal, index, onAddFunds }) => {
  return (
    <motion.div
      className="bg-zen-card-bg rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -5 }}
    >
      <div className="flex-grow">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 mb-4">
           <img src={goal.imageUrl} alt={`Illustration for ${goal.title}`} className="w-full h-full object-contain object-center" />
        </div>
        <h3 className="text-md font-semibold text-zen-text-primary text-center">{goal.title}</h3>
      </div>
      <div className="mt-4">
        <p className="text-sm text-zen-text-secondary text-center">
          <span className="text-zen-green-dark font-medium">${goal.current.toLocaleString()}</span> / ${goal.goal.toLocaleString()}
        </p>
        <ProgressBar current={goal.current} goal={goal.goal} />
        <button
          onClick={() => onAddFunds(goal)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-zen-green-dark font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <Plus size={16} />
          Add Funds
        </button>
      </div>
    </motion.div>
  );
};

const SavingsGoals = ({ goals, onAddFunds }) => {
  return (
    <section className="mb-12 md:mb-16">
      <h2 className="text-2xl font-bold text-zen-text-primary mb-6">Savings Goals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {goals.map((goal, index) => (
          <SavingsGoalCard key={goal.id} goal={goal} index={index} onAddFunds={onAddFunds} />
        ))}
      </div>
    </section>
  );
};

export default SavingsGoals;
