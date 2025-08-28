import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { Search, Home, ChevronRight } from 'lucide-react';

const CategoriesPage = () => {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock featured products data
  const [featuredProducts] = useState([
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      price: 'KES 12,999', 
      originalPrice: 'KES 15,999',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop', 
      rating: 4.5,
      reviews: 128,
      inStock: true,
      badge: 'Sale'
    },
    { 
      id: 2, 
      name: 'Smart Watch', 
      price: 'KES 19,999', 
      originalPrice: 'KES 24,999',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop', 
      rating: 4.7,
      reviews: 96,
      inStock: true,
      badge: 'Popular'
    },
    { 
      id: 3, 
      name: 'Bluetooth Speaker', 
      price: 'KES 7,999', 
      originalPrice: 'KES 9,999',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop', 
      rating: 4.3,
      reviews: 74,
      inStock: true,
      badge: 'New'
    },
    { 
      id: 4, 
      name: 'Gaming Keyboard', 
      price: 'KES 8,999', 
      originalPrice: 'KES 10,999',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop', 
      rating: 4.8,
      reviews: 215,
      inStock: true,
      badge: 'Best Seller'
    }
  ]);

  // Mock promotional banners
  const [promotions] = useState([
    { id: 1, title: 'Summer Sale', description: 'Up to 50% off on selected items', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=200&fit=crop' },
    { id: 2, title: 'Free Shipping', description: 'On orders over KES 5,000', image: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=600&h=200&fit=crop' }
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        setCategories(response.data);
        setFilteredCategories(response.data);
      } catch (err) {
        // Use mock data when backend is not available
        const mockCategories = [
          { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop', product_count: '150+' },
          { id: 2, name: 'Clothing', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop', product_count: '200+' },
          { id: 3, name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&h=200&fit=crop', product_count: '100+' },
          { id: 4, name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop', product_count: '80+' },
          { id: 5, name: 'Beauty', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=200&fit=crop', product_count: '120+' },
          { id: 6, name: 'Books', image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=200&fit=crop', product_count: '90+' },
          { id: 7, name: 'Toys', image: 'https://images.unsplash.com/photo-1501959915551-4e58291f11f9?w=300&h=200&fit=crop', product_count: '70+' },
          { id: 8, name: 'Automotive', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=200&fit=crop', product_count: '60+' }
        ];
        setCategories(mockCategories);
        setFilteredCategories(mockCategories);
        setError('Using mock data - backend not available');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Check if a specific category is selected
  useEffect(() => {
    if (categoryId) {
      const category = categories.find(cat => cat.id === parseInt(categoryId));
      setSelectedCategory(category || null);
    } else {
      setSelectedCategory(null);
    }
  }, [categoryId, categories]);

  // Filter categories based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

  // Badge colors based on type
  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return 'bg-yellow-500 text-white';
      case 'New': return 'bg-green-500 text-white';
      case 'Sale': return 'bg-red-500 text-white';
      case 'Popular': return 'bg-purple-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  // Format breadcrumb based on whether a category is selected
  const renderBreadcrumb = () => {
    return (
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Home className="w-4 h-4 mr-2" />
        <a href="/" className="hover:text-blue-600">Home</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/categories" className="hover:text-blue-600">Categories</a>
        {selectedCategory && (
          <>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>{selectedCategory.name}</span>
          </>
        )}
      </nav>
    );
  };

  // if (loading) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">Loading...</div>;
  // if (error) return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"><p className="text-red-500">{error}</p></div>;

  // If a specific category is selected but not found
  if (categoryId && !selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderBreadcrumb()}
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for is coming soon!</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Stay Tuned</h2>
            <p className="text-gray-700 mb-6">
              Our team is working hard to bring you amazing products in this category. 
              Check back soon for updates!
            </p>
            <button 
              onClick={() => window.location.href = '/categories'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse All Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {renderBreadcrumb()}

      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {selectedCategory ? selectedCategory.name : 'Shop by Category'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {selectedCategory 
            ? selectedCategory.description || `Explore our collection of ${selectedCategory.name} products.`
            : 'Discover our wide range of products across various categories. Find exactly what you\'re looking for with our carefully curated collections.'}
        </p>
      </div>

      {/* Search Bar */}
      {!selectedCategory && (
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Categories Grid */}
      {!selectedCategory && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">All Categories</h2>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <a 
                  key={category.id} 
                  href={`/categories/${category.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.product_count} products</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Individual Category View */}
      {selectedCategory && (
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-10">
            <div className="h-64 overflow-hidden">
              <img 
                src={selectedCategory.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=300&fit=crop'} 
                alt={selectedCategory.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedCategory.name}</h2>
              <p className="text-gray-600 mb-4">
                {selectedCategory.description || 'This category is coming soon with amazing products.'}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-semibold">Coming Soon</p>
                <p className="text-blue-700">Our team is preparing exciting products for this category. Check back soon!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promotional Banners */}
      {!selectedCategory && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.map((promo) => (
              <div key={promo.id} className="relative rounded-lg overflow-hidden">
                <img src={promo.image} alt={promo.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
                  <p className="text-white mb-4">{promo.description}</p>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      {!selectedCategory && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative overflow-hidden h-64">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(product.badge)}`}>
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-blue-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
