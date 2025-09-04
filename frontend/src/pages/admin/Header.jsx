// src/components/Header.js
import React from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';

const Header = ({ activeTab, sidebarOpen, setSidebarOpen, isDarkMode, setIsDarkMode }) => {
  return (
    <header
      className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b h-16 flex items-center justify-between px-6`}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className={`${sidebarOpen ? 'hidden' : 'block'} lg:hidden`}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
        <Bell className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors" />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">A</span>
          </div>
          <span className="font-medium">Admin</span>
        </div>
        <LogOut className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors" />
      </div>
    </header>
  );
};

export default Header;