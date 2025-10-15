import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import FlowerCard from '../components/FlowerCard';
import GoalModal from '../components/GoalModal';

const flowers = [
  { name: 'Rose', imageUrl: 'https://i.ibb.co/2kZpTf6/flower-rose.png' },
  { name: 'Tulip', imageUrl: 'https://i.ibb.co/k3g3b2h/flower-tulip.png' },
  { name: 'Sunflower', imageUrl: 'https://i.ibb.co/XzLwJjV/flower-sunflower.png' },
  { name: 'Daisy', imageUrl: 'https://i.ibb.co/qYdYvM9/flower-daisy.png' },
];

const GoalsPage = () => {
  const { addGoal } = useOutletContext();
  const [selectedFlower, setSelectedFlower] = useState('Tulip');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSaveGoal = (goalData) => {
    const flower = flowers.find(f => f.name === selectedFlower);
    const newGoal = {
      title: goalData.name,
      goal: goalData.amount,
      imageUrl: flower.imageUrl,
    };
    addGoal(newGoal);
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="bg-zen-bg-alt w-full">
        <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center text-center px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-zen-text-primary">
                    What do you want to grow?
                </h1>
                <p className="mt-3 text-lg text-zen-text-secondary max-w-md mx-auto">
                    Set one simple savings goal to start your journey.
                </p>
            </motion.div>

            <motion.div 
                className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.3,
                        }
                    }
                }}
            >
                {flowers.map((flower) => (
                    <FlowerCard
                        key={flower.name}
                        flower={flower}
                        isSelected={selectedFlower === flower.name}
                        onSelect={() => setSelectedFlower(flower.name)}
                    />
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-10"
            >
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-12 py-3 bg-zen-button text-white font-semibold rounded-full shadow-lg hover:bg-zen-button-hover transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
                >
                    Set Your Goal
                </button>
            </motion.div>
        </div>
        <GoalModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveGoal}
          selectedFlowerName={selectedFlower}
        />
    </div>
  );
};

export default GoalsPage;
