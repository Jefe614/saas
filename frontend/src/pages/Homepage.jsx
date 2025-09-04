// EcommerceStore.jsx (Main Component)
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Header from './Header';
import HeroSection from './HeroSection';
import TrustIndicators from './TrustIndicators';
import CategoriesSection from './CategoriesSection';
import ProductsSection from './ProductsSection';
import AboutSection from './AboutSection';
import Footer from './Footer';

const EcommerceStore = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme] = useState('modern');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  
  // Store configuration (this would come from your backend based on tenant)
  const [storeConfig] = useState({
    storeName: 'TechHub Store',
    storeTagline: 'Your Technology Partner',
    heroTitle: 'Latest Tech Products at Best Prices',
    heroSubtitle: 'Discover cutting-edge technology, electronics, and gadgets. Fast shipping, quality products, and excellent customer service.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    ctaText: 'Shop Now',
    businessType: 'Electronics & Technology', // This helps customize the experience
    primaryColor: 'blue',
    aboutText: 'We are passionate about bringing you the latest in technology. From smartphones to smart home devices, we carefully curate our selection to offer you the best products at competitive prices.'
  });

  // Sample categories (would be customizable per tenant)
  const [categories] = useState([
    { id: 1, name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop', count: '150+ products' },
    { id: 2, name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop', count: '80+ products' },
    { id: 3, name: 'Gaming', image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop', count: '120+ products' },
    { id: 4, name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop', count: '90+ products' }
  ]);

  // Sample products (would come from database)
  const [products] = useState([
    { 
      id: 1, 
      name: 'iPhone 15 Pro Max', 
      price: '$1,199', 
      originalPrice: '$1,299',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=200&fit=crop', 
      rating: 4.9,
      reviews: 156,
      inStock: true,
      badge: 'Best Seller'
    },
    { 
      id: 2, 
      name: 'MacBook Air M3', 
      price: '$1,099', 
      originalPrice: '$1,199',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop', 
      rating: 4.8,
      reviews: 89,
      inStock: true,
      badge: 'New Arrival'
    },
    { 
      id: 3, 
      name: 'Sony WH-1000XM5', 
      price: '$349', 
      originalPrice: '$399',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop', 
      rating: 4.9,
      reviews: 234,
      inStock: true,
      badge: 'Sale'
    },
    { 
      id: 4, 
      name: 'Gaming Keyboard RGB', 
      price: '$129', 
      originalPrice: '$159',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop', 
      rating: 4.7,
      reviews: 67,
      inStock: false,
      badge: 'Out of Stock'
    },
    { 
      id: 5, 
      name: 'Smart Watch Series 9', 
      price: '$399', 
      originalPrice: '$449',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop', 
      rating: 4.6,
      reviews: 198,
      inStock: true,
      badge: 'Popular'
    },
    { 
      id: 6, 
      name: '4K Webcam Pro', 
      price: '$199', 
      originalPrice: '$249',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=200&fit=crop', 
      rating: 4.5,
      reviews: 45,
      inStock: true,
      badge: 'Limited'
    }
  ]);

  // Theme configurations
  const themes = {
    modern: {
      name: 'Modern',
      primary: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
      secondary: 'bg-gray-100',
      accent: 'text-blue-600',
      gradient: 'from-blue-600 to-purple-600'
    }
  };

  // Get theme classes
  const getThemeClass = (type) => {
    const theme = themes[currentTheme];
    return theme[type] || '';
  };

  // Badge colors based on type
  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return 'bg-yellow-500 text-white';
      case 'New Arrival': return 'bg-green-500 text-white';
      case 'Sale': return 'bg-red-500 text-white';
      case 'Popular': return 'bg-purple-500 text-white';
      case 'Limited': return 'bg-orange-500 text-white';
      case 'Out of Stock': return 'bg-gray-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <Header 
        isDarkMode={isDarkMode} 
        storeConfig={storeConfig} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <HeroSection storeConfig={storeConfig} getThemeClass={getThemeClass} />
      
      <TrustIndicators isDarkMode={isDarkMode} />
      
      <CategoriesSection 
        isDarkMode={isDarkMode} 
        categories={categories} 
        getThemeClass={getThemeClass} 
      />
      
      <ProductsSection 
        isDarkMode={isDarkMode} 
        products={products} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        getThemeClass={getThemeClass} 
        getBadgeColor={getBadgeColor} 
      />
      
      <AboutSection storeConfig={storeConfig} />
      
      <Footer storeConfig={storeConfig} isDarkMode={isDarkMode} />
    </div>
  );
};

export default EcommerceStore;