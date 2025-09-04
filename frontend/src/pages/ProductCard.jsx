// components/ProductCard.jsx
import React from 'react';
import { Star, Heart } from 'lucide-react';

const ProductCard = ({ product, isDarkMode, getThemeClass, getBadgeColor, viewMode }) => {
  return (
    <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all ${
      viewMode === 'grid' ? '' : 'flex'
    } group`}>
      <div className={`relative overflow-hidden ${
        viewMode === 'grid' ? 'h-64' : 'w-48 h-48 flex-shrink-0'
      }`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        
        {/* Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(product.badge)}`}>
          {product.badge}
        </div>
        
        {/* Wishlist */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all">
          <Heart className="w-4 h-4" />
        </button>
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold mr-2 hover:bg-gray-100 transition-colors">
            Quick View
          </button>
        </div>
      </div>
      
      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
        
        <div className={`flex ${viewMode === 'list' ? 'justify-between' : 'flex-col'} items-start ${viewMode === 'list' ? 'mb-0' : 'mb-4'}`}>
          <div className="mb-2">
            <span className="text-2xl font-bold text-blue-600">{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">{product.originalPrice}</span>
            )}
          </div>
          
          <div className={`flex gap-2 ${viewMode === 'list' ? 'items-center' : 'w-full'}`}>
            <button 
              disabled={!product.inStock}
              className={`${
                product.inStock 
                  ? `${getThemeClass('primary')} ${getThemeClass('primaryHover')} text-white` 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              } px-4 py-2 rounded-lg font-semibold transition-colors ${
                viewMode === 'list' ? '' : 'flex-1'
              }`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            {viewMode === 'grid' && (
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
                Buy Now
              </button>
            )}
          </div>
        </div>
        
        {product.inStock && (
          <div className="flex items-center text-sm text-green-600 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            In Stock - Ready to ship
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;