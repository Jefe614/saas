// components/Header.jsx (updated with user dropdown)
import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, ShoppingCart, LogOut, Settings, Heart } from 'lucide-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Header = ({ isDarkMode, storeConfig, isMenuOpen, setIsMenuOpen }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b sticky top-0 z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* <h1 className="text-xl font-bold">{storeConfig.storeName}</h1> */}
            {/* <span className="ml-2 text-sm text-gray-500">{storeConfig.storeTagline}</span> */}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
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
            
            {/* Authentication buttons */}
            {!isLoading && (
              <div className="flex items-center space-x-2">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden md:block text-sm">
                        {user.displayName || user.email?.split('@')[0]}
                      </span>
                    </button>
                    
                    {/* User dropdown menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700">
                        <div className="py-1">
                          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            Signed in as<br />
                            <span className="font-medium">{user.email}</span>
                          </div>
                        </div>
                        <div className="py-1">
                          <a
                            href="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Your Profile
                          </a>
                          <a
                            href="/wishlist"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Wishlist
                          </a>
                          <a
                            href="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </a>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={handleSignOut}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="px-3 py-1 text-sm rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors hidden md:block"
                    >
                      Sign Up
                    </a>
                  </>
                )}
                
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </div>
              </div>
            )}
            
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
            
            {/* Mobile authentication buttons */}
            {!isLoading && !user && (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <a
                  href="/login"
                  className="block w-full text-center py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block w-full text-center py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </a>
              </div>
            )}
            
            {user && (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between py-2">
                  <span>Logged in as: {user.displayName || user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;