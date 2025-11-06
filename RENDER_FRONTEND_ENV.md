# 🎨 FRONTEND - Environment Variables for Render
# Copy-paste these EXACTLY in Render Dashboard

---

## Environment Variables (Frontend Static Site)

### 1. REACT_APP_API_URL
```
https://rishtaconnect-backend.onrender.com
```

### 2. NODE_VERSION
```
18
```

### 3. GENERATE_SOURCEMAP
```
false
```

---

## 📋 Copy-Paste Format (One by One in Render):

**Key:** REACT_APP_API_URL  
**Value:** https://rishtaconnect-backend.onrender.com

**Key:** NODE_VERSION  
**Value:** 18

**Key:** GENERATE_SOURCEMAP  
**Value:** false

---

## 🚀 Frontend Deployment Steps:

1. Backend deployment complete hone ka wait karo
2. Backend URL copy karo (e.g., https://rishtaconnect-backend-xyz.onrender.com)
3. Render Dashboard → **"New +"** → **"Static Site"**
4. Repository: `Santu-developer/RishtaConnect`
5. Configure:
   - **Name:** rishtaconnect-frontend
   - **Branch:** main
   - **Root Directory:** RishtaConnect-frontend
   - **Build Command:** npm install && npm run build
   - **Publish Directory:** build
6. Add above environment variables
7. Click **"Create Static Site"**

---

## ⚠️ IMPORTANT:

- Backend URL ko frontend environment variable mein exactly same use karo
- No trailing slash (/) at the end
- Build time: 3-5 minutes
- Frontend will be always active (no spin down)

---

**Frontend Configuration:** ✅ READY  
**API Connection:** ✅ Configured  
**Build Settings:** ✅ Optimized
