// components/ThemeToggle.jsx
import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`p-2 rounded-full shadow-lg transition-colors ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default ThemeToggle;