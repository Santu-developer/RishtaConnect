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
DATABASE_URL=jdbc:mysql://your-host:3306/rishtaconnect_db?useSSL=true
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET_KEY=$jwtSecret
FRONTEND_URL=https://rishtaconnect-frontend.onrender.com
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
Write-Host "🗄️  Database Options:" -ForegroundColor Yellow
Write-Host "-------------------" -ForegroundColor Gray
Write-Host "Option 1: Railway (Recommended for MySQL)"
Write-Host "  - Go to: https://railway.app"
Write-Host "  - Deploy MySQL"
Write-Host "  - Cost: ~$5/month"
Write-Host ""
Write-Host "Option 2: PlanetScale (Serverless MySQL)"
Write-Host "  - Go to: https://planetscale.com"
Write-Host "  - 5GB free tier"
Write-Host ""
Write-Host "Option 3: Render PostgreSQL"
Write-Host "  - Free tier available"
Write-Host "  - Requires changing backend to PostgreSQL"
Write-Host ""

# Step 6: Next steps
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "-------------" -ForegroundColor Gray
@"
1. Create a MySQL database on Railway or PlanetScale
2. Go to https://render.com and sign in
3. Click 'New +' → 'Blueprint'
4. Connect your GitHub repository: Santu-developer/RishtaConnect
5. Render will auto-detect render.yaml
6. Add the environment variables shown above
7. Click 'Apply' to deploy!
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
