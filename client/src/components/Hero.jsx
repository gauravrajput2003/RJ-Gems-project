const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop"
          alt="Luxury jewelry collection"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Timeless
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Elegance
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Discover our exquisite collection of handcrafted jewelry, where each piece tells a story of luxury, artistry, and timeless beauty.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg">
              Explore Collection
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
              Watch Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 hidden lg:block">
        <div className="w-3 h-3 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
      </div>
      <div className="absolute top-1/2 right-1/4 hidden lg:block">
        <div className="w-2 h-2 bg-amber-500 rounded-full opacity-80 animate-pulse animation-delay-300"></div>
      </div>
      <div className="absolute bottom-1/4 right-12 hidden lg:block">
        <div className="w-2 h-2 bg-amber-300 rounded-full opacity-70 animate-pulse animation-delay-700"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2 tracking-wider uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/30 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
