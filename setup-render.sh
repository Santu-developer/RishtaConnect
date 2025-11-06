#!/bin/bash

# RishtaConnect - Render Deployment Quick Setup Script
# This script helps you prepare for Render deployment

echo "🚀 RishtaConnect - Render Deployment Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if render.yaml exists
echo "📋 Step 1: Checking configuration files..."
if [ -f "render.yaml" ]; then
    echo -e "${GREEN}✓ render.yaml found${NC}"
else
    echo -e "${YELLOW}⚠ render.yaml not found${NC}"
fi

# Step 2: Generate JWT Secret
echo ""
echo "🔐 Step 2: Generating JWT Secret Key..."
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
echo -e "${GREEN}Your JWT Secret Key:${NC}"
echo "$JWT_SECRET"
echo ""
echo "⚠️  Save this key! You'll need to add it to Render environment variables."

# Step 3: Display required environment variables
echo ""
echo "📝 Step 3: Required Environment Variables for Backend:"
echo "---------------------------------------------------"
echo "DATABASE_URL=jdbc:mysql://your-host:3306/rishtaconnect_db?useSSL=true"
echo "DB_USERNAME=your_username"
echo "DB_PASSWORD=your_password"
echo "JWT_SECRET_KEY=$JWT_SECRET"
echo "FRONTEND_URL=https://rishtaconnect-frontend.onrender.com"
echo "BASE_URL=https://rishtaconnect-backend.onrender.com"
echo "SPRING_PROFILES_ACTIVE=prod"
echo "FILE_UPLOAD_DIR=/opt/render/project/src/uploads"
echo ""

# Step 4: Display required environment variables for frontend
echo "📝 Required Environment Variables for Frontend:"
echo "---------------------------------------------"
echo "REACT_APP_API_URL=https://rishtaconnect-backend.onrender.com"
echo "NODE_VERSION=18"
echo "GENERATE_SOURCEMAP=false"
echo ""

# Step 5: Next steps
echo "🎯 Next Steps:"
echo "-------------"
echo "1. Create a MySQL database on Railway or PlanetScale"
echo "2. Go to https://render.com and sign in"
echo "3. Click 'New +' → 'Blueprint'"
echo "4. Connect your GitHub repository"
echo "5. Render will auto-detect render.yaml"
echo "6. Add the environment variables shown above"
echo "7. Click 'Apply' to deploy!"
echo ""
echo "📚 For detailed guide, see: RENDER_DEPLOYMENT_GUIDE.md"
echo ""
echo -e "${GREEN}✅ Setup information generated successfully!${NC}"
