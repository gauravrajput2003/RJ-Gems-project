import { useState, useRef, useEffect } from 'react';
import jewelryAssistantService from '../services/jewelryAssistantService';

const JewelryAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "👋 Hi! I'm your RJ Gems jewelry assistant. I can help you find the perfect piece, suggest gifts, explain trends, or answer any jewelry questions you have!",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = jewelryAssistantService.getQuickQuestions();

  // Debug log to confirm component is rendering
  useEffect(() => {
    // JewelryAssistant mounted
  }, []);

  // Monitor state changes
  useEffect(() => {
    // AI Chatbot state changed
  }, [isOpen]);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowQuickQuestions(false);

    try {
      const response = await jewelryAssistantService.sendMessage(message.trim());
      
      const assistantMessage = {
        type: 'assistant',
        content: response.message,
        timestamp: response.timestamp,
        error: !response.success
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to browse our jewelry collections!",
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = (e) => {
    // Toggle function called
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setIsOpen(prevState => {
      const newState = !prevState;
      // State changing
      return newState;
    });
  };

  const clearChat = () => {
    setMessages([
      {
        type: 'assistant',
        content: "Chat cleared! How can I help you with jewelry today?",
        timestamp: new Date().toISOString()
      }
    ]);
    setShowQuickQuestions(true);
    jewelryAssistantService.clearHistory();
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          type="button"
          onClick={(e) => {
            // Main button clicked
            e.preventDefault();
            e.stopPropagation();
            toggleChatbot(e);
          }}
          className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 border-2 cursor-pointer focus:outline-none ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 rotate-45 animate-pulse border-red-400 shadow-red-500/50' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 border-blue-400 shadow-blue-500/50'
          }`}
          style={{
            boxShadow: isOpen 
              ? '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)' 
              : '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'auto',
            zIndex: 10000
          }}
        >
          {/* Enhanced pulsing ring effects */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-ping opacity-30"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-ping opacity-15" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-ping opacity-10" style={{ animationDelay: '1s' }}></div>
          
          {/* Enhanced sparkle effects */}
          {!isOpen && (
            <>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-90 shadow-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-200 rounded-full animate-pulse shadow-md"></div>
              <div className="absolute top-2 -left-2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -top-2 left-3 w-1 h-1 bg-white rounded-full animate-ping shadow-sm" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute bottom-2 right-1 w-1 h-1 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
            </>
          )}
          
          {isOpen ? (
            <svg className="w-8 h-8 text-white relative z-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative z-10 flex flex-col items-center">
              <svg className="w-6 h-6 text-white mb-0.5 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div className="flex items-center space-x-0.5">
                <div className="w-1 h-1 bg-white rounded-full animate-bounce drop-shadow-sm"></div>
                <div className="w-1 h-1 bg-white rounded-full animate-bounce drop-shadow-sm" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-white rounded-full animate-bounce drop-shadow-sm" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          
          {/* Enhanced floating tooltip */}
          {!isOpen && (
            <div className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-gray-700">
              ✨ Ask RJ Gems AI Assistant
              <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-l-gray-900 border-t-2 border-b-2 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
            </div>
          )}
        </button>
        
        {/* Enhanced Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <div className="w-6 h-6 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full flex items-center justify-center animate-pulse shadow-xl border-2 border-white">
              <span className="text-white text-xs font-bold drop-shadow-sm">AI</span>
            </div>
            <div className="absolute inset-0 w-6 h-6 bg-red-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute inset-0 w-6 h-6 bg-pink-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
          </div>
        )}
        
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-30 blur-xl animate-pulse shadow-2xl"></div>
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9998] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RJ</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Jewelry Assistant</h3>
                  <p className="text-yellow-100 text-sm">Your personal jewelry expert</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  title="Clear chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={toggleChatbot}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                      : message.error
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-yellow-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {showQuickQuestions && messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">Quick questions:</p>
                <div className="grid gap-2">
                  {quickQuestions.slice(0, 4).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left p-2 text-sm bg-white hover:bg-yellow-50 border border-gray-200 hover:border-yellow-300 rounded-lg transition-all duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about jewelry..."
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none transition-colors duration-200"
                  rows="2"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by AI • Press Enter to send
            </p>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={toggleChatbot}
        />
      )}
    </>
  );
};

export default JewelryAssistant;
