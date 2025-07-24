import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jewelryAssistantService from '../services/jewelryAssistantService';

const AIGiftRecommendations = ({ className = '' }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOccasion, setCurrentOccasion] = useState('Valentine\'s Day');

  const occasions = [
    'Valentine\'s Day',
    'Anniversary',
    'Birthday',
    'Engagement',
    'Mother\'s Day',
    'Christmas',
    'Graduation',
    'Wedding'
  ];

  useEffect(() => {
    generateRecommendations(currentOccasion);
  }, [currentOccasion]);

  const generateRecommendations = async (occasion) => {
    setIsLoading(true);
    
    const prompt = `Suggest 3 luxury jewelry pieces perfect for ${occasion} gifts. For each piece, provide: 1) Type of jewelry 2) Brief description 3) Why it's perfect for ${occasion} 4) Approximate budget range. Format as a short, engaging list.`;
    
    try {
      const response = await jewelryAssistantService.sendMessage(prompt);
      
      // Parse the response into structured recommendations
      const parsedRecommendations = parseRecommendations(response.message);
      setRecommendations(parsedRecommendations);
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      setRecommendations(getDefaultRecommendations(occasion));
    } finally {
      setIsLoading(false);
    }
  };

  const parseRecommendations = (text) => {
    // Simple parsing - in a real app, you might want more sophisticated parsing
    const lines = text.split('\n').filter(line => line.trim());
    const recommendations = [];
    
    for (let i = 0; i < Math.min(3, Math.ceil(lines.length / 2)); i++) {
      const title = lines[i * 2] || `Recommendation ${i + 1}`;
      const description = lines[i * 2 + 1] || 'Beautiful jewelry piece perfect for your special occasion.';
      
      recommendations.push({
        id: i + 1,
        title: title.replace(/^\d+\.?\s*/, '').replace(/^-\s*/, ''),
        description: description.replace(/^-\s*/, ''),
        icon: getIconForRecommendation(i)
      });
    }
    
    return recommendations.length > 0 ? recommendations : getDefaultRecommendations(currentOccasion);
  };

  const getIconForRecommendation = (index) => {
    const icons = [
      // Ring icon
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>,
      // Necklace icon
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>,
      // Earrings icon
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ];
    return icons[index % icons.length];
  };

  const getDefaultRecommendations = (occasion) => {
    const defaults = {
      'Valentine\'s Day': [
        { id: 1, title: 'Heart-Shaped Diamond Pendant', description: 'Classic symbol of love, perfect for expressing your feelings', icon: getIconForRecommendation(1) },
        { id: 2, title: 'Rose Gold Eternity Ring', description: 'Romantic and timeless, symbolizing endless love', icon: getIconForRecommendation(0) },
        { id: 3, title: 'Ruby Stud Earrings', description: 'Passionate red gemstones that capture the essence of romance', icon: getIconForRecommendation(2) }
      ],
      'Anniversary': [
        { id: 1, title: 'Diamond Tennis Bracelet', description: 'Elegant and sophisticated for milestone celebrations', icon: getIconForRecommendation(0) },
        { id: 2, title: 'Pearl Necklace Set', description: 'Timeless elegance that grows more beautiful with time', icon: getIconForRecommendation(1) },
        { id: 3, title: 'Sapphire Anniversary Ring', description: 'Blue sapphires represent loyalty and trust', icon: getIconForRecommendation(0) }
      ]
    };
    
    return defaults[occasion] || defaults['Valentine\'s Day'];
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">🎁 AI Gift Finder</h3>
              <p className="text-white/90 text-sm">Perfect jewelry for every occasion</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
            AI Powered
          </span>
        </div>

        {/* Occasion Selector */}
        <div className="mt-4">
          <select
            value={currentOccasion}
            onChange={(e) => setCurrentOccasion(e.target.value)}
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion} className="text-gray-900">
                {occasion}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={rec.id}
                className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-yellow-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white">
                    {rec.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/collections"
            className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 text-center shadow-lg hover:shadow-xl"
          >
            Browse Collections
          </Link>
          <button
            onClick={() => generateRecommendations(currentOccasion)}
            className="flex-1 bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            Get New Suggestions
          </button>
        </div>

        {/* Chat Prompt */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            💬 Need more personalized help? <button className="font-semibold underline hover:text-blue-800">Chat with our AI assistant</button> for custom recommendations!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIGiftRecommendations;
