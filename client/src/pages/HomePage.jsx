import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import Categories from '../components/Categories.jsx';
import AIGiftRecommendations from '../components/AIGiftRecommendations.jsx';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <ProductGrid 
        title="Featured Collection" 
        featured={true} 
        limit={6} 
      />
      
      {/* Categories Section */}
      <Categories />
      
      {/* AI Gift Recommendations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Gift Recommendations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let our smart assistant help you find the perfect jewelry for any occasion
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AIGiftRecommendations />
          </div>
        </div>
      </section>
      
      {/* All Products Preview */}
      <ProductGrid 
        title="Latest Arrivals" 
        featured={false} 
        limit={8} 
      />
      
      {/* Newsletter/CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience Luxury Like Never Before
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              From engagement rings to statement necklaces, each piece in our collection is meticulously crafted to celebrate life's most precious moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105">
                Book Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
                Virtual Try-On
              </button>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Lifetime Warranty</h3>
              <p className="text-gray-400 text-sm">
                Every piece comes with our comprehensive lifetime warranty for your peace of mind.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Express Delivery</h3>
              <p className="text-gray-400 text-sm">
                Free express delivery on all orders above $500, delivered within 2-3 business days.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Craftsmanship</h3>
              <p className="text-gray-400 text-sm">
                Handcrafted by master jewelers with over 50 years of combined experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
