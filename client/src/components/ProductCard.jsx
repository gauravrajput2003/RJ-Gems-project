import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isAuthenticated } = useAuth();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleImageHover = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <div className={`group bg-white rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 ${
      isAuthenticated 
        ? 'shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-200' 
        : 'shadow-sm hover:shadow-xl'
    }`}>
      <Link to={`/product/${product._id}`}>
        {/* Image Container */}
        <div 
          className="relative overflow-hidden bg-gray-100 aspect-square"
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageLeave}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            src={product.images?.[currentImageIndex] || product.images?.[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </div>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className={`absolute top-3 left-3 text-black text-xs font-bold px-2 py-1 rounded-full ${
              isAuthenticated
                ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 shadow-lg shadow-amber-500/40 animate-shadow-pulse'
                : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
            }`}>
              ✨ Featured
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200 mb-2 block">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs font-medium text-yellow-600 uppercase tracking-wide">
              {product.category?.replace(/s$/, '')}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-200">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
            
            {product.specifications?.material && (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.specifications.material}
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                product.inStock ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Rating placeholder */}
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">(4.8)</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick Add to Cart */}
      <div className="px-4 pb-4">
        <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 hover:text-black transition-all duration-300 text-sm font-medium">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
