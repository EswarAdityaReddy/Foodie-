import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import Logo from '../ui/Logo';

const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Search for:', searchQuery);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Search - hidden on mobile */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex relative flex-1 max-w-md mx-6"
          >
            <input
              type="text"
              placeholder="Search for restaurants, cuisines..."
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-primary-600">
                <User className="mr-1" size={18} />
                <span className="font-medium">{user?.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <form 
          onSubmit={handleSearch} 
          className="mt-4 md:hidden relative"
        >
          <input
            type="text"
            placeholder="Search for restaurants, cuisines..."
            className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </form>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 animate-slide-up">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="py-2 px-4 hover:bg-gray-100 rounded-md">
                Home
              </Link>
              <Link to="/cart" className="py-2 px-4 hover:bg-gray-100 rounded-md flex justify-between">
                Cart
                {totalItems > 0 && (
                  <span className="bg-primary-600 text-white text-xs font-medium rounded-full px-2 py-1">
                    {totalItems} items
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <Link to="/profile" className="py-2 px-4 hover:bg-gray-100 rounded-md">
                  My Profile
                </Link>
              ) : (
                <Link to="/login" className="py-2 px-4 bg-primary-600 text-white rounded-md text-center">
                  Login / Sign Up
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;