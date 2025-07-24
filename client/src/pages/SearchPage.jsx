import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import AISearchBar from '../components/AISearchBar.jsx';
import AIGiftAdvisor from '../components/AIGiftAdvisor.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(null);
  const [activeTab, setActiveTab] = useState('search');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setActiveTab('search');
      // You could trigger a search here with the query parameter
    }
  }, [searchParams]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setSearchParams({ q: results.query });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI-Powered Jewelry
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Discovery
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Use natural language to find your perfect piece, or get personalized gift recommendations
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'search'
                    ? 'bg-white text-gray-900'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                🔍 Smart Search
              </button>
              <button
                onClick={() => setActiveTab('gift')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'gift'
                    ? 'bg-white text-gray-900'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                🎁 Gift Advisor
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {activeTab === 'search' && (
            <div className="max-w-2xl mx-auto">
              <AISearchBar onSearchResults={handleSearchResults} />
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'search' && (
            <>
              {searchResults ? (
                <div>
                  {/* Search Results Header */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Search Results for "{searchResults.query}"
                        </h2>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">
                            {searchResults.results.length} products found
                          </span>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                              searchResults.confidence > 0.7 ? 'bg-green-500' :
                              searchResults.confidence > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm text-gray-500">
                              AI Confidence: {Math.round(searchResults.confidence * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSearchResults(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {searchResults.interpretation && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-blue-800">
                              <strong>AI Understanding:</strong> {searchResults.interpretation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Search Results Grid */}
                  {searchResults.results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {searchResults.results.map((product) => (
                        <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                          <div className="aspect-square relative overflow-hidden">
                            <img
                              src={product.images?.[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-2xl font-bold text-yellow-600">
                                ${product.price?.toLocaleString()}
                              </span>
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                {product.category}
                              </span>
                            </div>
                            <Link
                              to={`/product/${product._id}`}
                              className="block w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 hover:text-black transition-all duration-300 font-semibold text-center"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-600 mb-6">Try refining your search or browse our collections</p>
                      <Link
                        to="/collections"
                        className="inline-flex items-center px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                      >
                        Browse Collections
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {/* Search Examples */}
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Try These AI-Powered Searches</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Engagement rings with vintage styling under $3000",
                        "Gold necklaces perfect for a wedding ceremony",
                        "Statement earrings for a black-tie event",
                        "Minimalist jewelry for everyday wear",
                        "Anniversary gifts for someone who loves diamonds",
                        "Bracelets that would complement a business outfit"
                      ].map((example, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            // Trigger search with example
                            const searchBar = document.querySelector('input[placeholder*="Try:"]');
                            if (searchBar) {
                              searchBar.value = example;
                              searchBar.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                          }}
                          className="text-left p-4 bg-gray-50 rounded-lg hover:bg-yellow-50 hover:border-yellow-200 border border-gray-200 transition-colors"
                        >
                          <span className="text-gray-700">"{example}"</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Featured Products */}
                  <ProductGrid title="Featured Products" featured={true} limit={8} />
                </div>
              )}
            </>
          )}

          {activeTab === 'gift' && <AIGiftAdvisor />}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
