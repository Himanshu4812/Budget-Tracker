import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
};

const FlowerCard = ({ flower, isSelected, onSelect }) => {
  return (
    <motion.div
      variants={cardVariants}
      onClick={onSelect}
      className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 ease-in-out ${
        isSelected ? 'bg-zen-accent-bg ring-2 ring-zen-accent' : 'bg-white'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto">
        <img src={flower.imageUrl} alt={flower.name} className="w-full h-full object-contain" />
      </div>
      <p className="mt-3 text-sm font-medium text-zen-text-primary">{flower.name}</p>
    </motion.div>
  );
};

export default FlowerCard;
