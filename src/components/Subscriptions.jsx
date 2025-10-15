import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

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

const SubscriptionCard = ({ subscription, index, onRemove }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-4 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -5 }}
      layout
    >
      <button 
        onClick={() => onRemove(subscription.id, subscription.title)}
        className="absolute top-2 right-2 p-1 rounded-full bg-white/50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
        aria-label="Remove subscription"
      >
        <XCircle size={20} />
      </button>
      <div className="flex-grow">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 mb-4">
          <img src={subscription.imageUrl} alt={`Illustration for ${subscription.title}`} className="w-full h-full object-contain object-center" />
        </div>
        <h3 className="text-md font-semibold text-zen-text-primary">{subscription.title}</h3>
      </div>
      <p className="text-sm text-zen-text-secondary mt-1">
        ${subscription.amount}/{subscription.period}
      </p>
    </motion.div>
  );
};

const Subscriptions = ({ subscriptions, onRemove }) => {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-2xl">
        <p className="text-zen-text-secondary">No subscriptions added yet.</p>
        <p className="text-sm text-gray-400 mt-1">Click "Add New" to track a subscription.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {subscriptions.map((sub, index) => (
        <SubscriptionCard key={sub.id} subscription={sub} index={index} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default Subscriptions;
