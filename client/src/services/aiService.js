// AI Service for RJ Gems - Jewelry-focused AI features
class AIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GPT_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  // Generate product recommendations based on user preferences
  async generateProductRecommendations(userPreferences, products) {
    try {
      const prompt = this.createRecommendationPrompt(userPreferences, products);
      const response = await this.callGeminiAPI(prompt);
      return this.parseRecommendations(response);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return this.fallbackRecommendations(products);
    }
  }

  // Generate product descriptions using AI
  async generateProductDescription(productDetails) {
    try {
      const prompt = this.createDescriptionPrompt(productDetails);
      const response = await this.callGeminiAPI(prompt);
      return this.parseDescription(response);
    } catch (error) {
      console.error('Error generating description:', error);
      return this.fallbackDescription(productDetails);
    }
  }

  // AI-powered search with natural language
  async enhancedSearch(searchQuery, products) {
    try {
      const prompt = this.createSearchPrompt(searchQuery, products);
      const response = await this.callGeminiAPI(prompt);
      return this.parseSearchResults(response, products);
    } catch (error) {
      console.error('Error in AI search:', error);
      return this.fallbackSearch(searchQuery, products);
    }
  }

  // Generate gift suggestions based on occasion and recipient
  async generateGiftSuggestions(occasion, recipient, budget, products) {
    try {
      const prompt = this.createGiftPrompt(occasion, recipient, budget, products);
      const response = await this.callGeminiAPI(prompt);
      return this.parseGiftSuggestions(response, products);
    } catch (error) {
      console.error('Error generating gift suggestions:', error);
      return this.fallbackGiftSuggestions(products, budget);
    }
  }

  // Style advisor - suggest jewelry based on outfit or occasion
  async getStyleAdvice(occasion, style, metalPreference) {
    try {
      const prompt = this.createStylePrompt(occasion, style, metalPreference);
      const response = await this.callGeminiAPI(prompt);
      return this.parseStyleAdvice(response);
    } catch (error) {
      console.error('Error getting style advice:', error);
      return this.fallbackStyleAdvice(occasion, style);
    }
  }

  // Call Gemini API
  async callGeminiAPI(prompt) {
    const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`AI API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // Create prompts for different AI features
  createRecommendationPrompt(preferences, products) {
    return `As a luxury jewelry expert, recommend the best pieces from this collection based on user preferences.

User Preferences: ${JSON.stringify(preferences)}

Available Products: ${JSON.stringify(products.slice(0, 10))}

Please provide 3-5 product recommendations with brief explanations why each piece suits the user's preferences. Focus on style, occasion, price range, and material preferences. Return as JSON array with format:
[{"productId": "id", "reason": "why this piece is perfect", "confidence": 0.9}]`;
  }

  createDescriptionPrompt(productDetails) {
    return `Create an elegant, compelling product description for this luxury jewelry piece:

Product Details: ${JSON.stringify(productDetails)}

Write a sophisticated description that highlights:
- Craftsmanship and materials
- Design inspiration
- Suitable occasions
- Emotional appeal
- Technical specifications

Keep it elegant and luxury-focused, around 100-150 words.`;
  }

  createSearchPrompt(query, products) {
    return `Interpret this natural language jewelry search query and find matching products:

Search Query: "${query}"

Available Products: ${JSON.stringify(products.slice(0, 20))}

Understand the intent behind the search (style, occasion, price, material, etc.) and return matching product IDs ranked by relevance. Return as JSON:
{"interpretation": "what the user is looking for", "productIds": ["id1", "id2"], "confidence": 0.8}`;
  }

  createGiftPrompt(occasion, recipient, budget, products) {
    return `Suggest perfect jewelry gifts for this scenario:

Occasion: ${occasion}
Recipient: ${recipient}
Budget: ${budget}

Available Products: ${JSON.stringify(products.slice(0, 15))}

Recommend 3-5 pieces that would make perfect gifts, considering the occasion, recipient's likely preferences, and budget. Return as JSON:
[{"productId": "id", "giftReason": "why this makes a great gift", "occasionFit": "how it suits the occasion"}]`;
  }

  createStylePrompt(occasion, style, metalPreference) {
    return `As a jewelry styling expert, provide advice for:

Occasion: ${occasion}
Style Preference: ${style}
Metal Preference: ${metalPreference}

Provide styling advice including:
- Recommended jewelry types
- Styling tips
- What to avoid
- How to mix and match

Return practical, actionable advice in 150-200 words.`;
  }

  // Parse AI responses
  parseRecommendations(response) {
    try {
      const jsonMatch = response.match(/\[.*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing recommendations:', error);
    }
    return [];
  }

  parseDescription(response) {
    return response.replace(/["\[\]]/g, '').trim();
  }

  parseSearchResults(response, products) {
    try {
      const jsonMatch = response.match(/\{.*\}/s);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          interpretation: parsed.interpretation,
          products: products.filter(p => parsed.productIds.includes(p._id)),
          confidence: parsed.confidence || 0.5
        };
      }
    } catch (error) {
      console.error('Error parsing search results:', error);
    }
    return { interpretation: '', products: [], confidence: 0 };
  }

  parseGiftSuggestions(response, products) {
    try {
      const jsonMatch = response.match(/\[.*\]/s);
      if (jsonMatch) {
        const suggestions = JSON.parse(jsonMatch[0]);
        return suggestions.map(suggestion => ({
          ...suggestion,
          product: products.find(p => p._id === suggestion.productId)
        })).filter(s => s.product);
      }
    } catch (error) {
      console.error('Error parsing gift suggestions:', error);
    }
    return [];
  }

  parseStyleAdvice(response) {
    return response.replace(/["\[\]]/g, '').trim();
  }

  // Fallback methods when AI fails
  fallbackRecommendations(products) {
    return products.slice(0, 3).map(product => ({
      productId: product._id,
      reason: "Popular choice with excellent craftsmanship",
      confidence: 0.5
    }));
  }

  fallbackDescription(productDetails) {
    return `Exquisite ${productDetails.category} crafted with attention to detail. Features premium materials and timeless design perfect for any occasion.`;
  }

  fallbackSearch(query, products) {
    const searchTerm = query.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.description && product.description.toLowerCase().includes(searchTerm))
    );
    
    return {
      interpretation: `Searching for products matching "${query}"`,
      products: filtered,
      confidence: 0.3
    };
  }

  fallbackGiftSuggestions(products, budget) {
    const budgetNum = parseInt(budget.replace(/[^\d]/g, ''));
    const suitable = products.filter(p => p.price <= budgetNum * 1.2);
    
    return suitable.slice(0, 3).map(product => ({
      productId: product._id,
      product: product,
      giftReason: "Elegant choice that makes a memorable gift",
      occasionFit: "Suitable for special occasions"
    }));
  }

  fallbackStyleAdvice(occasion, style) {
    return `For ${occasion} with ${style} style, consider pieces that complement your outfit. Focus on balance - if wearing statement clothing, choose subtle jewelry, and vice versa.`;
  }
}

export default new AIService();
