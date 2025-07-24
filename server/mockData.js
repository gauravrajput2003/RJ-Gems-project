// Mock data for development when MongoDB is not available
const mockProducts = [
  {
    _id: "1",
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
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
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
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    name: "Emerald Cut Tennis Bracelet",
    price: 3499,
    images: [
      "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800"
    ],
    description: "Stunning tennis bracelet featuring emerald cut diamonds meticulously set in platinum. Each stone is hand-selected for maximum brilliance and clarity, creating an unparalleled luxury piece.",
    category: "bracelets",
    specifications: {
      material: "Platinum",
      stone: "5ct Total Diamond Weight",
      weight: "12.4g",
      size: "7 inches",
      color: "Platinum"
    },
    featured: false,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    name: "Rose Gold Diamond Studs",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800"
    ],
    description: "Classic diamond stud earrings in warm rose gold setting. These timeless pieces feature perfectly matched diamonds with exceptional cut and clarity, ideal for everyday elegance.",
    category: "earrings",
    specifications: {
      material: "14k Rose Gold",
      stone: "0.75ct Total Diamond Weight",
      weight: "2.1g",
      size: "6mm",
      color: "Rose Gold"
    },
    featured: false,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "5",
    name: "Sapphire Halo Engagement Ring",
    price: 2299,
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800"
    ],
    description: "Breathtaking sapphire engagement ring surrounded by a halo of brilliant diamonds. The deep blue sapphire is complemented by the sparkling diamond halo, creating a truly magnificent piece.",
    category: "rings",
    specifications: {
      material: "14k White Gold",
      stone: "2ct Blue Sapphire + Diamond Halo",
      weight: "4.7g",
      size: "Adjustable",
      color: "White Gold"
    },
    featured: true,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "6",
    name: "Gold Chain Necklace",
    price: 799,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
      "https://images.unsplash.com/photo-1588444645510-d3036aa3d0b1?w=800"
    ],
    description: "Elegant gold chain necklace with a sophisticated design. Perfect for layering or wearing alone, this versatile piece adds luxury to any outfit.",
    category: "necklaces",
    specifications: {
      material: "18k Yellow Gold",
      stone: "None",
      weight: "8.3g",
      size: "20 inches",
      color: "Gold"
    },
    featured: false,
    inStock: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = mockProducts;
