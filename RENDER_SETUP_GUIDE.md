# 🔧 Render Environment Variables Setup Guide

## Step-by-Step Instructions:

### 1. Navigate to Environment Variables
- Login to [render.com](https://render.com)
- Click on your `rj-gems-backend` service
- Click **"Environment"** tab in the left sidebar
- Click **"Add Environment Variable"**

### 2. Add Variables One by One

**Variable 1:**
- Key: `NODE_ENV`
- Value: `production`

**Variable 2:**
- Key: `PORT`
- Value: `10000`

**Variable 3:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/rjgems?retryWrites=true&w=majority`
- ⚠️ Replace with your actual MongoDB Atlas connection string

**Variable 4:**
- Key: `JWT_SECRET`
- Value: Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- ⚠️ Use the generated value, not this command

**Variable 5:**
- Key: `OPENAI_API_KEY`
- Value: `sk-your-actual-openai-key-here`
- ⚠️ Get from https://platform.openai.com/

**Variable 6:**
- Key: `GEMINI_API_KEY`
- Value: `your-actual-gemini-key-here`
- ⚠️ Get from https://ai.google.dev/

**Variable 7:**
- Key: `CLIENT_URL`
- Value: `https://your-netlify-site.netlify.app`
- ⚠️ Update after frontend deployment

### 3. Save and Deploy
- Click **"Save Changes"** after adding all variables
- Render will automatically **redeploy** your service
- Wait for deployment to complete

## 🎯 Important Notes:

1. **No Quotes Needed**: Don't wrap values in quotes in Render
2. **Case Sensitive**: Variable names must match exactly
3. **Auto Redeploy**: Render redeploys when you change environment variables
4. **Secure**: Environment variables are encrypted and not visible in logs

## 📋 Quick Checklist:
- [ ] NODE_ENV = production
- [ ] PORT = 10000
- [ ] MONGODB_URI = your MongoDB Atlas URL
- [ ] JWT_SECRET = generated 32+ character string
- [ ] OPENAI_API_KEY = your OpenAI key
- [ ] GEMINI_API_KEY = your Google Gemini key
- [ ] CLIENT_URL = your frontend URL (update later)

## 🔄 After Adding Variables:
1. Render will start automatic deployment
2. Check deployment logs for any errors
3. Test your backend API endpoints
4. Update frontend environment with backend URL
