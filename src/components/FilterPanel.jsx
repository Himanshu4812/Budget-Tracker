import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, currentFilters, allCategories }) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters, isOpen]);

  const handleCategoryChange = (category) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    setLocalFilters({ ...localFilters, categories: newCategories });
  };

  const handleTypeChange = (type) => {
    setLocalFilters({ ...localFilters, type });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = { type: 'all', categories: [] };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
    exit: { x: "100%", transition: { type: 'tween', duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-zen-bg shadow-2xl flex flex-col"
            variants={panelVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-zen-text-primary">Filter Transactions</h2>
              <button onClick={onClose} className="p-2 rounded-full text-zen-text-secondary hover:bg-gray-200/80 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto">
              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-zen-text-secondary mb-3">TYPE</h3>
                <div className="flex space-x-2">
                  {['all', 'income', 'expense'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors capitalize ${
                        localFilters.type === type 
                          ? 'bg-zen-green-dark text-white' 
                          : 'bg-white text-zen-text-primary border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-zen-text-secondary mb-3">CATEGORY</h3>
                <div className="space-y-3">
                  {allCategories.map(category => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localFilters.categories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 rounded border-gray-300 text-zen-green-dark focus:ring-zen-green-dark"
                      />
                      <span className="text-zen-text-primary">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-white flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 bg-gray-100 text-zen-text-primary font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-3 bg-zen-green-dark text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;
