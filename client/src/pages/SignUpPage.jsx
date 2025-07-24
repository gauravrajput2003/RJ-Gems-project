import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { registerOnly, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (error) clearError();
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...registrationData } = formData;
    
    try {
      // Call registerOnly to avoid auto-login
      const result = await registerOnly(registrationData);
      
      if (result.success) {
        // Clear any authentication state since we want user to sign in manually
        clearError();
        
        // Redirect to signin page with success message
        navigate('/signin', { 
          replace: true,
          state: { 
            message: 'Account created successfully! Please sign in with your credentials.',
            type: 'success',
            email: registrationData.email // Pre-fill email on signin page
          }
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && 
                     formData.password && formData.confirmPassword;
                     // Removed validation errors check to allow button to be visible
                     // Validation will happen on form submission

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-amber-400/10 to-yellow-300/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-300/10 to-amber-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-amber-200/5 to-yellow-200/5 blur-3xl"></div>
      </div>
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 border border-gray-700">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Creating Your Account</h3>
              <p className="text-gray-300">Please wait while we set up your RJ Gems account...</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-lg w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/30 group-hover:shadow-3xl group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-2xl">RJ</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-sm transition-all duration-300"></div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-3xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">RJ Gems</span>
              <span className="text-sm text-amber-400 font-medium tracking-wider uppercase">Luxury Jewelry</span>
            </div>
          </Link>
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-3">
              Create Account
            </h2>
            <p className="text-lg text-gray-300 max-w-md mx-auto">
              Join RJ Gems and discover our exclusive luxury jewelry collections crafted for elegance
            </p>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="bg-gray-800/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-gray-700/50 relative">
          {/* Decorative Elements */}
          <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-amber-400/10 via-yellow-300/10 to-amber-500/10 rounded-3xl blur-sm -z-10"></div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <span className="text-red-300 text-sm font-medium">{error}</span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-bold text-white mb-3">
                  First Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 bg-gray-700/50 font-medium ${validationErrors.firstName ? 'border-red-400 bg-red-900/20' : 'border-gray-600/50 hover:border-amber-300'}`}
                    placeholder="Enter your first name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                {validationErrors.firstName && (
                  <p className="mt-2 text-sm text-red-400 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-bold text-white mb-3">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 bg-gray-700/50 font-medium ${validationErrors.lastName ? 'border-red-400 bg-red-900/20' : 'border-gray-600/50 hover:border-amber-300'}`}
                    placeholder="Enter your last name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                {validationErrors.lastName && (
                  <p className="mt-2 text-sm text-red-400 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 bg-gray-700/50 font-medium ${validationErrors.email ? 'border-red-400 bg-red-900/20' : 'border-gray-600/50 hover:border-amber-300'}`}
                  placeholder="Enter your email address"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              {validationErrors.email && (
                <p className="mt-2 text-sm text-red-400 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-bold text-white mb-3">
                Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-600/50 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 bg-gray-700/50 font-medium hover:border-amber-300"
                  placeholder="Enter your phone number"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-bold text-white mb-3">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 bg-gray-700/50 font-medium ${validationErrors.password ? 'border-red-400 bg-red-900/20' : 'border-gray-600/50 hover:border-amber-300'}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-2 text-sm text-red-400 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-white mb-3">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-2 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 text-white placeholder-gray-400 bg-gray-700/50 font-medium ${validationErrors.confirmPassword ? 'border-red-400 bg-red-900/20' : 'border-gray-600/50 hover:border-amber-300'}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full relative font-bold py-5 px-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/25 transition-all duration-300 transform shadow-2xl text-lg ${
                  loading
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-black cursor-wait scale-[0.98]'
                    : !isFormValid
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 hover:scale-[1.02] hover:shadow-3xl active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-bold text-white">Creating Your Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-white">
                    {!isFormValid ? (
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white font-bold">Please Fill All Required Fields</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-white">
                        <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-white font-bold">Create My Account</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Button shine effect */}
                {!loading && isFormValid && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transform translate-x-[-100%] hover:translate-x-[100%] transition-all duration-700"></div>
                )}
              </button>
              
              {!isFormValid && !loading && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-300 bg-gray-700/50 px-4 py-2 rounded-lg border border-gray-600/50">
                    <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Complete all required fields to enable account creation
                  </p>
                </div>
              )}
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-10 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-300 font-medium">Already have an account?</span>
              </div>
            </div>
            
            <Link 
              to="/signin" 
              className="inline-flex items-center justify-center w-full py-3 px-6 text-lg font-semibold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 rounded-xl transition-all duration-300 border-2 border-amber-400/20 hover:border-amber-500/30 group transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In to Your Account
            </Link>
            
            <div className="pt-6 border-t border-gray-700">
              <Link 
                to="/" 
                className="inline-flex items-center text-gray-400 hover:text-amber-400 transition-colors duration-300 font-medium group"
              >
                <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
