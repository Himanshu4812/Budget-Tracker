import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, UtensilsCrossed, HeartPulse, Home, Plane, Gift, ArrowDownLeft, ArrowUpRight, Edit } from 'lucide-react';
import Badge from './ui/Badge';

const categoryIcons = {
  'Shopping': <ShoppingBag size={20} />,
  'Food': <UtensilsCrossed size={20} />,
  'Health': <HeartPulse size={20} />,
  'Housing': <Home size={20} />,
  'Travel': <Plane size={20} />,
  'Gifts': <Gift size={20} />,
  'Salary': <ArrowDownLeft size={20} className="text-green-500" />,
  'Default': <ArrowUpRight size={20} />,
};

const TransactionItem = ({ transaction, index, onEdit }) => {
  const Icon = categoryIcons[transaction.category] || categoryIcons['Default'];
  const isIncome = transaction.type === 'income';

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors duration-200 group"
    >
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isIncome ? 'bg-green-100' : 'bg-gray-100'}`}>
          {Icon}
        </div>
        <div>
          <p className="font-semibold text-zen-text-primary">{transaction.description}</p>
          <p className="text-sm text-zen-text-secondary">{new Date(transaction.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={`font-semibold ${isIncome ? 'text-green-600' : 'text-zen-text-primary'}`}>
            {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
          </p>
          <Badge type={transaction.type} />
        </div>
        <button 
          onClick={() => onEdit(transaction)}
          className="p-2 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 hover:text-gray-600 transition-all"
          aria-label="Edit transaction"
        >
          <Edit size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const TransactionList = ({ transactions, onEdit }) => {
    if (transactions.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-zen-text-secondary">No transactions yet.</p>
            </div>
        );
    }
  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <TransactionItem key={transaction.id} transaction={transaction} index={index} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TransactionList;
