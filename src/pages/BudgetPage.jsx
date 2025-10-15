import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { budgets as budgetData } from '../data/budgetData';
import BudgetCard from '../components/BudgetCard';

function BudgetPage() {
  const { transactions } = useOutletContext();

  const budgetDetails = useMemo(() => {
    return budgetData.map(budget => {
      const spent = transactions
        .filter(t => t.category === budget.category && t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);
      
      return {
        ...budget,
        spent,
        remaining: budget.limit - spent,
        percentage: Math.min((spent / budget.limit) * 100, 100),
      };
    });
  }, [budgetData, transactions]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-zen-text-primary">Your Budget Plots</h1>
          <p className="mt-1 text-md md:text-lg text-zen-text-secondary">See how each area of your garden is growing.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {budgetDetails.map((budget, index) => (
            <BudgetCard key={budget.category} budget={budget} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default BudgetPage;
