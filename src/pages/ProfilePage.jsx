import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Target, List, BarChart2 } from 'lucide-react';
import Avatar from '../components/ui/Avatar';

const StatCard = ({ icon, label, value, index }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
  >
    <div className="bg-zen-accent-bg p-3 rounded-full mb-3">
      {icon}
    </div>
    <p className="text-3xl font-bold text-zen-text-primary">{value}</p>
    <p className="text-sm text-zen-text-secondary">{label}</p>
  </motion.div>
);

function ProfilePage() {
  const { user, logout } = useAuth();
  const { goals, transactions, subscriptions } = useOutletContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/welcome');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <Avatar name={user?.name} size="lg" />
          </div>
          <h1 className="text-3xl font-bold text-zen-text-primary">{user?.name}</h1>
          <p className="text-md text-zen-text-secondary mt-1">{user?.email}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={<Target className="text-zen-accent" size={24} />}
            label="Active Goals"
            value={goals.length}
            index={0}
          />
          <StatCard
            icon={<List className="text-zen-accent" size={24} />}
            label="Transactions Logged"
            value={transactions.length}
            index={1}
          />
          <StatCard
            icon={<BarChart2 className="text-zen-accent" size={24} />}
            label="Subscriptions"
            value={subscriptions.length}
            index={2}
          />
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-full hover:bg-red-100 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
