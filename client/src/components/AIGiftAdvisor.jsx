import { useState } from 'react';
import aiService from '../services/aiService.js';
import apiService from '../services/api.jsx';
import { Link } from 'react-router-dom';

const AIGiftAdvisor = () => {
  const [formData, setFormData] = useState({
    occasion: '',
    recipient: '',
    budget: '',
    style: '',
    relationship: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const occasions = [
    'Engagement', 'Wedding', 'Anniversary', 'Birthday', 'Valentine\'s Day',
    'Mother\'s Day', 'Christmas', 'Graduation', 'Promotion', 'Just Because'
  ];

  const recipients = [
    'Partner/Spouse', 'Mother', 'Daughter', 'Sister', 'Friend',
    'Grandmother', 'Colleague', 'Myself'
  ];

  const budgets = [
    'Under $500', '$500 - $1,000', '$1,000 - $2,500', 
    '$2,500 - $5,000', '$5,000 - $10,000', 'Above $10,000'
  ];

  const styles = [
    'Classic/Traditional', 'Modern/Contemporary', 'Vintage/Antique',
    'Minimalist', 'Bold/Statement', 'Romantic', 'Bohemian'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getGiftSuggestions = async () => {
    if (!formData.occasion || !formData.recipient || !formData.budget) {
      alert('Please fill in at least occasion, recipient, and budget');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.getProducts();
      const products = response.data || response;
      const aiSuggestions = await aiService.generateGiftSuggestions(
        formData.occasion,
        formData.recipient,
        formData.budget,
        products
      );

      setSuggestions(aiSuggestions);
      setShowResults(true);
    } catch (error) {
      console.error('Error getting gift suggestions:', error);
      // Fallback suggestions
      const response = await apiService.getProducts();
      const products = response.data || response;
      const fallbackSuggestions = products.slice(0, 3).map(product => ({
        productId: product._id,
        product: product,
        giftReason: "Beautiful piece perfect for gifting",
        occasionFit: `Great choice for ${formData.occasion}`
      }));
      setSuggestions(fallbackSuggestions);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      occasion: '',
      recipient: '',
      budget: '',
      style: '',
      relationship: ''
    });
    setSuggestions([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎁 Perfect Gift Suggestions
          </h2>
          <p className="text-gray-600">
            AI-curated recommendations for {formData.recipient} on {formData.occasion}
          </p>
          <button
            onClick={resetForm}
            className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
          >
            ← Try Different Preferences
          </button>
        </div>

        {suggestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                {suggestion.product && (
                  <>
                    <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                      <img
                        src={suggestion.product.images?.[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'}
                        alt={suggestion.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {suggestion.product.name}
                    </h3>
                    <p className="text-2xl font-bold text-yellow-600 mb-3">
                      ${suggestion.product.price?.toLocaleString()}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                        <p className="text-sm text-green-800">
                          <strong>Why it's perfect:</strong> {suggestion.giftReason}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                        <p className="text-sm text-blue-800">
                          <strong>Occasion fit:</strong> {suggestion.occasionFit}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/product/${suggestion.product._id}`}
                      className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-semibold text-center"
                    >
                      View Details
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500">
              No suitable suggestions found. Try adjusting your preferences.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🤖 AI Gift Advisor
        </h2>
        <p className="text-gray-600">
          Let our AI help you find the perfect jewelry gift based on the occasion and recipient
        </p>
      </div>

      <div className="space-y-6">
        {/* Occasion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's the occasion? *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {occasions.map((occasion) => (
              <button
                key={occasion}
                onClick={() => handleInputChange('occasion', occasion)}
                className={`p-3 text-sm rounded-lg border transition-colors ${
                  formData.occasion === occasion
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>

        {/* Recipient */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Who is the recipient? *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {recipients.map((recipient) => (
              <button
                key={recipient}
                onClick={() => handleInputChange('recipient', recipient)}
                className={`p-3 text-sm rounded-lg border transition-colors ${
                  formData.recipient === recipient
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {recipient}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your budget? *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {budgets.map((budget) => (
              <button
                key={budget}
                onClick={() => handleInputChange('budget', budget)}
                className={`p-3 text-sm rounded-lg border transition-colors ${
                  formData.budget === budget
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>

        {/* Style Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Style preference (optional)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => handleInputChange('style', style)}
                className={`p-3 text-sm rounded-lg border transition-colors ${
                  formData.style === style
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Get Suggestions Button */}
        <div className="pt-6">
          <button
            onClick={getGiftSuggestions}
            disabled={isLoading || !formData.occasion || !formData.recipient || !formData.budget}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"></div>
                AI is thinking...
              </span>
            ) : (
              '✨ Get AI Gift Suggestions'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIGiftAdvisor;
