// components/TrustIndicators.jsx
import React from 'react';
import { Truck, Shield, Clock, Star } from 'lucide-react';

const TrustIndicators = ({ isDarkMode }) => {
  return (
    <section className={`py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Truck className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium">Free Shipping</span>
            <span className="text-xs text-gray-500">Orders over $50</span>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium">Secure Payment</span>
            <span className="text-xs text-gray-500">100% Protected</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium">24/7 Support</span>
            <span className="text-xs text-gray-500">Always here to help</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-8 h-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium">Top Rated</span>
            <span className="text-xs text-gray-500">5-star reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;