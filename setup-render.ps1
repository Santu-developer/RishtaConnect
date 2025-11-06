# RishtaConnect - Render Deployment Quick Setup Script (PowerShell)
# This script helps you prepare for Render deployment

Write-Host "🚀 RishtaConnect - Render Deployment Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if render.yaml exists
Write-Host "📋 Step 1: Checking configuration files..." -ForegroundColor Yellow
if (Test-Path "render.yaml") {
    Write-Host "✓ render.yaml found" -ForegroundColor Green
} else {
    Write-Host "⚠ render.yaml not found" -ForegroundColor Red
}

# Step 2: Generate JWT Secret (requires OpenSSL)
Write-Host ""
Write-Host "🔐 Step 2: Generating JWT Secret Key..." -ForegroundColor Yellow

# Try to generate JWT secret if OpenSSL is available
try {
    $jwtSecret = & openssl rand -base64 64
    $jwtSecret = $jwtSecret -replace "`n",""
    Write-Host "Your JWT Secret Key:" -ForegroundColor Green
    Write-Host $jwtSecret -ForegroundColor White
    Write-Host ""
    Write-Host "⚠️  Save this key! You'll need to add it to Render environment variables." -ForegroundColor Yellow
} catch {
    Write-Host "⚠ OpenSSL not found. Using fallback method..." -ForegroundColor Yellow
    $jwtSecret = "GENERATE_YOUR_OWN_SECURE_KEY_HERE"
    Write-Host "Please generate a JWT secret manually at: https://generate-random.org/api-token-generator" -ForegroundColor Yellow
}

# Step 3: Display required environment variables
Write-Host ""
Write-Host "📝 Step 3: Required Environment Variables for Backend:" -ForegroundColor Yellow
Write-Host "---------------------------------------------------" -ForegroundColor Gray
@"
DATABASE_URL=(automatically injected by Render from PostgreSQL database)
JWT_SECRET_KEY=$jwtSecret
FRONTEND_URL=https://classy-arithmetic-4918d4.netlify.app
BASE_URL=https://rishtaconnect-backend.onrender.com
SPRING_PROFILES_ACTIVE=prod
FILE_UPLOAD_DIR=/opt/render/project/src/uploads
"@ | Write-Host
Write-Host ""

# Step 4: Display required environment variables for frontend
Write-Host "📝 Required Environment Variables for Frontend:" -ForegroundColor Yellow
Write-Host "---------------------------------------------" -ForegroundColor Gray
@"
REACT_APP_API_URL=https://rishtaconnect-backend.onrender.com
NODE_VERSION=18
GENERATE_SOURCEMAP=false
"@ | Write-Host
Write-Host ""

# Step 5: Database options
Write-Host "🗄️  Database Setup:" -ForegroundColor Yellow
Write-Host "-------------------" -ForegroundColor Gray
Write-Host "Using Render PostgreSQL (Recommended & FREE)"
Write-Host "  - Go to: https://dashboard.render.com"
Write-Host "  - Click: New + → PostgreSQL"
Write-Host "  - Name: rishtaconnect-db"
Write-Host "  - Region: Oregon (same as backend)"
Write-Host "  - Plan: Free (256MB RAM, 1GB storage)"
Write-Host "  - Note: Free tier expires after 90 days of inactivity"
Write-Host ""

# Step 6: Next steps
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "-------------" -ForegroundColor Gray
@"
1. Go to https://render.com and sign in with GitHub
2. Click 'New +' → 'Blueprint'
3. Connect your GitHub repository: Santu-developer/RishtaConnect
4. Render will auto-detect render.yaml and create:
   - PostgreSQL Database (rishtaconnect-db)
   - Backend Web Service (rishtaconnect-backend)
   - Frontend Static Site (rishtaconnect-frontend) [optional - already on Netlify]
5. Add the environment variables shown above
6. Click 'Apply' to deploy!
7. Wait 10-15 minutes for first deployment
"@ | Write-Host
Write-Host ""
Write-Host "📚 For detailed guide, see: RENDER_DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Setup information generated successfully!" -ForegroundColor Green

# Step 7: Open browser to Render (optional)
Write-Host ""
$openBrowser = Read-Host "Do you want to open Render.com in your browser? (Y/N)"
if ($openBrowser -eq 'Y' -or $openBrowser -eq 'y') {
    Start-Process "https://render.com"
}
