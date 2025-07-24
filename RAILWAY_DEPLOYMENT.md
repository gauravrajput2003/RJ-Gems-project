# 🚀 RAILWAY DEPLOYMENT - FREE & EASY

## Step 1: Deploy to Railway
1. Go to: https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose: gauravrajput2003/RJ-Gems-project
5. Select the "server" folder as root

## Step 2: Environment Variables
Add these in Railway dashboard:

NODE_ENV=production
PORT=8080

# 🔑 Database (You still need MongoDB Atlas - FREE)
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/rjgems?retryWrites=true&w=majority

# 🔐 Authentication  
JWT_SECRET=b14d7f2a6342d0e766a24832a6af61b0be7626a8783580f19b7d0b0ab0aa178a

# 🤖 AI API Key (Your existing one)
GEMINI_API_KEY=AIzaSyAsfhrGnqovYK-mk97AO5znpgfT23CZMq0

# 🌐 CORS
CLIENT_URL=https://silly-sprinkles-b1d938.netlify.app

## Step 3: Railway Configuration
- Root Directory: server
- Build Command: npm install
- Start Command: npm start

## Step 4: Deploy & Get URL
Railway will give you: https://your-app.railway.app

## ✅ Benefits:
- 🆓 Completely FREE
- 🚫 No credit card required  
- ⚡ Fast deployment
- 🔄 Auto-deployments from GitHub
- 💾 500 hours/month free (enough for demo)

## 🎯 Still Need:
- MongoDB Atlas (also FREE): https://cloud.mongodb.com/
