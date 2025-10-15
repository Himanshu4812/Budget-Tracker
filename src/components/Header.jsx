import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Bell, Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from './ui/Avatar';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/welcome');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Goals', path: '/goals' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Budget', path: '/budget' },
  ];

  const linkClassName = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-zen-nav-active font-semibold'
        : 'text-zen-nav-inactive hover:text-zen-nav-active'
    }`;
  
  const mobileLinkClassName = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
    isActive
      ? 'text-zen-nav-active bg-zen-accent-bg'
      : 'text-zen-nav-inactive hover:text-zen-nav-active hover:bg-gray-50'
  }`;

  return (
    <header className="bg-zen-bg/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <Leaf className="h-8 w-8 text-zen-green-dark" />
              <span className="text-xl font-bold text-zen-green-dark">ZenBudget</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={linkClassName}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 rounded-full text-zen-nav-inactive hover:text-zen-nav-active hover:bg-gray-200/50 transition-colors">
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative" ref={profileMenuRef}>
              <button onClick={() => setProfileMenuOpen(prev => !prev)} className="flex items-center gap-2">
                <Avatar name={user?.name} />
              </button>
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 ring-1 ring-black ring-opacity-5"
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm text-zen-text-secondary">Signed in as</p>
                      <p className="text-sm font-medium text-zen-text-primary truncate">{user?.name}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-zen-text-primary hover:bg-gray-100"
                      >
                        <User size={16} />
                        View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zen-nav-inactive hover:text-zen-nav-active"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={mobileLinkClassName} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}
          </div>
           <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Avatar name={user?.name} />
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-zen-text-primary">{user?.name}</div>
                <div className="text-sm font-medium leading-none text-zen-text-secondary mt-1">{user?.email}</div>
              </div>
              <button className="ml-auto p-2 rounded-full text-zen-nav-inactive hover:text-zen-nav-active">
                <Bell className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
               <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-zen-text-primary hover:bg-gray-100"
              >
                View Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
