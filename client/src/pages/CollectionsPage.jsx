import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';

const CollectionsPage = () => {
  const { category } = useParams();
  
  const collections = [
    {
      id: 'engagement',
      name: 'Engagement Collection',
      description: 'Timeless rings to celebrate your eternal love',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop',
      featured: true
    },
    {
      id: 'wedding',
      name: 'Wedding Bands',
      description: 'Perfect bands to symbolize your union',
      image: 'https://images.unsplash.com/photo-1603561596112-db122758d8b9?w=800&h=600&fit=crop',
      featured: true
    },
    {
      id: 'vintage',
      name: 'Vintage Inspired',
      description: 'Classic designs with modern craftsmanship',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
      featured: false
    },
    {
      id: 'contemporary',
      name: 'Contemporary',
      description: 'Modern designs for the fashion-forward',
      image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800&h=600&fit=crop',
      featured: false
    },
    {
      id: 'luxury',
      name: 'Luxury Collection',
      description: 'Our most exquisite and precious pieces',
      image: 'https://images.unsplash.com/photo-1588444645510-d3036aa3d0b1?w=800&h=600&fit=crop',
      featured: true
    },
    {
      id: 'custom',
      name: 'Custom Design',
      description: 'Bespoke jewelry crafted just for you',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop',
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=800&fit=crop"
            alt="Jewelry collections"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Exquisite
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Collections
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our carefully curated collections, each piece telling a unique story of elegance, 
              craftsmanship, and timeless beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {collection.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-sm text-gray-200">{collection.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <Link 
                    to={`/category/${collection.name.toLowerCase()}`}
                    className="block w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-600 hover:text-black transition-all duration-300 font-semibold text-center"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid 
        title="Featured Pieces from Our Collections" 
        featured={true} 
        limit={8} 
      />

      {/* About Collections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Crafted with Passion, Designed for Eternity
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Each collection at RJ Gems represents a different facet of luxury and elegance. 
              From timeless engagement rings that symbolize eternal love to contemporary pieces 
              that make bold fashion statements, our collections are thoughtfully curated to 
              celebrate life's most precious moments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600 text-sm">Only the finest materials and gemstones</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
                <p className="text-gray-600 text-sm">Handcrafted by master artisans</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeless Design</h3>
                <p className="text-gray-600 text-sm">Elegant pieces that never go out of style</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;
