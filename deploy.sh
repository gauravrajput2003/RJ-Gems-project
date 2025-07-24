#!/bin/bash

# RJ Gems Deployment Script
echo "🚀 Starting RJ Gems Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

echo "📋 Pre-deployment Checklist:"
echo "1. ✓ Code is committed to Git"
echo "2. ✓ Environment variables are configured"
echo "3. ✓ MongoDB Atlas cluster is created"
echo "4. ✓ OpenAI API key is available (optional)"

echo ""
echo "🌐 Deployment Targets:"
echo "Frontend: Vercel (https://vercel.com)"
echo "Backend: Render (https://render.com)"
echo "Database: MongoDB Atlas (https://www.mongodb.com/atlas)"

echo ""
echo "📝 Next Steps:"
echo "1. Deploy Backend to Render:"
echo "   - Connect GitHub repository"
echo "   - Set build command: npm install"
echo "   - Set start command: node server.js"
echo "   - Add environment variables from .env.example"

echo ""
echo "2. Deploy Frontend to Vercel:"
echo "   - Connect GitHub repository"
echo "   - Set root directory: client"
echo "   - Add environment variable: VITE_API_BASE_URL=https://your-backend-url.onrender.com"

echo ""
echo "3. Update CORS settings:"
echo "   - Update CLIENT_URL in Render environment variables"
echo "   - Test the live application"

print_status "Deployment guide complete! Check README.md for detailed instructions."
