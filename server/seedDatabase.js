const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample jewelry products data
const sampleProducts = [
  {
    name: "Diamond Solitaire Engagement Ring",
    price: 2999,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1603561596112-db122758d8b9?w=800"
    ],
    description: "Exquisite diamond solitaire ring featuring a brilliant cut diamond set in 18k white gold. The classic design showcases the diamond's natural brilliance and fire, making it the perfect symbol of eternal love.",
    category: "rings",
    specifications: {
      material: "18k White Gold",
      stone: "1.5ct Diamond",
      weight: "3.2g",
      size: "Adjustable",
      color: "White Gold"
    },
    featured: true,
    inStock: true
  },
  {
    name: "Vintage Pearl Drop Necklace",
    price: 1599,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
      "https://images.unsplash.com/photo-1588444645510-d3036aa3d0b1?w=800"
    ],
    description: "Timeless elegance meets contemporary design in this stunning pearl drop necklace. Features lustrous Akoya pearls suspended from a delicate gold chain, perfect for both formal occasions and everyday luxury.",
    category: "necklaces",
    specifications: {
      material: "14k Yellow Gold",
      stone: "Akoya Pearls",
      weight: "15.8g",
      size: "18 inches",
      color: "Gold"
    },
    featured: true,
    inStock: true
  },
  {
    name: "Emerald Cut Tennis Bracelet",
    price: 3499,
    images: [
      "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800"
    ],
    description: "Sophisticated tennis bracelet featuring emerald cut diamonds in a continuous line of sparkle. Each diamond is carefully selected for clarity and brilliance, set in platinum for lasting beauty.",
    category: "bracelets",
    specifications: {
      material: "Platinum",
      stone: "Emerald Cut Diamonds",
      weight: "22.1g",
      size: "7 inches",
      color: "Platinum"
    },
    featured: true,
    inStock: true
  },
  {
    name: "Rose Gold Hoop Earrings",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800"
    ],
    description: "Elegant rose gold hoop earrings with a contemporary twist. The warm tone of rose gold complements all skin types, while the secure closure ensures comfortable all-day wear.",
    category: "earrings",
    specifications: {
      material: "14k Rose Gold",
      stone: "None",
      weight: "4.6g",
      size: "Medium",
      color: "Rose Gold"
    },
    featured: false,
    inStock: true
  },
  {
    name: "Sapphire Cluster Ring",
    price: 2199,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800"
    ],
    description: "Stunning sapphire cluster ring featuring deep blue Ceylon sapphires surrounded by brilliant diamonds. The vintage-inspired design captures light beautifully from every angle.",
    category: "rings",
    specifications: {
      material: "18k Yellow Gold",
      stone: "Ceylon Sapphire & Diamonds",
      weight: "5.7g",
      size: "Adjustable",
      color: "Yellow Gold"
    },
    featured: false,
    inStock: true
  },
  {
    name: "Diamond Pendant Necklace",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
      "https://images.unsplash.com/photo-1588444645510-d3036aa3d0b1?w=800"
    ],
    description: "Delicate diamond pendant necklace perfect for layering or wearing alone. The brilliant cut diamond catches light beautifully, suspended from a fine gold chain.",
    category: "necklaces",
    specifications: {
      material: "14k White Gold",
      stone: "0.5ct Diamond",
      weight: "2.8g",
      size: "16 inches",
      color: "White Gold"
    },
    featured: true,
    inStock: true
  },
  {
    name: "Gold Charm Bracelet",
    price: 749,
    images: [
      "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800"
    ],
    description: "Classic gold charm bracelet with intricate detailing. Perfect for adding personal charms to create a unique piece that tells your story.",
    category: "bracelets",
    specifications: {
      material: "14k Yellow Gold",
      stone: "None",
      weight: "12.3g",
      size: "7.5 inches",
      color: "Yellow Gold"
    },
    featured: false,
    inStock: true
  },
  {
    name: "Pearl Stud Earrings",
    price: 599,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800"
    ],
    description: "Classic pearl stud earrings featuring lustrous cultured pearls. These timeless pieces are perfect for any occasion, from boardroom to ballroom.",
    category: "earrings",
    specifications: {
      material: "14k White Gold",
      stone: "Cultured Pearls",
      weight: "2.1g",
      size: "8mm",
      color: "White Gold"
    },
    featured: false,
    inStock: true
  },
  {
    name: "Infinity Love Ring",
    price: 449,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1603561596112-db122758d8b9?w=800"
    ],
    description: "Symbolic infinity ring representing eternal love and commitment. Crafted in sterling silver with a polished finish that never goes out of style.",
    category: "rings",
    specifications: {
      material: "Sterling Silver",
      stone: "None",
      weight: "3.1g",
      size: "Adjustable",
      color: "Silver"
    },
    featured: false,
    inStock: true
  },
  {
    name: "Statement Ruby Necklace",
    price: 4299,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
      "https://images.unsplash.com/photo-1588444645510-d3036aa3d0b1?w=800"
    ],
    description: "Bold statement necklace featuring a magnificent ruby centerpiece surrounded by diamonds. This piece demands attention and exudes luxury and sophistication.",
    category: "necklaces",
    specifications: {
      material: "18k Yellow Gold",
      stone: "Burma Ruby & Diamonds",
      weight: "45.2g",
      size: "16 inches",
      color: "Yellow Gold"
    },
    featured: true,
    inStock: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rjgems', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connected to MongoDB

    // Clear existing products
    await Product.deleteMany({});
    // Cleared existing products

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    // Successfully seeded products

    // Display summary
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    // Products by category:
    categories.forEach(cat => {
      // ${cat._id}: ${cat.count} products
    });

    const featuredCount = await Product.countDocuments({ featured: true });
    // Featured products: ${featuredCount}

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    // Database connection closed
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
