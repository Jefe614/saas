// src/components/CustomizeContent.js
import React from 'react';
import { Upload, Save } from 'lucide-react';

const CustomizeContent = ({ storeConfig, handleConfigChange, handleImageUpload }) => (
  <div className="space-y-8">
    {/* Store Branding */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Store Branding</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Store Name</label>
          <input
            type="text"
            value={storeConfig.storeName}
            onChange={(e) => handleConfigChange('storeName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Store Tagline</label>
          <input
            type="text"
            value={storeConfig.storeTagline}
            onChange={(e) => handleConfigChange('storeTagline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>

    {/* Hero Section */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Hero Title</label>
          <input
            type="text"
            value={storeConfig.heroTitle}
            onChange={(e) => handleConfigChange('heroTitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
          <textarea
            value={storeConfig.heroSubtitle}
            onChange={(e) => handleConfigChange('heroSubtitle', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hero Background Image</label>
          <div className="flex items-center space-x-4">
            <img
              src={storeConfig.heroImage}
              alt="Hero"
              className="w-32 h-20 object-cover rounded-lg"
            />
            <button
              onClick={handleImageUpload}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Change Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Color Theme */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Color Theme</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'].map((color) => (
          <button
            key={color}
            onClick={() => handleConfigChange('primaryColor', color)}
            className={`w-full h-16 rounded-lg border-4 transition-all ${
              storeConfig.primaryColor === color
                ? 'border-gray-800 scale-105'
                : 'border-gray-200 hover:scale-102'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>

    {/* Save Button */}
    <div className="flex justify-end">
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
      </button>
    </div>
  </div>
);

export default CustomizeContent;