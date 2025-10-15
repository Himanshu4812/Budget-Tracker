import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ name, size = 'md' }) => {
  const sizeClasses = {
    md: 'h-9 w-9',
    lg: 'h-20 w-20',
  };

  const iconSize = {
    md: 20,
    lg: 40,
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-zen-accent-bg text-zen-accent ${sizeClasses[size]}`}
    >
      <User size={iconSize[size]} />
    </div>
  );
};

export default Avatar;
