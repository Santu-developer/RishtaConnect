# 🚀 Render Deployment Guide - RishtaConnect

Complete guide to deploy both Frontend & Backend on Render.

---

## 📋 Prerequisites

1. **GitHub Repository**: https://github.com/Santu-developer/RishtaConnect
2. **Render Account**: Sign up at https://render.com (Free tier available)
3. **PostgreSQL Database** (Render provides free tier - 256MB RAM, 1GB storage)

---

## 🗄️ Step 1: Deploy PostgreSQL Database on Render

### 1.1 Create Database
1. Login to **Render Dashboard**: https://dashboard.render.com
2. Click **"New +"** → Select **"PostgreSQL"**
3. Configure database:
   ```yaml
   Name: rishtaconnect-db
   Database: rishtaconnect
   User: rishtaconnect_user (auto-generated)
   Region: Oregon (US West) or Singapore
   Plan: Free
   ```
4. Click **"Create Database"**
5. Wait for database to be ready (2-3 minutes)

### 1.2 Get Database Connection String
1. Once created, go to database dashboard
2. Copy **"Internal Database URL"** (format: `postgres://user:password@host:port/database`)
3. Render will automatically inject this as `DATABASE_URL` environment variable

**Note**: Free tier PostgreSQL expires after 90 days of inactivity. For production, upgrade to Starter plan ($7/month).

---

## 🖥️ Step 2: Deploy Backend on Render

