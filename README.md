# RJ Gems - Luxury Jewelry E-Commerce Platform

![RJ Gems Logo](https://img.shields.io/badge/RJ%20Gems-Luxury%20Jewelry-gold?style=for-the-badge)

A sophisticated AI-powered luxury jewelry e-commerce platform built with modern web technologies, featuring intelligent product recommendations, AI-generated descriptions, and seamless user experience.

## 🌟 Live Demo

**🔗 [Live Application](https://rj-gems-frontend.vercel.app)**  
**🔗 [Backend API](https://rj-gems-backend.onrender.com)**

> **Note**: If the application takes time to load initially, it's because the backend server (hosted on Render) goes to sleep after inactivity and needs a moment to wake up.

## 🚀 Project Overview

This is a comprehensive full-stack e-commerce platform that goes beyond basic requirements, featuring:
- **Professional Homepage**: Elegant hero section with featured products showcase
- **Advanced Product Detail Pages**: Comprehensive product information with AI enhancements
- **AI-Powered Features**: Intelligent recommendations, content generation, and chatbot assistance
- **Modern Authentication**: Secure user registration and login system
- **Responsive Design**: Mobile-first approach with luxury aesthetics

## 🎯 Features

### Core E-Commerce Functionality
- **Professional Homepage**: Elegant hero section with featured products showcase
- **Product Detail Pages**: Comprehensive product information with image galleries
- **User Authentication**: Secure sign-up/sign-in system with JWT tokens
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional UI/UX**: Dark theme with luxury jewelry aesthetics
- **Shopping Cart Integration**: Seamless cart management
- **User Dashboard**: Personalized user experience

### AI-Powered Features 🤖
- **AI Product Recommendations**: Intelligent suggestions based on user preferences
- **AI Description Generator**: Dynamic product descriptions using OpenAI API
- **AI Product Suggestions**: Smart cross-selling recommendations
- **AI Chatbot Assistant**: Interactive jewelry consultant for customer support
- **Content Generation**: Automated product content enhancement

### Advanced Features
- **Real-time Product Search**: Instant search with filtering capabilities
- **Dynamic Product Categories**: Organized jewelry collections
- **API Integration**: RESTful backend services
- **Professional Authentication**: JWT-based secure user management

## �️ Tech Stack

### Frontend
- **React 18+**: Modern React with hooks and functional components
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS v4**: Utility-first CSS framework with custom luxury theme
- **React Router**: Client-side routing and navigation
- **Axios**: HTTP client for API communication

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **CORS**: Cross-origin resource sharing
- **bcryptjs**: Password hashing and security

### AI Integration
- **OpenAI API**: GPT-powered content generation and recommendations
- **AI Agents**: Autonomous product suggestion system
- **Natural Language Processing**: Enhanced search and interaction

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Git**: Version control
- **VS Code**: Development environment

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **MongoDB** (v4.4 or higher)
- **Git**

## 🚀 Local Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gauravrajput2003/RJ-Gems-project.git
cd RJ-Gems-project
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Backend Setup
```bash
# Navigate to server directory (or stay in root)
# Install backend dependencies if not already installed
npm install

# Create environment variables file
cp .env.example .env
# Edit .env file with your configuration
```

### 4. Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/rjgems
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/rjgems

# JWT Secret
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Server Configuration
PORT=5000
NODE_ENV=development

# AI Integration (Optional but recommended)
OPENAI_API_KEY=your-openai-api-key-here

# CORS
CLIENT_URL=http://localhost:5173
```

### 5. Database Setup
```bash
# Start MongoDB locally (if using local MongoDB)
mongod

# Or use MongoDB Compass to connect to your database
# The application will create collections automatically on first run
```

### 6. Start Backend Server
```bash
# From root directory
npm run server
# or
node server.js

# Server will start on http://localhost:5000
```

### 7. Frontend Setup
```bash
# Open new terminal and navigate to client directory
cd client

# Install frontend dependencies
npm install

# Start development server
npm run dev

# Frontend will start on http://localhost:5173
```

### 8. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🎯 Quick Start (Alternative Method)

For rapid setup, you can also use the provided scripts:

```bash
# Install all dependencies (root + client)
npm run install-all

# Start both frontend and backend concurrently
npm run dev
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
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── JewelryAssistant.jsx
│   │   │   ├── AIRecommendations.jsx
│   │   │   ├── AIDescriptionGenerator.jsx
│   │   │   └── WelcomeBanner.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── SignInPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── contexts/           # React contexts
│   │   │   └── AuthContext.js
│   │   ├── services/           # API services
│   │   │   └── api.jsx
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Node.js application
│   ├── models/                 # MongoDB models
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── ai.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js
│   ├── server.js               # Main server file
│   └── package.json
├── .gitignore
├── README.md
└── package.json
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### AI Features
- `POST /api/ai/recommendations` - Get AI product recommendations
- `POST /api/ai/generate-description` - Generate AI product description
- `POST /api/ai/chat` - AI chatbot interaction

## 🤖 AI Features Implementation

### OpenAI Integration
The platform leverages OpenAI's GPT models for:
- **Dynamic Content Generation**: Product descriptions and marketing content
- **Intelligent Recommendations**: Personalized product suggestions
- **Customer Support**: AI-powered chatbot for jewelry consultation

### AI Agent Functionality
- **Autonomous Product Analysis**: Automatic categorization and tagging
- **Smart Search**: Natural language product discovery
- **Personalization Engine**: User behavior-based recommendations

## 🔧 Available Scripts

### Root Directory
```bash
npm run dev              # Start both client and server in development
npm run install-all      # Install dependencies for both client and server
npm run server           # Start server only
npm run client           # Start client only
```

### Frontend (client/)
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Backend (server/)
```bash
npm start                # Start production server
npm run dev              # Start development server with nodemon
```

## 🚀 Deployment Guide

### Quick Deployment Summary
- **Frontend**: Deployed on Vercel (recommended for React apps)
- **Backend**: Deployed on Render (free tier with MongoDB Atlas)
- **Database**: MongoDB Atlas (cloud database)

### Step-by-Step Deployment

#### 1. Database Setup (MongoDB Atlas)
```bash
# 1. Create a free account at https://www.mongodb.com/atlas
# 2. Create a new cluster (free tier)
# 3. Create a database user with read/write permissions
# 4. Get your connection string (replace <password> with your actual password)
# Example: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rjgems
```

#### 2. Backend Deployment (Render)
```bash
# 1. Push your code to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to https://render.com and connect your GitHub account
# 3. Create a new Web Service
# 4. Connect your repository
# 5. Configure the following:
#    - Build Command: npm install
#    - Start Command: node server.js
#    - Environment Variables (see below)
```

**Environment Variables for Render:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rjgems
JWT_SECRET=your-super-secure-jwt-secret-key-here
PORT=5000
CLIENT_URL=https://your-frontend-domain.vercel.app
OPENAI_API_KEY=your-openai-api-key-here
```

#### 3. Frontend Deployment (Vercel)
```bash
# 1. Install Vercel CLI (optional, or use web interface)
npm install -g vercel

# 2. From your client directory
cd client

# 3. Update API base URL for production
# Create client/.env.production file:
echo "VITE_API_BASE_URL=https://your-backend-domain.onrender.com" > .env.production

# 4. Deploy to Vercel
vercel --prod

# Or use Vercel web interface:
# - Go to https://vercel.com
# - Import your GitHub repository
# - Set root directory to "client"
# - Add environment variable: VITE_API_BASE_URL=https://your-backend-domain.onrender.com
```

#### 4. Update CORS Configuration
After getting your frontend URL, update your backend CORS configuration:
```javascript
// In server.js, update CLIENT_URL environment variable on Render
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### Alternative Deployment Options

#### Frontend Alternatives
- **Netlify**: Similar to Vercel, drag & drop deployment
- **GitHub Pages**: For static sites (requires build setup)
- **Firebase Hosting**: Google's hosting platform

#### Backend Alternatives
- **Railway**: Similar to Render with PostgreSQL support
- **Heroku**: Established platform (requires credit card)
- **DigitalOcean App Platform**: More advanced deployment options

### Environment Variables Reference

**Backend (.env for Render):**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rjgems
JWT_SECRET=your-jwt-secret-min-32-characters-long
PORT=5000
CLIENT_URL=https://your-vercel-app.vercel.app
OPENAI_API_KEY=sk-your-openai-api-key
```

**Frontend (.env.production for Vercel):**
```env
VITE_API_BASE_URL=https://your-render-app.onrender.com
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
# Build the project
cd client
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=dist
```

### Backend Deployment (Render/Railway/Heroku)
Make sure to set environment variables in your hosting platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- `CLIENT_URL`

## 🎨 Design System

### Color Palette
- **Primary**: Gold/Amber (#F59E0B, #D97706)
- **Secondary**: Black/Dark Gray (#111827, #374151)
- **Background**: Dark gradient (gray-900 to black)
- **Text**: White/Light Gray for contrast
- **Accent**: Amber/Yellow for highlights

### Key Design Features
- **Dark Theme**: Professional dark theme throughout
- **Luxury Aesthetics**: Gold accents with premium feel
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Hover effects and transitions

## 👨‍💻 Developer Profile

**Gaurav Rajput**
- **Current Role**: Full Stack Developer at Programming Pathshala
- **Experience**: Specialized in React.js, Node.js, MongoDB, and AI integration
- **AI/ML Background**: 
  - Built a movie recommendation system with chatbot using Gemini AI API
  - Experience with OpenAI GPT integration
  - Knowledge of AI agents and autonomous systems
  - Familiar with natural language processing and recommendation algorithms

### Previous AI Projects
- **Movie Recommendation System**: Developed an intelligent movie recommendation platform with integrated chatbot using Gemini AI API for personalized suggestions and user interaction
- **AI-Powered E-commerce**: This RJ Gems platform showcasing advanced AI integration in e-commerce applications

## 🚨 Important Notes

1. **OpenAI API Key**: For full AI functionality, you'll need an OpenAI API key
2. **MongoDB**: Ensure MongoDB is running before starting the server
3. **Environment Variables**: All required environment variables must be set
4. **Port Configuration**: Default ports are 5173 (client) and 5000 (server)

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```bash
# Make sure MongoDB is running
mongod
# Or check your MONGODB_URI in .env
```

**Port Already in Use:**
```bash
# Kill process on port 5000
npx kill-port 5000
# Or change PORT in .env file
```

**AI Features Not Working:**
- Check if OPENAI_API_KEY is set in .env
- Verify API key is valid and has credits

## 📞 Support & Contact

For any questions or support:
- **Email**: gauravrajput2003@gmail.com
- **GitHub**: [@gauravrajput2003](https://github.com/gauravrajput2003)
- **LinkedIn**: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Tailwind CSS for the design system
- React and Vite communities
- MongoDB for flexible data storage
- Programming Pathshala for development experience

---

⭐ **If this project helped you or showcases useful patterns, please star the repository!**

![Made with ❤️ by Gaurav Rajput](https://img.shields.io/badge/Made%20with%20❤️%20by-Gaurav%20Rajput-red?style=for-the-badge)

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




