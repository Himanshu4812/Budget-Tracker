import React from 'react';

const Badge = ({ type }) => {
  const baseClasses = 'text-xs font-medium px-2 py-0.5 rounded-full';
  const typeClasses = {
    income: 'bg-green-100 text-green-800',
    expense: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`${baseClasses} ${typeClasses[type] || typeClasses.expense} inline-block mt-1`}>
      {type}
    </span>
  );
};

export default Badge;
