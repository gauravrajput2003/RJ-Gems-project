import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import aiService from '../services/aiService.js';
import apiService from '../services/api.jsx';

const AIRecommendations = ({ currentProduct }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    style: currentProduct?.category || '',
    priceRange: currentProduct?.price ? `${Math.floor(currentProduct.price * 0.7)}-${Math.ceil(currentProduct.price * 1.3)}` : '',
    occasion: 'everyday',
    metalPreference: 'any'
  });

  useEffect(() => {
    if (currentProduct) {
      generateRecommendations();
    }
  }, [currentProduct]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getProducts();
      const products = response.data || response;
      
      // Create smart preferences based on current product
      const smartPreferences = {
        ...userPreferences,
        style: currentProduct.category,
        currentProductId: currentProduct._id,
        similarStyle: true
      };

      const aiRecommendations = await aiService.generateProductRecommendations(
        smartPreferences,
        products.filter(p => p._id !== currentProduct._id) // Exclude current product
      );

      setRecommendations(aiRecommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Fallback to similar category products
      const response = await apiService.getProducts();
      const products = response.data || response;
      const similarProducts = products
        .filter(p => p._id !== currentProduct._id && p.category === currentProduct.category)
        .slice(0, 4)
        .map(product => ({
          productId: product._id,
          product: product,
          reason: "Similar style and category",
          confidence: 0.6
        }));
      setRecommendations(similarProducts);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentProduct || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🤖 AI-Curated Recommendations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your interest in "{currentProduct.name}", our AI suggests these perfect matches
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
            <span className="ml-3 text-gray-600">AI is analyzing perfect matches...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.slice(0, 4).map((rec, index) => {
              // Get product data
              const product = rec.product || recommendations.find(r => r.productId === rec.productId)?.product;
              
              if (!product) return null;

              return (
                <div key={rec.productId || index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* AI Confidence Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        {Math.round((rec.confidence || 0.7) * 100)}%
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <p className="text-2xl font-bold text-yellow-600 mb-3">
                      ${product.price?.toLocaleString()}
                    </p>

                    {/* AI Reasoning */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4 rounded-r-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Why AI picked this:</strong> {rec.reason || 'Perfect style match for your preferences'}
                      </p>
                    </div>

                    <Link
                      to={`/product/${product._id}`}
                      className="block w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 hover:text-black transition-all duration-300 font-semibold text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Regenerate Button */}
        <div className="text-center mt-8">
          <button
            onClick={generateRecommendations}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : '🔄 Get New AI Recommendations'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
