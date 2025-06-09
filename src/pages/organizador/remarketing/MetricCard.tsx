// src/components/pages/Remarketing/MetricCard.tsx
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: number;
  positive: boolean;
  darkMode: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, change, positive, darkMode }) => {
  return (
    <div className={`rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 sm:p-5`}>
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-sm sm:text-base font-medium text-gray-500 dark:text-gray-400 ml-2">{label}</h3>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      <div className="flex items-center mt-2">
        {positive ? (
          <ArrowUp size={16} className="text-green-600 dark:text-green-400" />
        ) : (
          <ArrowDown size={16} className="text-red-600 dark:text-red-400" />
        )}
        <span
          className={`text-sm ml-1 ${
            positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {change}% em relação ao período anterior
        </span>
      </div>
    </div>
  );
};

export default MetricCard;