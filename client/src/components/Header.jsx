import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const categories = [
    { name: 'Rings', href: '/category/rings' },
    { name: 'Necklaces', href: '/category/necklaces' },
    { name: 'Earrings', href: '/category/earrings' },
    { name: 'Bracelets', href: '/category/bracelets' },
  ];

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Collections', 
      href: '/collections',
      hasDropdown: true
    },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Add Dashboard to navigation if user is authenticated
  const fullNavigation = isAuthenticated 
    ? [...navigation.slice(0, 4), { name: 'Dashboard', href: '/dashboard' }, navigation[4]]
    : navigation;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                <span className="text-white font-bold text-sm">RJ</span>
              </div>
              <span className="text-2xl font-semibold text-gray-900 tracking-tight group-hover:text-amber-600 transition-colors duration-300">
                RJ Gems
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {fullNavigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div
                    onMouseEnter={() => setIsCollectionsOpen(true)}
                    onMouseLeave={() => setIsCollectionsOpen(false)}
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => 
                        `px-3 py-2 text-sm font-medium transition-colors duration-200 relative group flex items-center ${
                          isActive 
                            ? 'text-amber-600' 
                            : 'text-gray-700 hover:text-amber-600'
                        }`
                      }
                    >
                      {item.name}
                      <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                    
                    {/* Dropdown Menu */}
                    {isCollectionsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                        <div className="px-3 py-2 border-b border-gray-100">
                          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Shop by Category</h3>
                        </div>
                        {categories.map((category) => (
                          <NavLink
                            key={category.name}
                            to={category.href}
                            className={({ isActive }) => 
                              `block px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                isActive
                                  ? 'bg-amber-50 text-amber-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-amber-600'
                              }`
                            }
                          >
                            {category.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => 
                      `px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                        isActive 
                          ? 'text-amber-600' 
                          : 'text-gray-700 hover:text-amber-600'
                      }`
                    }
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus-within:border-amber-300 transition-all duration-300">
                  <input
                    type="text"
                    placeholder="Search jewelry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-3 py-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1 text-amber-600 hover:text-amber-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 ml-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  title="Search jewelry"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Cart Icon */}
            <button className="p-2 text-gray-600 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200 relative" title="Shopping Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  title="Account Menu"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-sm">{user?.firstName}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Dashboard</span>
                        </div>
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <span>Orders</span>
                        </div>
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-amber-600 transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>Wishlist</span>
                        </div>
                      </Link>
                      <button
                        onClick={async () => {
                          await logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Sign Out</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {fullNavigation.map((item) => (
              <div key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => 
                    `block px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? 'text-amber-600 bg-amber-50' 
                        : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
                {item.hasDropdown && (
                  <div className="ml-4 mt-2 space-y-1">
                    {categories.map((category) => (
                      <NavLink
                        key={category.name}
                        to={category.href}
                        className={({ isActive }) => 
                          `block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                            isActive
                              ? 'text-amber-600 bg-amber-50'
                              : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Search */}
            <div className="pt-4 border-t border-gray-100">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                <input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-2 py-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="ml-2 p-1 text-amber-600 hover:text-amber-700 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          
          {/* Mobile Action Buttons */}
          <div className="border-t border-gray-100 px-4 py-4 bg-gray-50">
            <div className="flex items-center justify-around">
              <button className="flex flex-col items-center p-3 text-gray-600 hover:text-amber-600 hover:bg-white rounded-lg transition-all duration-200">
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="text-xs font-medium mt-1">Cart</span>
              </button>
              
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="flex flex-col items-center p-3 text-gray-600 hover:text-amber-600 hover:bg-white rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <span className="text-xs font-medium mt-1">Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="flex flex-col items-center p-3 text-gray-600 hover:text-amber-600 hover:bg-white rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-xs font-medium mt-1">Sign In</span>
                </Link>
              )}
            </div>
            
            {/* Mobile Auth Section */}
            {!isAuthenticated && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <Link
                    to="/signup"
                    className="w-full bg-amber-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors duration-200 text-center block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/signin"
                    className="w-full bg-white text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-center block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
