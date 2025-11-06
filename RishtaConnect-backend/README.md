# Spring Boot Backend - RishtaConnect

RESTful API for matrimonial platform.

## 🚀 Features
- JWT Authentication & Authorization
- User Management
- Profile CRUD Operations
- Messaging System
- Package Management
- Gallery & Photo Upload
- Email Services
- Security with Spring Security

## 🛠️ Tech Stack
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- MySQL Database
- JWT (JSON Web Tokens)
- Maven
- Java 17

## 📦 Installation

```bash
./mvnw clean install
```

## 🎯 Development

```bash
./mvnw spring-boot:run
```
Runs on: http://localhost:8080

## 🗄️ Database Setup

### MySQL Configuration

1. Create database:
```sql
CREATE DATABASE rishtaconnect_db;
```

2. Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/rishtaconnect_db
spring.datasource.username=root
spring.datasource.password=your_password
```

## 🌐 Environment Variables

### Local Development (`application.properties`):
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/rishtaconnect_db
spring.datasource.username=root
spring.datasource.password=root
jwt.secret.key=your_secret_key
```

### Production (`application-prod.properties`):
```properties
server.port=${PORT:8080}
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
jwt.secret.key=${JWT_SECRET_KEY}
cors.allowed.origins=${FRONTEND_URL}
```

## 📁 Project Structure

```
src/main/java/com/santu/
├── config/              # Configuration classes
│   ├── SecurityConfig.java
│   ├── WebConfig.java
│   └── JwtConfig.java
├── controller/          # REST Controllers
│   ├── AuthController.java
│   ├── UserController.java
│   └── MessageController.java
├── model/              # Entity classes
│   ├── User.java
│   ├── Message.java
│   └── Package.java
├── repository/         # JPA Repositories
├── service/           # Business logic
└── util/             # Utilities (JWT, etc.)
```

## 🚀 Deployment on Render

See `DEPLOYMENT_GUIDE.md` in root directory.

**Quick Deploy Settings:**
```
Build Command: ./mvnw clean install -DskipTests
Start Command: java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar target/*.jar
```

## 🔐 Security

- JWT token-based authentication
- Password encryption with BCrypt
- CORS configuration
- Role-based access control

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/refresh - Refresh token
```

### Users
```
GET /api/users - Get all users
GET /api/users/{id} - Get user by ID
PUT /api/users/{id} - Update user
DELETE /api/users/{id} - Delete user
```

### Messages
```
GET /api/messages - Get conversations
POST /api/messages - Send message
GET /api/messages/{userId} - Get messages with user
```

## 🧪 Testing

```bash
./mvnw test
```

## 📝 License
MIT
