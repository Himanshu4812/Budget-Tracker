import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
const USERS_DB_KEY = 'zenBudget_users';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a logged-in user session
    const storedUser = localStorage.getItem('zenBudgetUser_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const getUsersFromDb = () => {
    const users = localStorage.getItem(USERS_DB_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsersToDb = (users) => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        const users = getUsersFromDb();
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userSession = { name: foundUser.name, email: foundUser.email };
          localStorage.setItem('zenBudgetUser_session', JSON.stringify(userSession));
          setUser(userSession);
          setLoading(false);
          resolve(userSession);
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const signup = (name, email, password) => {
     return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        const users = getUsersFromDb();
        const userExists = users.some(u => u.email === email);

        if (userExists) {
          setLoading(false);
          reject(new Error('A user with this email already exists.'));
          return;
        }

        const newUser = { name, email, password };
        const updatedUsers = [...users, newUser];
        saveUsersToDb(updatedUsers);

        const userSession = { name, email };
        localStorage.setItem('zenBudgetUser_session', JSON.stringify(userSession));
        setUser(userSession);
        setLoading(false);
        resolve(userSession);
      }, 1000);
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      localStorage.removeItem('zenBudgetUser_session');
      setUser(null);
      resolve();
    });
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
