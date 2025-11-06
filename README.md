# 🎊 RishtaConnect - Matrimonial Platform

<div align="center">

![RishtaConnect Banner](https://img.shields.io/badge/RishtaConnect-Matrimonial_Platform-ff69b4?style=for-the-badge)

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.3-6db33f?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479a1?style=flat&logo=mysql)](https://www.mysql.com/)
[![Java](https://img.shields.io/badge/Java-21-orange?style=flat&logo=openjdk)](https://openjdk.java.net/)

A modern, full-stack matrimonial web application built with React and Spring Boot.

[Live Demo](https://sonnentechs.com/) | [Report Bug](https://github.com/Santu-developer/RishtaConnect/issues) | [Request Feature](https://github.com/Santu-developer/RishtaConnect/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Development](#-development)
- [Deployment](#-deployment)
  - [Frontend (Netlify)](#frontend-deployment-on-netlify)
  - [Backend (Render)](#backend-deployment-on-render)
  - [Both on Render](#deploy-both-on-render)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 About The Project

RishtaConnect is a comprehensive matrimonial platform that helps people find their life partners. The platform offers profile creation, advanced search filters, interest requests, messaging, and package-based premium features.

### Why RishtaConnect?

- 🔐 **Secure Authentication** - JWT-based authentication with Spring Security
- 👤 **Detailed Profiles** - Comprehensive user profiles with photos, family info, career details
- 💬 **Real-time Messaging** - In-app messaging system between matched users
- 🎁 **Package System** - Flexible pricing with different feature tiers
- 📱 **Responsive Design** - Mobile-first approach for all devices
- 🔍 **Advanced Search** - Filter by religion, location, education, occupation, and more
- ❤️ **Interest Management** - Send/receive interest requests, shortlist profiles

---

## ✨ Features

### User Features
- ✅ User Registration & Login with JWT Authentication
- ✅ Detailed Profile Creation (Basic, Family, Education, Career, Physical Attributes)
- ✅ Partner Preference Settings
- ✅ Photo Gallery Upload (Multiple Images)
- ✅ Advanced Search & Filters
- ✅ Interest Request System
- ✅ Profile Shortlisting
- ✅ Ignore/Block Profiles
- ✅ In-app Messaging
- ✅ Package Purchase History
- ✅ Support Ticket System
- ✅ Dark/Light Theme Toggle
- ✅ Account Recovery (Password Reset)

### Admin Features
- ✅ User Management
- ✅ Profile Verification
- ✅ Package Management
- ✅ Support Ticket Management

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3.1
- **Routing:** React Router DOM 7.0.1
- **HTTP Client:** Axios 1.7.9
- **UI Components:** Bootstrap 5.3.3
- **Carousel/Sliders:** React Slick, Swiper
- **Forms:** React Hook Form 7.54.0
- **Notifications:** React Toastify 11.0.3
- **Security:** React Google reCAPTCHA
- **Location:** Country-State-City selectors
- **File Upload:** React Dropzone

### Backend
- **Framework:** Spring Boot 3.3.3
- **Language:** Java 21
- **Security:** Spring Security with JWT
- **Database:** MySQL (JPA/Hibernate)
- **Build Tool:** Maven
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Spring Boot Validation
- **Utilities:** Lombok

### DevOps & Deployment
- **Frontend Hosting:** Netlify
- **Backend Hosting:** Render
- **Database:** MySQL (Render or external)
- **Version Control:** Git & GitHub

---

## 📁 Project Structure

```
RishtaConnect/
│
├── RishtaConnect-frontend/          # React Frontend Application
│   ├── public/                       # Static files
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── AboutUsSection.js
│   │   │   ├── Avatar.js
│   │   │   ├── ContactForm.js
│   │   │   ├── Footer.js
│   │   │   ├── HeroSection.js
│   │   │   ├── LoginPage.js
│   │   │   ├── Navbar.js
│   │   │   ├── RegistrationForm.js
│   │   │   └── data/                 # Static data
│   │   ├── screens/                  # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Member.js
│   │   │   └── user/                 # User dashboard screens
│   │   │       ├── Dashboard.js
│   │   │       ├── BasicInformation.js
│   │   │       ├── MyInterest.js
│   │   │       ├── Message.js
│   │   │       └── ...
│   │   ├── services/
│   │   │   └── ApiService.js         # API integration
│   │   ├── styles/                   # CSS files
│   │   ├── utils/
│   │   │   └── securityUtils.js      # Security utilities
│   │   ├── App.js                    # Main app component
│   │   └── index.js                  # Entry point
│   ├── .env.development              # Dev environment variables
│   ├── .env.production               # Prod environment variables
│   ├── netlify.toml                  # Netlify configuration
│   ├── package.json
│   └── README.md
│
├── RishtaConnect-backend/            # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/santu/Backend_Matrilab/
│   │   │   │   ├── BackendMatrilabApplication.java
│   │   │   │   ├── config/           # Security & Web config
│   │   │   │   │   ├── WebConfig.java
│   │   │   │   │   └── ...
│   │   │   │   ├── controller/       # REST Controllers
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── UserController.java
│   │   │   │   │   ├── MessageController.java
│   │   │   │   │   └── ...
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── entities/         # JPA Entities
│   │   │   │   ├── repository/       # JPA Repositories
│   │   │   │   ├── security/         # JWT & Security
│   │   │   │   ├── service/          # Business Logic
│   │   │   │   └── utils/            # Utility classes
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-prod.properties
│   │   └── test/                     # Unit tests
│   ├── uploads/gallery/              # User uploaded images
│   ├── pom.xml                       # Maven dependencies
│   ├── render.yaml                   # Render deployment config
│   └── README.md
│
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Java JDK** (v21) - [Download](https://adoptium.net/)
- **Maven** (v3.8+) - [Download](https://maven.apache.org/)
- **MySQL** (v8.0+) - [Download](https://dev.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Santu-developer/RishtaConnect.git
cd RishtaConnect
```

#### 2. Backend Setup

```bash
# Navigate to backend folder
cd RishtaConnect-backend

# Install dependencies
./mvnw clean install

# Or on Windows
mvnw.cmd clean install
```

#### 3. Frontend Setup

```bash
# Navigate to frontend folder
cd ../RishtaConnect-frontend

# Install dependencies
npm install
```

---

## ⚙️ Environment Setup

### Backend Configuration

#### Local Development (`application.properties`)

Create/Update `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/rishtaconnect_db?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.open-in-view=false

# JWT Configuration
jwt.secret.key=your_super_secret_key_here_minimum_256_bits

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
file.upload-dir=uploads/gallery
file.base-url=http://localhost:8080

# CORS
cors.allowed.origins=http://localhost:3000

# Logging
logging.level.org.springframework=INFO
logging.level.com.santu.Backend_Matrilab=DEBUG
```

#### Production (`application-prod.properties`)

```properties
# Server
server.port=${PORT:8080}

# Database (Environment Variables)
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# JWT
jwt.secret.key=${JWT_SECRET_KEY}

# CORS
cors.allowed.origins=${FRONTEND_URL:http://localhost:3000}

# File Upload
file.upload-dir=${UPLOAD_DIR:uploads/gallery}
file.base-url=${BASE_URL}
```

#### Database Setup

```sql
-- Create Database
CREATE DATABASE rishtaconnect_db;

-- Use Database
USE rishtaconnect_db;

-- Tables will be auto-created by Hibernate on first run
```

### Frontend Configuration

#### Development (`.env.development`)

```env
NODE_ENV=development
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENABLE_CONSOLE_LOGS=true
GENERATE_SOURCEMAP=true
```

#### Production (`.env.production`)

```env
NODE_ENV=production
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_ENABLE_CONSOLE_LOGS=false
GENERATE_SOURCEMAP=false
```

---

## 💻 Development

### Running Backend Locally

```bash
cd RishtaConnect-backend

# Using Maven Wrapper
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

Backend will run on: **http://localhost:8080**

### Running Frontend Locally

```bash
cd RishtaConnect-frontend

# Start development server
npm start
```

Frontend will run on: **http://localhost:3000**

### Testing

#### Backend Tests

```bash
cd RishtaConnect-backend
./mvnw test
```

#### Frontend Tests

```bash
cd RishtaConnect-frontend
npm test
```

---

## 🌐 Deployment

### Frontend Deployment on Netlify

#### Method 1: Git-based Deployment (Recommended)

1. **Push Code to GitHub** (if not already done)

2. **Login to Netlify**
   - Go to [netlify.com](https://www.netlify.com/)
   - Sign up/Login with GitHub

3. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select `RishtaConnect` repository

4. **Configure Build Settings**
   ```
   Base directory: RishtaConnect-frontend
   Build command: npm run build
   Publish directory: RishtaConnect-frontend/build
   ```

5. **Set Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL = https://your-backend.onrender.com
     NODE_ENV = production
     GENERATE_SOURCEMAP = false
     ```

6. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at: `https://your-site-name.netlify.app`

7. **Custom Domain (Optional)**
   - Go to Domain Settings → Add custom domain
   - Follow DNS configuration steps

#### Method 2: Manual Deployment

```bash
cd RishtaConnect-frontend

# Build production files
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

#### Netlify Configuration File

The `netlify.toml` file is already configured:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### Backend Deployment on Render

#### Prerequisites
- MySQL Database (you can use Render's managed MySQL or external services like PlanetScale, AWS RDS)

#### Steps:

1. **Create MySQL Database** (if using Render)
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "MySQL"
   - Choose a name (e.g., `rishtaconnect-db`)
   - Select free or paid plan
   - Click "Create Database"
   - Save the connection details

2. **Deploy Backend Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `RishtaConnect` repo

3. **Configure Service**
   ```
   Name: rishtaconnect-backend
   Region: Select nearest
   Branch: main
   Root Directory: RishtaConnect-backend
   Runtime: Java
   Build Command: ./mvnw clean install -DskipTests
   Start Command: java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar target/*.jar
   ```

4. **Set Environment Variables**
   - In the "Environment" section, add:
   
   ```
   DATABASE_URL = jdbc:mysql://your-db-host:3306/rishtaconnect_db
   DB_USERNAME = your_db_user
   DB_PASSWORD = your_db_password
   JWT_SECRET_KEY = your_secure_secret_key_minimum_256_bits
   FRONTEND_URL = https://your-frontend.netlify.app
   BASE_URL = https://your-backend.onrender.com
   SPRING_PROFILES_ACTIVE = prod
   UPLOAD_DIR = /opt/render/project/src/uploads/gallery
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your backend will be live at: `https://your-backend.onrender.com`

6. **Update Frontend Environment**
   - Update `.env.production` in frontend:
     ```
     REACT_APP_API_URL=https://your-backend.onrender.com
     ```
   - Redeploy frontend on Netlify

#### Render Configuration File

The `render.yaml` file is already configured in backend:

```yaml
services:
  - type: web
    name: rishtaconnect-backend
    env: java
    buildCommand: ./mvnw clean install -DskipTests
    startCommand: java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar target/*.jar
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: DB_USERNAME
        sync: false
      - key: DB_PASSWORD
        sync: false
      - key: JWT_SECRET_KEY
        sync: false
      - key: FRONTEND_URL
        sync: false
      - key: BASE_URL
        sync: false
      - key: SPRING_PROFILES_ACTIVE
        value: prod
```

---

### Deploy Both on Render

You can deploy both frontend and backend on Render if preferred.

#### Frontend on Render

1. **Create Static Site**
   - Click "New +" → "Static Site"
   - Connect repository

2. **Configure**
   ```
   Name: rishtaconnect-frontend
   Branch: main
   Root Directory: RishtaConnect-frontend
   Build Command: npm run build
   Publish Directory: build
   ```

3. **Environment Variables**
   ```
   REACT_APP_API_URL = https://your-backend.onrender.com
   NODE_VERSION = 18
   ```

4. **Deploy**

---

## 📚 API Documentation

### Base URL
- **Local:** `http://localhost:8080`
- **Production:** `https://your-backend.onrender.com`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "email": "user@example.com"
}
```

### Protected Endpoints (Require JWT Token)

All protected endpoints require `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

#### User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update Basic Information
```http
PUT /api/users/basic-info
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "gender": "Male",
  "maritalStatus": "Single"
}
```

#### Send Interest Request
```http
POST /api/interests/send/{userId}
Authorization: Bearer <token>
```

#### Get Messages
```http
GET /api/messages
Authorization: Bearer <token>
```

For complete API documentation, see the backend controllers.

---

## 🔧 Configuration

### CORS Configuration

Backend CORS is configured in `WebConfig.java`:

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins(allowedOrigins)
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
```

### File Upload Configuration

Files are uploaded to:
- **Local:** `uploads/gallery/`
- **Production:** `/opt/render/project/src/uploads/gallery` (Render)

Maximum file size: **10MB**

---

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors
- Ensure `FRONTEND_URL` is correctly set in backend environment variables
- Check browser console for exact CORS error

#### 2. Database Connection Failed
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database exists: `CREATE DATABASE rishtaconnect_db;`

#### 3. JWT Token Errors
- Ensure `jwt.secret.key` is at least 256 bits long
- Check token expiration time
- Clear browser localStorage and login again

#### 4. File Upload Fails
- Check directory permissions
- Verify max file size settings
- Ensure `uploads/gallery` directory exists

#### 5. Build Fails on Render
- Check Java version is 21
- Verify Maven wrapper has execute permissions
- Review build logs in Render dashboard

---

## 📝 Development Guidelines

### Code Style
- **Backend:** Follow Java naming conventions, use Lombok for boilerplate
- **Frontend:** Use functional components, React Hooks
- **Formatting:** Use Prettier for JavaScript, IntelliJ formatter for Java

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build/config changes

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Santu Developer**
- GitHub: [@Santu-developer](https://github.com/Santu-developer)
- Website: [sonnentechs.com](https://sonnentechs.com/)

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Bootstrap Team
- All open-source contributors

---

## 📞 Support

For support, email support@sonnentechs.com or create an issue in this repository.

---

<div align="center">

**Made with ❤️ by Santu Developer**

⭐ Star this repo if you find it helpful!

</div>
