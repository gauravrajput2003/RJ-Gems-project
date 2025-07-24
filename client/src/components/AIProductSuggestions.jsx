import { useState, useEffect } from 'react';
import jewelryAssistantService from '../services/jewelryAssistantService';

const AIProductSuggestions = ({ product, className = '' }) => {
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (product && product.name) {
      generateSuggestions();
    }
  }, [product]);

  const generateSuggestions = async () => {
    setIsLoading(true);
    
    const prompt = `Based on this jewelry piece: "${product.name}" in category "${product.category}" priced at $${product.price}, provide 2-3 brief styling suggestions or occasions where this piece would be perfect. Keep it concise and engaging, focusing on luxury appeal.`;
    
    try {
      const response = await jewelryAssistantService.sendMessage(prompt);
      setSuggestions(response.message);
      setIsVisible(true);
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error);
      setSuggestions('This exquisite piece would make a perfect statement for special occasions or elegant everyday wear.');
      setIsVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product || (!isLoading && !suggestions)) return null;

  return (
    <div className={`bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-bold text-gray-900">✨ AI Styling Tips</h4>
            <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full">
              Powered by AI
            </span>
          </div>
          
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-600">Generating personalized suggestions...</span>
            </div>
          ) : (
            <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}`}>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {suggestions}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIProductSuggestions;
