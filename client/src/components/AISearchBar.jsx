import { useState } from 'react';
import aiService from '../services/aiService.js';
import apiService from '../services/api.jsx';

const AISearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const searchSuggestions = [
    "Engagement rings under $3000",
    "Gold necklaces for wedding",
    "Diamond earrings for anniversary",
    "Vintage style bracelets",
    "Modern minimalist jewelry",
    "Statement pieces for formal events"
  ];

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      // Get all products first
      const response = await apiService.getProducts();
      const products = response.data || response;
      
      // Use AI to enhance the search
      const aiResults = await aiService.enhancedSearch(searchQuery, products);
      
      onSearchResults({
        query: searchQuery,
        interpretation: aiResults.interpretation,
        results: aiResults.products,
        confidence: aiResults.confidence
      });
      
      setQuery('');
      setSuggestions([]);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to basic search
      const response = await apiService.getProducts();
      const products = response.data || response;
      const basicResults = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      onSearchResults({
        query: searchQuery,
        interpretation: `Basic search for "${searchQuery}"`,
        results: basicResults,
        confidence: 0.3
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Show suggestions when typing
    if (value.length > 2) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Try: 'diamond rings for proposal' or 'gold necklace under $1000'"
          className="w-full px-4 py-3 pr-12 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white"
          disabled={isLoading}
        />
        
        <button
          onClick={() => handleSearch()}
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-yellow-600 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full bg-black"></div>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* AI-powered suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 text-xs text-gray-500 border-b border-gray-100 bg-yellow-50">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              AI Suggestions
            </span>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => selectSuggestion(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm border-b border-gray-100 last:border-b-0"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AISearchBar;
