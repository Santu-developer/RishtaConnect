# 🔑 BACKEND - Environment Variables for Render
# Copy-paste these EXACTLY in Render Dashboard

---

## Environment Variables (Backend Web Service)

### 1. DATABASE_URL (Internal - Faster)
```
postgresql://rishtaconnect_user:4EfuJWPnOHVz21VsBrsl1pVJvVgz9k0v@dpg-d46er14hg0os738rt01g-a/rishtaconnect
```

### 2. JWT_SECRET_KEY
```
843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3
```

### 3. FRONTEND_URL (Will update after frontend deploys)
```
https://rishtaconnect-frontend.onrender.com
```

### 4. SPRING_PROFILES_ACTIVE
```
prod
```

### 5. FILE_UPLOAD_DIR
```
/opt/render/project/src/uploads
```

---

## 📋 Copy-Paste Format (One by One in Render):

**Key:** DATABASE_URL  
**Value:** postgresql://rishtaconnect_user:4EfuJWPnOHVz21VsBrsl1pVJvVgz9k0v@dpg-d46er14hg0os738rt01g-a/rishtaconnect

**Key:** JWT_SECRET_KEY  
**Value:** 843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3

**Key:** FRONTEND_URL  
**Value:** https://rishtaconnect-frontend.onrender.com

**Key:** SPRING_PROFILES_ACTIVE  
**Value:** prod

**Key:** FILE_UPLOAD_DIR  
**Value:** /opt/render/project/src/uploads

---

## ⚠️ IMPORTANT NOTES:

1. ✅ Using **Internal Database URL** (faster, same region)
2. ✅ FRONTEND_URL will be updated after frontend deployment
3. ✅ After backend deploys, update backend URL in frontend environment variables
4. ✅ All values are production-ready

---

## 🚀 Next Steps After Adding These:

1. Click **"Create Web Service"** 
2. Wait for build to complete (5-10 minutes)
3. Copy backend URL (e.g., https://rishtaconnect-backend.onrender.com)
4. Then deploy frontend with that URL

---

**Backend Database Connection:** ✅ READY  
**Region Match:** ✅ Singapore (Both DB & Backend)  
**Security:** ✅ Production Settings
