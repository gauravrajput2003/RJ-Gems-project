import { useState } from 'react';
import apiService from '../services/api.jsx';

const AIDescriptionGenerator = ({ product, onDescriptionUpdate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const generateDescription = async () => {
    setIsGenerating(true);
    setShowOptions(false);
    
    try {
      const response = await apiService.regenerateDescription(product._id);
      const newDescription = response.description || response.data?.description;
      
      setGeneratedDescription(newDescription);
      setShowPreview(true);
    } catch (error) {
      console.error('Error generating description:', error);
      // Fallback description generation
      setGeneratedDescription(
        `Experience the exquisite craftsmanship of this stunning ${product.category.toLowerCase()}. 
        Meticulously designed with attention to every detail, this ${product.name.toLowerCase()} 
        represents the perfect fusion of traditional artistry and contemporary elegance. 
        Crafted from premium materials, this piece is ideal for special occasions and 
        makes a timeless addition to any jewelry collection. Each element has been 
        carefully selected to ensure lasting beauty and exceptional quality.`
      );
      setShowPreview(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const acceptDescription = () => {
    onDescriptionUpdate(generatedDescription);
    setShowPreview(false);
    setGeneratedDescription('');
  };

  const rejectDescription = () => {
    setShowPreview(false);
    setGeneratedDescription('');
  };

  if (showPreview) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">AI-Generated Description</h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              ✨ Fresh Content
            </span>
          </div>
          <button
            onClick={() => setShowPreview(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-gray-800 leading-relaxed">
            {generatedDescription}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button
              onClick={acceptDescription}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Use This Description</span>
            </button>
            
            <button
              onClick={rejectDescription}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Discard</span>
            </button>
          </div>
          
          <button
            onClick={generateDescription}
            disabled={isGenerating}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Generate Another</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Chat Icon Button */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        title="AI Description Generator"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        
        {/* AI Badge */}
        <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          AI
        </div>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
      </button>

      {/* Options Dropdown */}
      {showOptions && (
        <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 w-80 z-50">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">AI Description Generator</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Generate a fresh, compelling description for this jewelry piece using advanced AI.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={generateDescription}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>✨ Generate New Description</span>
                </>
              )}
            </button>
            
            <div className="text-xs text-gray-500 text-center">
              AI will create a unique, engaging description based on this product's details
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDescriptionGenerator;
