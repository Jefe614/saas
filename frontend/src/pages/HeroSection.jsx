// components/HeroSection.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ storeConfig, getThemeClass }) => {
  return (
    <section className="relative min-h-[500px] flex items-center">
      <img 
        src={storeConfig.heroImage} 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {storeConfig.heroTitle}
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            {storeConfig.heroSubtitle}
          </p>
          <button className={`${getThemeClass('primary')} ${getThemeClass('primaryHover')} text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center gap-2`}>
            {storeConfig.ctaText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;