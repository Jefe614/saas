// components/CategoriesSection.jsx
import React from 'react';

const CategoriesSection = ({ isDarkMode, categories, getThemeClass }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 dark:text-gray-400">Explore our wide range of products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer`}>
              <div className="h-48 overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className={`${getThemeClass('accent')} text-sm`}>{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;