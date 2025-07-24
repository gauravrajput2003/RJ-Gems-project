const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// API service for communicating with the backend
class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Products API methods
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async getRecommendations(id) {
    return this.request(`/products/${id}/recommendations`);
  }

  async regenerateDescription(id) {
    return this.request(`/products/${id}/regenerate-description`, {
      method: 'POST',
    });
  }

  async aiSearch(query) {
    return this.request('/products/ai-search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
