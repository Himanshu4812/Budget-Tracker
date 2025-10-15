import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import TransactionList from '../components/TransactionList';
import FilterPanel from '../components/FilterPanel';
import AddTransactionModal from '../components/AddTransactionModal';
import EditTransactionModal from '../components/EditTransactionModal';
import { SlidersHorizontal, Plus, ArrowDownLeft, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';

function TransactionsPage() {
  const { transactions, addTransaction, editTransaction, allCategories } = useOutletContext();
  const [sortOrder, setSortOrder] = useState('newest');
  const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    categories: [],
  });

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(t => filters.categories.includes(t.category));
    }
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortOrder === 'newest') return dateB - dateA;
      if (sortOrder === 'oldest') return dateA - dateB;
      if (sortOrder === 'amount-desc') return b.amount - a.amount;
      if (sortOrder === 'amount-asc') return a.amount - b.amount;
      return 0;
    });
  }, [transactions, sortOrder, filters]);

  const summary = useMemo(() => {
    const totalIncome = filteredAndSortedTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = filteredAndSortedTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const netAmount = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, netAmount };
  }, [filteredAndSortedTransactions]);

  const handleAddTransaction = (newTransaction) => {
    addTransaction(newTransaction);
    setAddModalOpen(false);
    toast.success('Transaction added successfully!');
  };

  const handleEditTransaction = (updatedTransaction) => {
    editTransaction(updatedTransaction);
    setEditModalOpen(false);
    toast.success('Transaction updated successfully!');
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-zen-text-primary">The Gardener's Almanac</h1>
          <p className="mt-1 text-md md:text-lg text-zen-text-secondary">A record of your garden's activity.</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <ArrowDownLeft className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-zen-text-secondary">Total Income</p>
              <p className="text-2xl font-bold text-zen-text-primary">${summary.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <ArrowUpRight className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-zen-text-secondary">Total Expenses</p>
              <p className="text-2xl font-bold text-zen-text-primary">${summary.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className={`bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4 border-2 ${summary.netAmount >= 0 ? 'border-zen-green-dark' : 'border-zen-danger'}`}>
            <div className={`${summary.netAmount >= 0 ? 'bg-green-100' : 'bg-red-100'} p-3 rounded-full`}>
              {summary.netAmount >= 0 ? <TrendingUp className="text-zen-green-dark" size={24} /> : <TrendingDown className="text-zen-danger" size={24} />}
            </div>
            <div>
              <p className="text-sm text-zen-text-secondary">{summary.netAmount >= 0 ? 'Net Savings' : 'Net Loss'}</p>
              <p className={`text-2xl font-bold ${summary.netAmount >= 0 ? 'text-zen-green-dark' : 'text-zen-danger'}`}>
                {summary.netAmount < 0 ? '-' : ''}${Math.abs(summary.netAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row justify-end sm:items-center mb-6 gap-4">
            <button 
            onClick={() => setAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zen-button text-white font-semibold rounded-lg hover:bg-zen-button-hover transition-colors"
            >
                <Plus size={20} />
                <span>Add New</span>
            </button>
            <div className="relative">
                <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none w-full sm:w-auto bg-white border border-gray-300 rounded-lg py-2.5 pl-3 pr-8 text-sm text-zen-text-primary focus:outline-none focus:ring-2 focus:ring-zen-accent"
                >
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="amount-desc">Amount: High to Low</option>
                <option value="amount-asc">Amount: Low to High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            <button 
            onClick={() => setFilterPanelOpen(true)}
            className="p-2.5 bg-white border border-gray-300 rounded-lg text-zen-text-secondary hover:bg-gray-50"
            >
                <SlidersHorizontal size={20} />
            </button>
        </div>
        
        <TransactionList transactions={filteredAndSortedTransactions} onEdit={openEditModal} />

        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          onApplyFilters={setFilters}
          currentFilters={filters}
          allCategories={allCategories}
        />

        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddTransaction}
          categories={allCategories}
        />
        
        {selectedTransaction && (
          <EditTransactionModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSave={handleEditTransaction}
            categories={allCategories}
            transaction={selectedTransaction}
          />
        )}

      </motion.div>
    </div>
  );
}

export default TransactionsPage;
