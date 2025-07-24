import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoryInfo = {
    rings: {
      title: 'Rings',
      description: 'Discover our exquisite collection of rings, from elegant engagement rings to sophisticated cocktail pieces.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=800&fit=crop',
      features: ['Engagement Rings', 'Wedding Bands', 'Cocktail Rings', 'Eternity Bands']
    },
    necklaces: {
      title: 'Necklaces',
      description: 'Elegant necklaces that enhance your natural beauty, from delicate pendants to statement pieces.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=800&fit=crop',
      features: ['Pendant Necklaces', 'Pearl Necklaces', 'Chain Necklaces', 'Statement Pieces']
    },
    earrings: {
      title: 'Earrings',
      description: 'Beautiful earrings to complement any style, from classic studs to dramatic chandelier designs.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&h=800&fit=crop',
      features: ['Stud Earrings', 'Drop Earrings', 'Hoop Earrings', 'Chandelier Earrings']
    },
    bracelets: {
      title: 'Bracelets',
      description: 'Sophisticated bracelets and bangles that add elegance to your wrist.',
      image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=1920&h=800&fit=crop',
      features: ['Tennis Bracelets', 'Charm Bracelets', 'Bangles', 'Cuff Bracelets']
    }
  };

  const currentCategory = categoryInfo[category] || {
    title: 'Jewelry Collection',
    description: 'Browse our beautiful collection of fine jewelry.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=800&fit=crop',
    features: []
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0">
          <img
            src={currentCategory.image}
            alt={currentCategory.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {currentCategory.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {currentCategory.description}
            </p>
            
            {currentCategory.features.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {currentCategory.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Best Selling</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Price Range:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                <option>All Prices</option>
                <option>Under $500</option>
                <option>$500 - $1,000</option>
                <option>$1,000 - $2,500</option>
                <option>$2,500 - $5,000</option>
                <option>Over $5,000</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <ProductGrid 
        title="" 
        category={category}
        limit={20} 
      />

      {/* Category Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose RJ Gems {currentCategory.title}?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our {category} collection represents the pinnacle of jewelry craftsmanship, 
              combining traditional techniques with contemporary design aesthetics. 
              Each piece is carefully selected or custom-crafted to ensure exceptional 
              quality and timeless appeal.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified Quality</h3>
                <p className="text-gray-600 text-sm">
                  All our pieces come with quality certificates and authenticity guarantees.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
                <p className="text-gray-600 text-sm">
                  Handcrafted by master jewelers with decades of experience and passion.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lifetime Warranty</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive warranty covering craftsmanship and material defects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
