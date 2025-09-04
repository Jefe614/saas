// components/ProductsSection.jsx
import React from 'react';
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductsSection = ({ 
  isDarkMode, 
  products, 
  viewMode, 
  setViewMode, 
  getThemeClass, 
  getBadgeColor 
}) => {
  return (
    <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Discover our best-selling items</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <div className={viewMode === 'grid' ? 
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
          "space-y-4"
        }>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isDarkMode={isDarkMode} 
              getThemeClass={getThemeClass} 
              getBadgeColor={getBadgeColor} 
              viewMode={viewMode} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;