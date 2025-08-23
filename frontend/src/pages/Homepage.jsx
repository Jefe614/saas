import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Search, 
  User, 
  Menu,
  X,
  Star,
  ArrowRight,
  Heart,
  ShoppingCart,
  Filter,
  Grid,
  List,
  MapPin,
  Clock,
  Shield,
  Truck
} from 'lucide-react';

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
      {/* Theme Toggle (for demo - would be in admin panel) */}
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

      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">{storeConfig.storeName}</h1>
              <span className="ml-2 text-sm text-gray-500">{storeConfig.storeTagline}</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Categories</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Deals</a>
              <a href="#" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className={`px-3 py-1 rounded-md border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <User className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
              <div className="relative">
                <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t`}>
            <div className="px-4 py-2">
              <input 
                type="text" 
                placeholder="Search products..." 
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <nav className="px-4 py-2 space-y-2">
              <a href="#" className="block py-2 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="block py-2 hover:text-blue-600 transition-colors">Categories</a>
              <a href="#" className="block py-2 hover:text-blue-600 transition-colors">Deals</a>
              <a href="#" className="block py-2 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="block py-2 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
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

      {/* Trust Indicators */}
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

      {/* Categories */}
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

      {/* Products Section */}
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
              <div key={product.id} className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all ${
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
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About {storeConfig.storeName}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                {storeConfig.aboutText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
                  <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-400">Products</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                alt="About Us" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{storeConfig.storeName}</h3>
              <p className="text-gray-400 mb-4">{storeConfig.storeTagline}</p>
              <p className="text-gray-400 text-sm">Making technology accessible to everyone.</p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale Items</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2025 {storeConfig.storeName}. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Powered by YourSaaS Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceStore;