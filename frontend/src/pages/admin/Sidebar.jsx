// src/components/Sidebar.js
import React from 'react';
import { X, Eye } from 'lucide-react';

const Sidebar = ({ navItems, activeTab, setActiveTab, sidebarOpen, setSidebarOpen, isDarkMode }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg mb-2 transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Store Preview Link */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
        >
          <Eye className="w-5 h-5" />
          <span>Preview Store</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;