# 🔐 Backend Authentication System

A secure, production-ready authentication backend built with Node.js, Express, TypeScript, and MySQL. This system implements JWT-based authentication with comprehensive security features and role-based authorization.

## 🏗️ Architecture

\`\`\`
backend/
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── authController.ts
│   │   └── adminController.ts
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts         # JWT authentication
│   │   ├── validation.ts   # Request validation
│   │   ├── errorHandler.ts # Error handling
│   │   └── notFound.ts     # 404 handler
│   ├── models/             # Database models (Prisma)
│   ├── routes/             # API routes
│   │   ├── auth.ts
│   │   └── admin.ts
│   ├── services/           # Business logic
│   │   ├── authService.ts
│   │   └── adminService.ts
│   ├── utils/              # Utilities
│   │   ├── jwt.ts          # JWT helpers
│   │   ├── password.ts     # Password hashing
│   │   ├── validation.ts   # Zod schemas
│   │   └── ApiError.ts     # Custom error class
│   ├── types/              # TypeScript types
│   └── index.ts            # Server entry point
├── prisma/
│   └── schema.prisma       # Database schema
├── package.json
├── .env.example
└── README.md
\`\`\`

## 🔧 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan

## ⚡ Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone and navigate to backend**:
   \`\`\`bash
   cd backend
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment setup**:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. **Configure environment variables**:
   \`\`\`env
   # Database
   DATABASE_URL="mysql://username:password@localhost:3306/fullstack_assignment"
   
   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-make-it-long-and-random"
   JWT_EXPIRES_IN="7d"
   
   # Bcrypt Configuration
   BCRYPT_ROUNDS=12
   
   # Server Configuration
   PORT=5000
   NODE_ENV="development"
   
   # Email Service (for password reset)
   EMAIL_SERVICE_API_KEY="your-email-service-api-key"
   EMAIL_FROM="noreply@yourapp.com"
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   \`\`\`

5. **Database setup**:
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

6. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

Server will be running at \`http://localhost:5000\`

## 📋 API Endpoints

### Authentication Routes

#### POST /auth/signup
Register a new user account.

**Request Body**:
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "clx1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
\`\`\`

#### POST /auth/login
Authenticate user and get access token.

**Request Body**:
\`\`\`json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "clx1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
\`\`\`

#### GET /auth/me
Get current authenticated user information.

**Headers**:
\`\`\`
Authorization: Bearer <jwt_token>
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": "clx1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
\`\`\`

#### POST /auth/forgot-password
Request password reset token.

**Request Body**:
\`\`\`json
{
  "email": "john@example.com"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent"
}
\`\`\`

#### POST /auth/reset-password
Reset password using token.

**Request Body**:
\`\`\`json
{
  "token": "reset_token_here",
  "password": "NewSecurePass123!"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "Password reset successfully"
}
\`\`\`

### Admin Routes (Bonus Features)

#### GET /admin/users
Get all users (Admin only).

**Headers**:
\`\`\`
Authorization: Bearer <admin_jwt_token>
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "id": "clx1234567890",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "USER",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
\`\`\`

#### PUT /admin/users/:id/role
Update user role (Admin only).

**Headers**:
\`\`\`
Authorization: Bearer <admin_jwt_token>
\`\`\`

**Request Body**:
\`\`\`json
{
  "role": "ADMIN"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "user": {
      "id": "clx1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "ADMIN",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
\`\`\`

## 🛡️ Security Features

### Password Security
- **bcrypt hashing** with configurable rounds (default: 12)
- **Strong password validation** requiring:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character

### JWT Security
- **Secure token generation** with configurable expiration
- **Token verification** middleware for protected routes
- **Role-based authorization** for admin endpoints

### Request Security
- **Rate limiting** (100 requests per 15 minutes by default)
- **CORS protection** with configurable origins
- **Helmet** for security headers
- **Input validation** with Zod schemas
- **SQL injection protection** via Prisma ORM

### Error Handling
- **Centralized error handling** with consistent responses
- **No sensitive data exposure** in error messages
- **Proper HTTP status codes**
- **Development vs production error details**

## 🧪 Testing

### Manual Testing with cURL

**Signup**:
\`\`\`bash
curl -X POST http://localhost:5000/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
\`\`\`

**Login**:
\`\`\`bash
curl -X POST http://localhost:5000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
\`\`\`

**Get Current User**:
\`\`\`bash
curl -X GET http://localhost:5000/auth/me \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

### Running Tests
\`\`\`bash
npm test
\`\`\`

## 📊 Database Schema

### User Model
\`\`\`prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Password reset fields
  resetToken       String?   @unique
  resetTokenExpiry DateTime?

  @@map("users")
}

enum Role {
  USER
  ADMIN
}
\`\`\`

## 🚀 Deployment

### Environment Variables for Production
\`\`\`env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
PORT=5000
\`\`\`

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Deployment Platforms
- **Railway**: Easy deployment with database
- **Render**: Free tier available
- **Heroku**: Classic platform
- **DigitalOcean App Platform**: Scalable option

## 📝 Development Scripts

- \`npm run dev\` - Start development server with hot reload
- \`npm run build\` - Build TypeScript to JavaScript
- \`npm start\` - Start production server
- \`npm test\` - Run test suite
- \`npm run db:generate\` - Generate Prisma client
- \`npm run db:push\` - Push schema to database
- \`npm run db:studio\` - Open Prisma Studio

## 🔍 Code Quality

### TypeScript
- **Full type coverage** throughout the application
- **Strict TypeScript configuration**
- **Custom types and interfaces** for better type safety

### Code Organization
- **MVC architecture** with clear separation of concerns
- **Service layer** for business logic
- **Middleware** for cross-cutting concerns
- **Utility functions** for reusable code

### Error Handling
- **Custom ApiError class** for consistent error handling
- **Centralized error middleware**
- **Proper HTTP status codes**
- **Validation error formatting**

## 🎯 Features Implemented

### Core Requirements ✅
- [x] Signup API with validation
- [x] Login API with bcrypt verification
- [x] Protected /auth/me endpoint
- [x] JWT middleware for route protection
- [x] Zod schema validation
- [x] Centralized error handling
- [x] TypeScript throughout
- [x] Proper MVC architecture

### Bonus Features ✅
- [x] Role-based authorization (USER/ADMIN)
- [x] Password reset functionality
- [x] Rate limiting and security headers
- [x] Comprehensive input validation
- [x] Production-ready error handling
- [x] Database indexing and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of a fullstack intern assignment and is for educational purposes.

---

**Assignment 1 Complete! 🚀**

All requirements and bonus features have been implemented with production-ready code quality.
\`\`\`


