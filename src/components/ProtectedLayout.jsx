import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../context/AuthContext';
import { defaultCategories } from '../data/categories';

const initialData = {
  goals: [],
  subscriptions: [],
  transactions: [],
};

const subscriptionImages = [
  'https://i.ibb.co/L8yW3D7/sub-icon-1.png',
  'https://i.ibb.co/zV2h4w2/sub-icon-2.png',
  'https://i.ibb.co/hR1jPZv/sub-icon-3.png',
];

const ProtectedLayout = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(initialData);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showIncomeAnimation, setShowIncomeAnimation] = useState(false);

  // Load user data from localStorage when user logs in
  useEffect(() => {
    if (user?.email) {
      const storageKey = `zenBudgetData_${user.email}`;
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        setUserData(JSON.parse(savedData));
      } else {
        // New user, start with fresh data
        setUserData(initialData);
      }
      setIsDataLoaded(true);
    }
  }, [user]);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user?.email && isDataLoaded) {
      const storageKey = `zenBudgetData_${user.email}`;
      localStorage.setItem(storageKey, JSON.stringify(userData));
    }
  }, [userData, user, isDataLoaded]);

  const addGoal = (newGoal) => {
    setUserData(prevData => ({
      ...prevData,
      goals: [
        ...prevData.goals,
        {
          id: prevData.goals.length > 0 ? Math.max(...prevData.goals.map(g => g.id)) + 1 : 1,
          current: 0,
          ...newGoal
        }
      ]
    }));
  };

  const updateGoalProgress = (goalId, amountToAdd) => {
    setUserData(prevData => ({
      ...prevData,
      goals: prevData.goals.map(goal =>
        goal.id === goalId
          ? { ...goal, current: Math.min(goal.current + amountToAdd, goal.goal) }
          : goal
      )
    }));
  };

  const addTransaction = (newTransaction) => {
    setUserData(prevData => ({
      ...prevData,
      transactions: [
        {
          id: prevData.transactions.length > 0 ? Math.max(...prevData.transactions.map(t => t.id)) + 1 : 1,
          date: new Date().toISOString().split('T')[0],
          ...newTransaction
        },
        ...prevData.transactions
      ]
    }));
    if (newTransaction.type === 'income') {
      setShowIncomeAnimation(true);
    }
  };

  const editTransaction = (updatedTransaction) => {
    setUserData(prevData => ({
      ...prevData,
      transactions: prevData.transactions.map(t =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    }));
  };

  const removeSubscription = (subId) => {
    setUserData(prevData => ({
      ...prevData,
      subscriptions: prevData.subscriptions.filter(sub => sub.id !== subId)
    }));
  };

  const addSubscription = (newSubscription) => {
    setUserData(prevData => ({
      ...prevData,
      subscriptions: [
        ...prevData.subscriptions,
        {
          id: prevData.subscriptions.length > 0 ? Math.max(...prevData.subscriptions.map(s => s.id)) + 1 : 1,
          imageUrl: subscriptionImages[Math.floor(Math.random() * subscriptionImages.length)],
          ...newSubscription
        }
      ]
    }));
  };

  const contextValue = {
    user,
    goals: userData.goals,
    updateGoalProgress,
    addGoal,
    subscriptions: userData.subscriptions,
    removeSubscription,
    addSubscription,
    transactions: userData.transactions,
    addTransaction,
    editTransaction,
    allCategories: defaultCategories,
    showIncomeAnimation,
    setShowIncomeAnimation,
  };

  return (
    <>
      <Header />
      <main>
        {isDataLoaded ? <Outlet context={contextValue} /> : <div>Loading data...</div>}
      </main>
    </>
  );
};

export default ProtectedLayout;
