import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

const IncomeAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2"
      >
        <Sun size={64} className="text-yellow-400" style={{ filter: 'drop-shadow(0 0 15px rgba(250, 204, 21, 0.7))' }} />
      </motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-10 bg-gradient-to-b from-yellow-300/0 to-yellow-300/80 rounded-full"
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [100, '70vh'],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2 + 0.5,
            repeat: 1,
            repeatType: 'loop'
          }}
          style={{
            left: `${10 + i * 20}%`,
          }}
        />
      ))}
    </div>
  );
};

export default IncomeAnimation;
