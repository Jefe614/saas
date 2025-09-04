// src/components/StatsCard.js
import React from 'react';

const StatsCard = ({ title, value, growth, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-sm mt-1 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {growth >= 0 ? '+' : ''}{growth}% from last month
        </p>
      </div>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          color === 'green'
            ? 'bg-green-100 text-green-600'
            : color === 'blue'
            ? 'bg-blue-100 text-blue-600'
            : color === 'purple'
            ? 'bg-purple-100 text-purple-600'
            : 'bg-orange-100 text-orange-600'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

export default StatsCard;