### 2.1 Create Web Service
1. Go to **Render Dashboard** → Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Santu-developer/RishtaConnect`
3. Configure settings:

   ```yaml
   Name: rishtaconnect-backend
   Region: Oregon (US West) or Singapore
   Branch: main
   Root Directory: RishtaConnect-backend
   Runtime: Java
   Build Command: ./mvnw clean install -DskipTests
   Start Command: java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar target/*.jar
   Instance Type: Free
   ```

### 2.2 Add Environment Variables
Click **"Environment"** tab and add:

| Key | Value | Example |
|-----|-------|---------|
| `DATABASE_URL` | Auto-injected by Render | (automatically set from PostgreSQL database) |
| `JWT_SECRET_KEY` | Random secret key | `843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3` |
| `FRONTEND_URL` | Frontend URL (update later) | `https://rishtaconnect-frontend.onrender.com` or `https://classy-arithmetic-4918d4.netlify.app` |
| `BASE_URL` | Backend URL (update after deploy) | `https://rishtaconnect-backend.onrender.com` |
| `SPRING_PROFILES_ACTIVE` | Production profile | `prod` |
| `FILE_UPLOAD_DIR` | Upload directory | `/opt/render/project/src/uploads` |

**Note**: When using Blueprint (render.yaml), DATABASE_URL is automatically linked from PostgreSQL database.

### 2.3 Generate JWT Secret Key
Run in terminal:
```bash
openssl rand -base64 64
```

### 2.4 Deploy Backend
1. Click **"Create Web Service"**
2. Wait for build to complete (5-10 minutes first time)
3. Once deployed, copy your backend URL:
   ```
   https://rishtaconnect-backend.onrender.com
   ```

### 2.5 Health Check
- Visit: `https://rishtaconnect-backend.onrender.com/api/health`
- Should return health status

---

## 🎨 Step 3: Deploy Frontend on Render

### 3.1 Create Static Site
1. Go to **Render Dashboard** → Click **"New +"** → **"Static Site"**
2. Connect same GitHub repository: `Santu-developer/RishtaConnect`
3. Configure settings:

   ```yaml
   Name: rishtaconnect-frontend
   Branch: main
   Root Directory: RishtaConnect-frontend
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

### 3.2 Add Environment Variables
Click **"Environment"** tab and add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://rishtaconnect-backend.onrender.com` |
| `NODE_VERSION` | `18` |
| `GENERATE_SOURCEMAP` | `false` |

### 3.3 Configure Redirects
Render automatically handles SPA routing for React apps.

### 3.4 Deploy Frontend
1. Click **"Create Static Site"**
2. Wait for build (3-5 minutes)
3. Once deployed, copy frontend URL:
   ```
   https://rishtaconnect-frontend.onrender.com
   ```

---

## 🔄 Step 4: Update CORS & URLs

### 4.1 Update Backend Environment Variables
Go back to **Backend Web Service** → **Environment**:
- Update `FRONTEND_URL` = `https://rishtaconnect-frontend.onrender.com`
- Update `BASE_URL` = `https://rishtaconnect-backend.onrender.com`
- Click **"Save Changes"** → Backend will auto-redeploy

### 4.2 Update Frontend Environment Variable (if needed)
If backend URL changed, update in **Frontend Static Site**:
- Update `REACT_APP_API_URL` = `https://rishtaconnect-backend.onrender.com`
- Click **"Save Changes"** → Frontend will auto-redeploy

---

## 🛠️ Alternative: Using render.yaml (Blueprint)

You can also deploy using Render Blueprint:

### 1. Create `render.yaml` in repository root:

```yaml
services:
  # Backend Service
  - type: web
    name: rishtaconnect-backend
    runtime: java
    region: oregon
    plan: free
    rootDir: RishtaConnect-backend
    buildCommand: ./mvnw clean install -DskipTests
    startCommand: java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar target/*.jar
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: rishtaconnect-db
          property: connectionString
      - key: JWT_SECRET_KEY
        generateValue: true
      - key: FRONTEND_URL
        sync: false
      - key: BASE_URL
        sync: false
      - key: SPRING_PROFILES_ACTIVE
        value: prod
      - key: FILE_UPLOAD_DIR
        value: /opt/render/project/src/uploads

  # Frontend Service
  - type: web
    name: rishtaconnect-frontend
    runtime: static
    region: oregon
    plan: free
    rootDir: RishtaConnect-frontend
    buildCommand: npm install && npm run build
    staticPublishPath: build
    envVars:
      - key: REACT_APP_API_URL
        sync: false
      - key: NODE_VERSION
        value: "18"
      - key: GENERATE_SOURCEMAP
        value: "false"
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### 2. Deploy via Blueprint:
1. Go to **Render Dashboard** → **"New +"** → **"Blueprint"**
2. Connect repository
3. Render will auto-detect `render.yaml`
4. Add environment variables
5. Click **"Apply"**

---

## 📝 Important Notes

### Free Tier Limitations:
- ⚠️ **Backend spins down after 15 minutes of inactivity**
- First request after inactivity takes 30-60 seconds (cold start)
- 750 hours/month free (enough for 1 service running 24/7)
- Static sites are always active (no spin down)

### Database Options:
1. **Render PostgreSQL** (Recommended): Free tier - 256MB RAM, 1GB storage, expires after 90 days inactivity
2. **Supabase PostgreSQL**: 500MB free, always active
3. **ElephantSQL**: 20MB free tier
4. **AWS RDS Free Tier**: 12 months free (requires AWS account)

### File Uploads:
- Render's free tier uses **ephemeral storage**
- Uploaded files are **deleted on each deployment**
- **Solution**: Use **Cloudinary** or **AWS S3** for file storage

---

## ✅ Verification Steps

### Backend Health Check:
```bash
curl https://rishtaconnect-backend.onrender.com/api/health
```

### Frontend Check:
```bash
curl https://rishtaconnect-frontend.onrender.com
```

### Test API:
```bash
curl https://rishtaconnect-backend.onrender.com/api/members
```

---

## 🔧 Troubleshooting

### Backend Build Fails:
1. Check Java version in `pom.xml` (Should be 21)
2. Verify `mvnw` has execute permissions
3. Check build logs in Render dashboard

### Frontend Build Fails:
1. Verify Node version is 18
2. Check for ESLint errors
3. Ensure all dependencies in `package.json`

### Database Connection Issues:
1. Verify `DATABASE_URL` format (should be `postgres://user:password@host:port/database`)
2. Check that database is in same region as backend for better performance
3. Ensure database is active (free tier expires after 90 days inactivity)
4. Test connection using pgAdmin or DBeaver

### CORS Errors:
1. Verify `FRONTEND_URL` in backend environment variables
2. Check CORS configuration in Spring Security
3. Ensure URLs match exactly (no trailing slashes)

---

## 🚀 Post-Deployment Tasks

### 1. Update Netlify Frontend (Current)
If keeping Netlify for frontend:
- Update `REACT_APP_API_URL` in Netlify to point to Render backend
- Redeploy Netlify site

### 2. Custom Domain (Optional)
1. In Render Dashboard → Service → **"Settings"** → **"Custom Domain"**
2. Add your domain: `api.rishtaconnect.com`
3. Update DNS records as instructed

### 3. Monitor Services
- Enable **"Email Notifications"** in Render
- Check **"Metrics"** tab for performance
- View **"Logs"** for debugging

### 4. Upgrade to Paid Plan (Optional)
- **Starter Plan ($7/month)**:
  - No spin down
  - 512MB RAM
  - Better performance

---

## 📊 Cost Comparison

| Service | Free Tier | Paid Plan |
|---------|-----------|-----------|
| **Render Backend** | Free (spins down) | $7/month (always on) |
| **Render Frontend** | Free (always on) | N/A (static is free) |
| **Render PostgreSQL** | Free (256MB, 90 day expiry) | $7/month (512MB, always on) |
| **Total** | **FREE** | ~$14/month |

**Recommended Setup**:
- **Frontend**: Netlify (FREE, already deployed ✅) 
- **Backend**: Render (FREE with spin down)
- **Database**: Render PostgreSQL (FREE)
- **Total**: **100% FREE** (with limitations)

---

## 🎯 Quick Start Commands

### Clone & Setup:
```bash
git clone https://github.com/Santu-developer/RishtaConnect.git
cd RishtaConnect
```

### Test Backend Locally:
```bash
cd RishtaConnect-backend
./mvnw spring-boot:run
```

### Test Frontend Locally:
```bash
cd RishtaConnect-frontend
npm install
npm start
```

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **GitHub Issues**: https://github.com/Santu-developer/RishtaConnect/issues

---

**Deployment Status**: ✅ Ready to Deploy

**Estimated Setup Time**: 30-45 minutes

**Difficulty**: Intermediate

---

*Last Updated: November 7, 2025*
