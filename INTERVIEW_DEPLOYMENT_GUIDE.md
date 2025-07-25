# RJ Gems - Full Stack Deployment Guide

This guide provides simple, step-by-step instructions to deploy your full-stack MERN application.

- **Frontend (React)**: Deployed on **Vercel**.
- **Backend (Node.js/Express)**: Deployed on **Render**.
- **Database (MongoDB)**: Hosted on **MongoDB Atlas**.

---

## 🚀 Part 1: Database Setup (MongoDB Atlas)

First, we need a live database that your backend can connect to.

1.  **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.

2.  **Create a Free Cluster**:
    -   Choose the **M0 Free** tier.
    -   Select a cloud provider and region (the defaults are fine).
    -   Give your cluster a name (e.g., `rj-gems-cluster`) and click **Create**.

3.  **Create a Database User**:
    -   In the left menu, go to `Database Access`.
    -   Click **Add New Database User**.
    -   Enter a **username** and **password**. Remember these, you'll need them soon.
    -   Under `Database User Privileges`, select **Read and write to any database**.
    -   Click **Add User**.

4.  **Whitelist IP Address**:
    -   In the left menu, go to `Network Access`.
    -   Click **Add IP Address**.
    -   Select **Allow Access From Anywhere** (this enters `0.0.0.0/0`).
    -   Click **Confirm**.

5.  **Get Your Connection String**:
    -   Go back to `Database` (in the left menu).
    -   Click the **Connect** button on your cluster.
    -   Select **Drivers**.
    -   You will see a connection string like this:
        ```
        mongodb+srv://<username>:<password>@your-cluster-url.mongodb.net/?retryWrites=true&w=majority
        ```
    -   Copy this string. Replace `<password>` with the user password you created. You can also specify the database name (e.g., `rj-gems`) before the `?`.
        **Example:** `mongodb+srv://myuser:mypassword@...mongodb.net/rj-gems?retryWrites=true&w=majority`
    -   **Keep this connection string safe. This is your `MONGODB_URI`**.

---

## 🚀 Part 2: Backend Deployment (Render)

Now, let's get your server live.

1.  **Create an Account**: Go to [Render](https://dashboard.render.com/register) and sign up using your GitHub account.

2.  **Create a New Web Service**:
    -   On your Render dashboard, click **New +** and select **Web Service**.
    -   Connect your GitHub repository (`RJ-Gems-project`).

3.  **Configure the Backend Service**:
    -   **Name**: Give your service a name (e.g., `rj-gems-backend`).
    -   **Root Directory**: `server` (This is important! It tells Render where your backend code is).
    -   **Environment**: `Node`.
    -   **Build Command**: `npm install`.
    -   **Start Command**: `node server.js`.
    -   **Instance Type**: Select the **Free** tier.

4.  **Add Environment Variables**:
    -   Click **Advanced Settings**.
    -   Click **Add Environment Variable** for each of the following:
        -   `MONGODB_URI`: The connection string you got from MongoDB Atlas.
        -   `JWT_SECRET`: A long, random string for security (e.g., `your-super-secure-jwt-secret-key-here-12345`).
        -   `NODE_ENV`: `production`.
        -   `CLIENT_URL`: We will add this later after deploying the frontend.

5.  **Deploy**:
    -   Click **Create Web Service**.
    -   Render will start building and deploying your backend. This may take a few minutes.
    -   Once it's live, Render will give you a URL for your backend (e.g., `https://rj-gems-backend.onrender.com`). **Copy this URL**.

---

## 🚀 Part 3: Frontend Deployment (Vercel)

Finally, let's deploy the user-facing application.

1.  **Create an Account**: Go to [Vercel](https://vercel.com/signup) and sign up using your GitHub account.

2.  **Import Your Project**:
    -   On your Vercel dashboard, click **Add New...** and select **Project**.
    -   Select your `RJ-Gems-project` repository.

3.  **Configure the Frontend Project**:
    -   **Framework Preset**: Vercel should automatically detect **Vite**.
    -   **Root Directory**: `client` (This is important! It tells Vercel where your frontend code is).

4.  **Add Environment Variable**:
    -   Expand the **Environment Variables** section.
    -   Click **Add New** and enter the following:
        -   **Name**: `VITE_API_BASE_URL`
        -   **Value**: The URL of your deployed backend from Render (e.g., `https://rj-gems-backend.onrender.com`).

5.  **Deploy**:
    -   Click **Deploy**.
    -   Vercel will build and deploy your React app.
    -   When it's done, you'll get a live URL for your frontend (e.g., `https://your-project-name.vercel.app`). **This is the link you can share!**

---

## ✅ Part 4: Final Connection

One last step to make sure the backend accepts requests from your live frontend.

1.  **Go back to your Render dashboard**.
2.  Navigate to your backend service (`rj-gems-backend`).
3.  Go to the **Environment** tab.
4.  Find the `CLIENT_URL` variable you created earlier (or add it now).
5.  Set its value to your live Vercel frontend URL (e.g., `https://your-project-name.vercel.app`).
6.  **Save Changes**. Render will automatically restart your server with the updated variable.

**Congratulations! Your full-stack application is now live!** You can share the Vercel URL with your HR.
