import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, UtensilsCrossed, HeartPulse, Plane, Gift } from 'lucide-react';

const categoryIcons = {
  'Shopping': <ShoppingBag size={24} className="text-zen-text-secondary" />,
  'Food': <UtensilsCrossed size={24} className="text-zen-text-secondary" />,
  'Health': <HeartPulse size={24} className="text-zen-text-secondary" />,
  'Travel': <Plane size={24} className="text-zen-text-secondary" />,
  'Gifts': <Gift size={24} className="text-zen-text-secondary" />,
};

const ProgressBar = ({ percentage }) => {
  let bgColor = 'bg-zen-green-progress';
  if (percentage > 90) {
    bgColor = 'bg-zen-danger';
  } else if (percentage > 75) {
    bgColor = 'bg-zen-warning';
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
      <motion.div
        className={`h-2.5 rounded-full ${bgColor}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

const BudgetCard = ({ budget, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-zen-text-primary">{budget.category}</h3>
        {categoryIcons[budget.category]}
      </div>
      
      <div className="mb-4">
        <p className="text-2xl font-bold text-zen-text-primary">
          ${budget.spent.toLocaleString()}
          <span className="text-base font-medium text-zen-text-secondary"> / ${budget.limit.toLocaleString()}</span>
        </p>
        <ProgressBar percentage={budget.percentage} />
      </div>

      <div>
        {budget.remaining >= 0 ? (
          <p className="text-sm text-zen-text-secondary">
            <span className="font-semibold text-zen-green-dark">${budget.remaining.toLocaleString()}</span> left to spend
          </p>
        ) : (
          <p className="text-sm text-zen-danger font-semibold">
            ${Math.abs(budget.remaining).toLocaleString()} over budget
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default BudgetCard;
