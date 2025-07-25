const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mockProducts = require('../mockData');
const mongoose = require('mongoose');

// For Node.js versions that don't have fetch built-in
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Helper function to filter mock data
const filterMockProducts = (query, limit) => {
  let filtered = [...mockProducts];
  
  // Category filter
  if (query.category) {
    filtered = filtered.filter(p => p.category === query.category);
  }
  
  // Featured filter
  if (query.featured === 'true') {
    filtered = filtered.filter(p => p.featured === true);
  }
  
  // Price range filter
  if (query.minPrice || query.maxPrice) {
    filtered = filtered.filter(p => {
      if (query.minPrice && p.price < parseFloat(query.minPrice)) return false;
      if (query.maxPrice && p.price > parseFloat(query.maxPrice)) return false;
      return true;
    });
  }
  
  // Text search (simple implementation)
  if (query.search) {
    const searchTerm = query.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply limit
  return filtered.slice(0, parseInt(limit));
};

// GET /api/products - Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, featured, search, minPrice, maxPrice, limit = 20 } = req.query;
    
    let useDatabase = false;
    let products = [];
    
    // Try to fetch from database first (if connected and has data)
    if (mongoose.connection.readyState === 1 && !global.mockDataMode) {
      try {
        let query = {};
        
        // Category filter
        if (category) {
          query.category = category;
        }
        
        // Featured filter
        if (featured === 'true') {
          query.featured = true;
        }
        
        // Price range filter
        if (minPrice || maxPrice) {
          query.price = {};
          if (minPrice) query.price.$gte = parseFloat(minPrice);
          if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        
        // Text search
        if (search) {
          query.$text = { $search: search };
        }
        
        products = await Product.find(query)
          .limit(parseInt(limit))
          .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 });
        
        useDatabase = true;
      } catch (dbError) {
        console.log('📦 Database query failed, falling back to mock data:', dbError.message);
        useDatabase = false;
      }
    }
    
    // Use mock data if database is not available or has no data
    if (!useDatabase || products.length === 0) {
      products = filterMockProducts({ category, featured, search, minPrice, maxPrice }, limit);
      return res.json({
        success: true,
        count: products.length,
        data: products,
        message: useDatabase ? 'Database connected but empty - using mock data' : 'Using mock data (MongoDB not connected)'
      });
    }
    
    // Return database results
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    // Use mock data if MongoDB is not available
    if (global.mockDataMode) {
      const product = mockProducts.find(p => p._id === req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.json({
        success: true,
        data: product,
        message: 'Using mock data (MongoDB not connected)'
      });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// GET /api/products/:id/recommendations - Get AI-powered product recommendations
router.get('/:id/recommendations', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get similar products from same category
    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category
    }).limit(4);

    // Simple category-based recommendations
    let aiRecommendations = [];

    res.json({
      success: true,
      data: {
        similarProducts,
        aiRecommendations
      }
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations',
      error: error.message
    });
  }
});

// POST /api/products/:id/regenerate-description - AI-powered description regeneration
router.post('/:id/regenerate-description', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const prompt = `Write a luxurious, compelling product description for this jewelry item:
    Name: ${product.name}
    Category: ${product.category}
    Material: ${product.specifications?.material || 'Premium materials'}
    Stone: ${product.specifications?.stone || 'Fine gemstones'}
    Price: $${product.price}
    
    Create an elegant, sophisticated description that highlights the craftsmanship, luxury appeal, and emotional connection. 
    Focus on the beauty, quality, and perfect occasions for wearing this piece. 
    Keep it between 100-150 words and make it compelling for luxury jewelry customers.`;

    // Use Google Gemini API
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(GEMINI_URL, {
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
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const newDescription = data.candidates[0].content.parts[0].text.trim();

    // Update the product with new description
    product.description = newDescription;
    await product.save();

    res.json({
      success: true,
      description: newDescription,
      data: {
        newDescription,
        product
      }
    });
  } catch (error) {
    console.error('Error regenerating description:', error);
    
    // Fallback description
    const fallbackDescription = `Experience the exquisite craftsmanship of this stunning ${product.category.toLowerCase()}. 
    Meticulously designed with attention to every detail, this ${product.name.toLowerCase()} represents the perfect fusion of traditional artistry and contemporary elegance. 
    Crafted from premium materials, this piece is ideal for special occasions and makes a timeless addition to any jewelry collection. 
    Each element has been carefully selected to ensure lasting beauty and exceptional quality.`;
    
    res.json({
      success: true,
      description: fallbackDescription,
      data: {
        newDescription: fallbackDescription,
        product: { ...product.toObject(), description: fallbackDescription }
      }
    });
  }
});

// POST /api/products/ai-search - AI-powered natural language search
router.post('/ai-search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Basic search filters
    let searchFilters = {};
    let searchTerms = query.toLowerCase();

    // Build MongoDB query
    let mongoQuery = {};
    
    if (searchFilters.category) {
      mongoQuery.category = searchFilters.category;
    }
    
    if (searchFilters.minPrice || searchFilters.maxPrice) {
      mongoQuery.price = {};
      if (searchFilters.minPrice) mongoQuery.price.$gte = searchFilters.minPrice;
      if (searchFilters.maxPrice) mongoQuery.price.$lte = searchFilters.maxPrice;
    }

    // Use AI-extracted search terms or original query
    const searchText = searchFilters.searchText || searchTerms;
    if (searchText) {
      mongoQuery.$or = [
        { name: { $regex: searchText, $options: 'i' } },
        { description: { $regex: searchText, $options: 'i' } },
        { 'specifications.material': { $regex: searchText, $options: 'i' } },
        { 'specifications.stone': { $regex: searchText, $options: 'i' } }
      ];
    }

    const products = await Product.find(mongoQuery).limit(20);

    res.json({
      success: true,
      query: query,
      extractedFilters: searchFilters,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error in AI search:', error);
    res.status(500).json({
      success: false,
      message: 'Error performing AI search',
      error: error.message
    });
  }
});

module.exports = router;
