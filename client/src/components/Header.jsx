import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    ? [...navigation, { name: 'Dashboard', href: '/dashboard', hasDropdown: false }]
    : navigation;

  return (
    <header className={`bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300 ${
      isAuthenticated 
        ? 'shadow-xl shadow-amber-500/5' 
        : 'shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo - Enhanced */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-xl group-hover:shadow-amber-500/35 transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-xl">RJ</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-gray-900 tracking-tight group-hover:text-amber-600 transition-colors duration-300">
                  RJ Gems
                </span>
                <span className="text-base text-gray-500 font-medium tracking-wider uppercase">
                  Luxury Jewelry
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Enhanced */}
          <nav className="hidden lg:flex items-center space-x-1">
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
                        `px-5 py-3 text-lg font-semibold transition-all duration-300 rounded-lg relative group flex items-center ${
                          isActive 
                            ? 'text-amber-600 bg-amber-50' 
                            : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
                        }`
                      }
                    >
                      {item.name}
                      <svg className="w-5 h-5 ml-1 transform transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </NavLink>
                    
                    {/* Enhanced Dropdown Menu */}
                    {isCollectionsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl shadow-gray-900/10 border border-gray-200/50 py-3 z-50 animate-fade-in">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider">Shop by Category</h3>
                        </div>
                        {categories.map((category) => (
                          <NavLink
                            key={category.name}
                            to={category.href}
                            className={({ isActive }) => 
                              `flex items-center px-4 py-3 text-lg font-medium transition-all duration-200 rounded-lg mx-2 ${
                                isActive
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                              }`
                            }
                          >
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
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
                      `px-5 py-3 text-lg font-semibold transition-all duration-300 rounded-lg relative group ${
                        isActive 
                          ? 'text-amber-600 bg-amber-50' 
                          : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions - Enhanced */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Cart Icon - Enhanced */}
            <button className="relative p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group" title="Shopping Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                0
              </span>
            </button>

            {/* Authentication Buttons - Enhanced */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                  title="Account Menu"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-xl group-hover:shadow-amber-500/40 transition-all duration-300">
                    <span className="text-white font-bold text-sm">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-lg text-gray-900 group-hover:text-amber-600 transition-colors">
                      {user?.firstName}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">
                      Premium Member
                    </span>
                  </div>
                  <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-2xl shadow-amber-500/20 border border-amber-100 py-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-yellow-50">
                      <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-amber-600 font-medium">{user?.email}</p>
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
              <div className="flex items-center space-x-2">
                <Link
                  to="/signin"
                  className="px-6 py-3 text-lg font-semibold text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button - Enhanced */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 shadow-sm"
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

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
          <div className="px-4 pt-6 pb-8 space-y-2">
            {fullNavigation.map((item) => (
              <div key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'text-amber-600 bg-amber-50' 
                        : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                  {item.name}
                </NavLink>
                {item.hasDropdown && (
                  <div className="ml-4 mt-2 space-y-1">
                    {categories.map((category) => (
                      <NavLink
                        key={category.name}
                        to={category.href}
                        className={({ isActive }) => 
                          `block px-3 py-2 text-base rounded-lg transition-colors duration-200 ${
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
                <span className="text-sm font-semibold mt-1">Cart</span>
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
                  <span className="text-sm font-semibold mt-1">Dashboard</span>
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
                  <span className="text-sm font-semibold mt-1">Sign In</span>
                </Link>
              )}
            </div>
            
            {/* Mobile Auth Section - Enhanced */}
            {!isAuthenticated && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <Link
                    to="/signup"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-200 text-center block shadow-lg shadow-amber-500/25 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                  <Link
                    to="/signin"
                    className="w-full bg-white text-gray-700 font-semibold py-4 px-4 rounded-xl border border-gray-300 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 transition-all duration-200 text-center block text-lg"
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
