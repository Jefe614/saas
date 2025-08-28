import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b sticky top-0 z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">TechHub Store</h1>
            <span className="ml-2 text-sm text-gray-500">Your Technology Partner</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/categories" className="hover:text-blue-600 transition-colors">Categories</Link>
            <Link to="#" className="hover:text-blue-600 transition-colors">Deals</Link>
            <Link to="#" className="hover:text-blue-600 transition-colors">About</Link>
            <Link to="#" className="hover:text-blue-600 transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className={`px-3 py-1 rounded-md border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <User className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
