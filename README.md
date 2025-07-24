# RJ Gems - Luxury Jewelry E-Commerce Platform

A full-stack luxury jewelry e-commerce application built with React (Vite), Node.js/Express, MongoDB, and AI features powered by OpenAI.

## 🌟 Features

### Frontend (React + Vite + Tailwind CSS v4)
- **Modern Luxury Design**: Premium gold, black, and white color palette
- **Responsive Layout**: Mobile-first design that works on all devices
- **Component Architecture**: Modular React components for maintainability
- **Smooth Animations**: Hover effects and transitions for enhanced UX
- **Product Showcase**: High-quality image galleries with zoom functionality
- **Category Navigation**: Browse by rings, necklaces, earrings, and bracelets
- **Product Details**: Comprehensive product pages with specifications
- **Shopping Cart**: Add to cart functionality with quantity selection

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Clean API endpoints for product management
- **MongoDB Integration**: Scalable database with optimized schemas
- **Product Management**: CRUD operations for jewelry products
- **Category Filtering**: Advanced filtering by category, price, and features
- **Image Handling**: Multiple product images with URL storage
- **Error Handling**: Comprehensive error handling and validation
- **Security**: CORS, Helmet, and other security middleware
- **Logging**: Request logging with Morgan

### AI Features (OpenAI Integration)
- **Smart Product Recommendations**: AI-powered similar product suggestions
- **Dynamic Description Generation**: AI-enhanced product descriptions
- **Natural Language Search**: Search products using natural language queries
- **Content Enhancement**: Improve existing product content with AI

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API Key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RJ-Gems-project
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rjgems
   PORT=5000
   CLIENT_URL=http://localhost:5173
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Seed the database**
   ```bash
   cd ../server
   npm run seed
   ```

### Running the Application

1. **Development mode (both frontend and backend)**
   ```bash
   # From the root directory
   npm run dev
   ```

2. **Or run individually:**

   **Backend only:**
   ```bash
   cd server
   npm run dev
   ```

   **Frontend only:**
   ```bash
   cd client
   npm run dev
   ```

### Production Build

```bash
# Build the client
cd client
npm run build

# Start the production server
cd ../server
npm start
```

## 📁 Project Structure

```
RJ-Gems-project/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.jsx      # Navigation header
│   │   │   ├── Hero.jsx        # Homepage hero section
│   │   │   ├── ProductCard.jsx # Product card component
│   │   │   ├── ProductGrid.jsx # Product grid layout
│   │   │   ├── Categories.jsx  # Category showcase
│   │   │   └── Footer.jsx      # Site footer
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx    # Main homepage
│   │   │   └── ProductDetailPage.jsx # Product details
│   │   ├── services/           # API services
│   │   │   └── api.js          # API communication layer
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # App entry point
│   ├── vite.config.js          # Vite configuration
│   └── package.json            # Client dependencies
├── server/                     # Node.js backend
│   ├── models/                 # MongoDB schemas
│   │   └── Product.js          # Product data model
│   ├── routes/                 # API route handlers
│   │   └── products.js         # Product API endpoints
│   ├── server.js               # Express server setup
│   ├── seedDatabase.js         # Database seeding script
│   └── package.json            # Server dependencies
├── package.json                # Root package.json
└── README.md                   # This file
```

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#D4AF37` - Main accent color
- **Light Gold**: `#F4E4A6` - Highlights and backgrounds
- **Dark Gold**: `#B8860B` - Hover states and emphasis
- **Primary Black**: `#1A1A1A` - Text and contrasts
- **White**: `#FFFFFF` - Backgrounds and text on dark
- **Gray Scale**: Various shades for UI elements

### Typography
- **Primary Font**: Inter (system fonts fallback)
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400)
- **Accents**: Medium weight (500)

### Component Guidelines
- **Cards**: Subtle shadows with hover effects
- **Buttons**: Gradient backgrounds with smooth transitions
- **Images**: Aspect ratio maintained with lazy loading
- **Spacing**: Consistent padding and margins using Tailwind classes

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/recommendations` - Get AI recommendations
- `POST /api/products/:id/regenerate-description` - AI description generation
- `POST /api/products/ai-search` - Natural language search

### Query Parameters
- `category` - Filter by category (rings, necklaces, earrings, bracelets)
- `featured` - Filter featured products
- `search` - Text search in name and description
- `minPrice` / `maxPrice` - Price range filtering
- `limit` - Limit number of results

## 🤖 AI Features

### Product Recommendations
Uses OpenAI to analyze product attributes and suggest similar items based on:
- Category and style
- Material and pricing
- Customer preferences

### Description Enhancement
AI-powered description regeneration that creates:
- Compelling product narratives
- Luxury-focused language
- SEO-optimized content

### Smart Search
Natural language search that understands queries like:
- "Show me gold rings under $1000"
- "Diamond necklaces for special occasions"
- "Elegant earrings for daily wear"

## 🔒 Security Features

- **CORS Protection**: Configured for frontend domain
- **Helmet.js**: Security headers and protection
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Secure error messages
- **Environment Variables**: Sensitive data protection

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Tablet Optimized**: Enhanced layouts for tablets
- **Desktop Enhanced**: Full-featured desktop experience
- **Touch Friendly**: Large tap targets and smooth interactions

## 🚀 Performance Optimizations

- **Image Lazy Loading**: Improves initial page load
- **Component Code Splitting**: Reduces bundle size
- **MongoDB Indexing**: Optimized database queries
- **Caching Headers**: Static asset caching
- **Minified Assets**: Compressed CSS and JavaScript

## 🧪 Development Features

- **Hot Module Replacement**: Instant development updates
- **ESLint Configuration**: Code quality enforcement
- **Error Boundaries**: Graceful error handling
- **Development Logging**: Detailed request/response logging

## 📈 Future Enhancements

- **User Authentication**: User accounts and profiles
- **Shopping Cart Persistence**: Save cart across sessions
- **Payment Integration**: Stripe/PayPal integration
- **Inventory Management**: Stock tracking and management
- **Order Management**: Order processing and tracking
- **Admin Dashboard**: Product and order management
- **Email Notifications**: Order confirmations and updates
- **Product Reviews**: Customer feedback system
- **Wishlist Functionality**: Save favorite products

## 🛠️ Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or check connection string
- Verify network access for MongoDB Atlas

**Frontend API Errors:**
- Check if backend server is running on port 5000
- Verify CORS configuration matches frontend URL

**AI Features Not Working:**
- Ensure OpenAI API key is set in environment variables
- Check API key validity and usage limits

**Build Errors:**
- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions
