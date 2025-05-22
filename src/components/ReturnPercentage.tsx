import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ReturnPercentageProps {
  value: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

const ReturnPercentage: React.FC<ReturnPercentageProps> = ({ 
  value, 
  label,
  size = 'md' 
}) => {
  const isPositive = value >= 0;
  
  const sizeClasses = {
    sm: {
      wrapper: 'p-2',
      value: 'text-lg',
      label: 'text-xs',
      icon: 'h-3 w-3'
    },
    md: {
      wrapper: 'p-2',
      value: 'text-base',
      label: 'text-xs',
      icon: 'h-4 w-4'
    },
    lg: {
      wrapper: 'p-4',
      value: 'text-2xl',
      label: 'text-base',
      icon: 'h-5 w-5'
    }
  };
  
  return (
    <div className={`flex items-center justify-between ${sizeClasses[size].wrapper} 
      ${isPositive ? 'bg-green-50' : 'bg-red-50'} 
      rounded-lg transition-all duration-300`}
    >
      <span className="text-gray-600 font-medium uppercase tracking-wider 
        ${sizeClasses[size].label}"
      >
        {label}
      </span>
      
      <div className={`flex items-center font-bold 
        ${isPositive ? 'text-green-600' : 'text-red-600'} 
        ${sizeClasses[size].value}`}
      >
        {isPositive ? (
          <TrendingUp className={`mr-1 ${sizeClasses[size].icon}`} />
        ) : (
          <TrendingDown className={`mr-1 ${sizeClasses[size].icon}`} />
        )}
        {isPositive ? '+' : ''}{value.toFixed(2)}%
      </div>
    </div>
  );
};

export default ReturnPercentage;