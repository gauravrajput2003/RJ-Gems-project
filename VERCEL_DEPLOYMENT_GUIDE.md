# 🚀 VERCEL BACKEND DEPLOYMENT GUIDE

## Step 1: Deploy to Vercel (100% FREE)

### 1.1 Go to Vercel Dashboard
1. **Visit**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import** your GitHub repository: `gauravrajput2003/RJ-Gems-project`

### 1.2 Configure Project
1. **Project Name**: `rj-gems-backend`
2. **Framework Preset**: Other
3. **Root Directory**: `server` ⚠️ IMPORTANT!
4. **Build Command**: `npm install`
5. **Output Directory**: Leave empty
6. **Install Command**: `npm install`

## Step 2: Add Environment Variables

In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/rjgems?retryWrites=true&w=majority
JWT_SECRET=b14d7f2a6342d0e766a24832a6af61b0be7626a8783580f19b7d0b0ab0aa178a
GEMINI_API_KEY=AIzaSyAsfhrGnqovYK-mk97AO5znpgfT23CZMq0
CLIENT_URL=https://silly-sprinkles-b1d938.netlify.app
```

## Step 3: Get FREE MongoDB Atlas

### 3.1 Create MongoDB Atlas Account
1. **Go to**: https://cloud.mongodb.com/
2. **Sign up** (FREE - no card required)
3. **Create new project**
4. **Build database** → Choose **M0 FREE tier**
5. **Select cloud provider**: AWS
6. **Region**: Choose closest to you
7. **Cluster name**: `rj-gems-cluster`

### 3.2 Configure Database Access
1. **Create database user**:
   - Username: `rjgemsuser`
   - Password: Generate secure password
   - Database User Privileges: `Read and write to any database`

2. **Network Access**:
   - **Add IP Address**: `0.0.0.0/0` (Allow all IPs for Vercel)

### 3.3 Get Connection String
1. **Click "Connect"**
2. **Choose "Connect your application"**
3. **Copy connection string**:
   ```
   mongodb+srv://rjgemsuser:<password>@rj-gems-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. **Replace `<password>`** with your actual password
5. **Add database name**: `/rjgems` before the `?`

Final connection string should look like:
```
mongodb+srv://rjgemsuser:your-password@rj-gems-cluster.xxxxx.mongodb.net/rjgems?retryWrites=true&w=majority
```

## Step 4: Deploy

1. **Click "Deploy"** in Vercel
2. **Wait for deployment** (2-3 minutes)
3. **Get your backend URL**: `https://rj-gems-backend.vercel.app`

## Step 5: Update Frontend

Update your frontend `.env.production` file:
```
VITE_API_BASE_URL=https://rj-gems-backend.vercel.app
VITE_GEMINI_API_KEY=AIzaSyAsfhrGnqovYK-mk97AO5znpgfT23CZMq0
```

## Step 6: Redeploy Frontend

1. **Update the file** in your repo
2. **Commit and push** to GitHub
3. **Netlify will auto-redeploy** your frontend

## ✅ Final Result:
- **Frontend**: https://silly-sprinkles-b1d938.netlify.app
- **Backend**: https://rj-gems-backend.vercel.app
- **Database**: MongoDB Atlas (FREE)
- **Signup/Signin**: ✅ WORKING!

## 🎯 Test Your Deployment:
1. **Visit**: https://rj-gems-backend.vercel.app/api/health
2. **Should show**: API health status
3. **Go to frontend** and test signup!

## 💡 Benefits:
- 🆓 **100% FREE** - No credit card required
- ⚡ **Fast deployment** - 2-3 minutes
- 🔄 **Auto-deploy** from GitHub
- 🌍 **Global CDN** - Fast worldwide
- 📊 **Analytics** included
