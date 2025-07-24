const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

class JewelryAssistantService {
  constructor() {
    this.conversationHistory = [];
    this.jewelryContext = `
You are RJ Gems' AI jewelry shopping assistant, an expert consultant for luxury jewelry. You help customers:

1. Find perfect jewelry for occasions (weddings, anniversaries, gifts)
2. Suggest pieces within specific budgets
3. Explain jewelry trends, styles, and materials
4. Provide care and maintenance advice
5. Help with sizing and fit questions

IMPORTANT GUIDELINES:
- Always be helpful, friendly, and professional
- Focus on luxury jewelry: rings, necklaces, earrings, bracelets
- Mention RJ Gems products when relevant
- Ask clarifying questions to better assist customers
- Provide specific, actionable advice
- Keep responses conversational but informative
- If asked about prices, suggest budget ranges rather than exact prices
- Encourage viewing our collections for specific pieces

AVAILABLE CATEGORIES:
- Engagement Rings & Wedding Bands
- Diamond Jewelry
- Gold Jewelry (14k, 18k)
- Precious Stone Jewelry (Emerald, Ruby, Sapphire)
- Pearl Jewelry
- Fashion Jewelry
- Men's Jewelry

Always end responses with a helpful suggestion or question to continue the conversation.
    `;
  }

  async sendMessage(userMessage) {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Prepare the conversation context
      const conversationContext = this.conversationHistory
        .map(msg => `${msg.role === 'user' ? 'Customer' : 'Assistant'}: ${msg.content}`)
        .join('\n\n');

      const fullPrompt = `${this.jewelryContext}\n\nConversation:\n${conversationContext}\n\nAssistant:`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const assistantMessage = data.candidates[0].content.parts[0].text;
        
        // Add assistant response to conversation history
        this.conversationHistory.push({
          role: 'assistant',
          content: assistantMessage
        });

        // Keep conversation history manageable (last 10 messages)
        if (this.conversationHistory.length > 10) {
          this.conversationHistory = this.conversationHistory.slice(-10);
        }

        return {
          success: true,
          message: assistantMessage,
          timestamp: new Date().toISOString()
        };
      } else {
        throw new Error('Invalid response format from Gemini API');
      }

    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback responses for common scenarios
      return {
        success: false,
        message: this.getFallbackResponse(userMessage),
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  }

  getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('gift') || message.includes('present')) {
      return "For gifts, I'd recommend classic pieces like diamond stud earrings, a delicate gold necklace, or a pearl bracelet. What's the occasion and your budget range? I can suggest more specific options from our RJ Gems collection!";
    }
    
    if (message.includes('budget') || message.includes('price') || message.includes('$')) {
      return "I'd be happy to help you find beautiful jewelry within your budget! Could you let me know your price range and what type of jewelry you're looking for? Our collection has stunning pieces across all price points.";
    }
    
    if (message.includes('ring') || message.includes('engagement')) {
      return "Rings are such a special choice! Are you looking for an engagement ring, wedding band, or fashion ring? I can help you explore our diamond, gold, and gemstone options based on your preferences.";
    }
    
    if (message.includes('trend') || message.includes('popular')) {
      return "Current jewelry trends include layered necklaces, stackable rings, and statement earrings. Gold jewelry and colored gemstones are particularly popular right now. What style appeals to you most?";
    }
    
    return "I'm here to help you find the perfect jewelry! I can assist with gift suggestions, budget recommendations, style advice, and more. What would you like to know about our RJ Gems collection?";
  }

  // Get suggested quick questions
  getQuickQuestions() {
    return [
      "What's trending in jewelry right now?",
      "Help me find a gift under $500",
      "What's the difference between 14k and 18k gold?",
      "Show me engagement ring styles",
      "How do I care for my jewelry?",
      "What jewelry goes with formal wear?"
    ];
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }

  // Get conversation history
  getHistory() {
    return this.conversationHistory;
  }
}

export default new JewelryAssistantService();
