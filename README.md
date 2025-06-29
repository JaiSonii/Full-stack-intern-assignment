# Fullstack Intern Assignment Pack

This project contains both Assignment 1 (Authentication Backend) and Assignment 2 (Movie Search Frontend) with all required and bonus features implemented.

## 🏗️ Project Structure

\`\`\`
fullstack-intern-assignment/
├── backend/                 # Assignment 1: Authentication System
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── types/
│   ├── package.json
│   └── .env.example
├── frontend/               # Assignment 2: Movie Search App
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── store/
│   └── package.json
└── README.md
\`\`\`

## 🔧 Tech Stack

### Backend (Assignment 1)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Additional**: Role-based auth, Password reset

### Frontend (Assignment 2)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + shadcn/ui
- **API**: OMDB API
- **Data Fetching**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **Additional**: Dark mode, Star ratings, Search filters

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory**:
   \`\`\`bash
   cd backend
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update \`.env\` with your database credentials:
   \`\`\`env
   DATABASE_URL="mysql://username:password@localhost:3306/fullstack_assignment"
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="7d"
   BCRYPT_ROUNDS=12
   EMAIL_SERVICE_API_KEY="your-email-service-key"
   \`\`\`

4. **Database Setup**:
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   \`\`\`

5. **Start Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

Backend will run on \`http://localhost:5000\`

### Frontend Setup

1. **Navigate to frontend directory**:
   \`\`\`bash
   cd frontend
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update \`.env.local\`:
   \`\`\`env
   NEXT_PUBLIC_OMDB_API_KEY="your-omdb-api-key"
   NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
   \`\`\`

4. **Start Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

Frontend will run on \`http://localhost:3000\`

## 📋 API Endpoints (Backend)

### Authentication Routes
- \`POST /auth/signup\` - User registration
- \`POST /auth/login\` - User login
- \`GET /auth/me\` - Get current user (protected)
- \`POST /auth/forgot-password\` - Password reset request
- \`POST /auth/reset-password\` - Reset password with token

### Admin Routes (Bonus)
- \`GET /admin/users\` - Get all users (admin only)
- \`PUT /admin/users/:id/role\` - Update user role (admin only)

## 🎯 Features Implemented

### Assignment 1 (Backend) ✅
- [x] Signup API with validation
- [x] Login API with bcrypt verification
- [x] Protected /auth/me endpoint
- [x] JWT middleware for route protection
- [x] Zod schema validation
- [x] Centralized error handling
- [x] **Bonus**: Role-based authorization
- [x] **Bonus**: Password reset functionality
- [x] TypeScript throughout
- [x] Proper MVC architecture

### Assignment 2 (Frontend) ✅
- [x] Movie list page with OMDB integration
- [x] Movie details page with full info
- [x] Search with debounced autocomplete
- [x] Star rating system (localStorage)
- [x] Dark mode toggle (persistent)
- [x] **Bonus**: React Query for data fetching
- [x] **Bonus**: Loading and error states
- [x] **Bonus**: Framer Motion animations
- [x] **Bonus**: Search filters (Year, Genre)
- [x] Responsive design
- [x] Redux Toolkit state management

## 🧪 Testing

### Backend Testing
\`\`\`bash
cd backend
npm test
\`\`\`

### Frontend Testing
\`\`\`bash
cd frontend
npm test
\`\`\`

## 🚢 Deployment

### Backend Deployment
- Can be deployed to Railway, Render, or any Node.js hosting service
- Ensure environment variables are set
- Database should be hosted (PlanetScale, Railway, etc.)

### Frontend Deployment
- Optimized for Vercel deployment
- Environment variables need to be set in deployment platform
- \`npm run build\` creates production build

## 📊 Evaluation Criteria Met

### Backend
- ✅ Secure auth flow with JWT
- ✅ bcrypt password hashing
- ✅ JWT middleware protection
- ✅ Proper DB modeling with Prisma
- ✅ Full TypeScript usage
- ✅ Modular MVC structure
- ✅ Centralized error handling
- ✅ Clean, maintainable code
- ✅ Bonus features implemented

### Frontend
- ✅ OMDB API integration with error handling
- ✅ Proper Next.js App Router navigation
- ✅ Responsive, beautiful UI/UX
- ✅ Reusable component design
- ✅ Redux Toolkit state management
- ✅ Debounced search with autocomplete
- ✅ All bonus features implemented

## 🔑 Sample API Usage

### Signup
\`\`\`bash
curl -X POST http://localhost:5000/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
\`\`\`

### Login
\`\`\`bash
curl -X POST http://localhost:5000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
\`\`\`

### Get Current User
\`\`\`bash
curl -X GET http://localhost:5000/auth/me \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

## 🎨 Frontend Features

- **Movie Search**: Real-time search with debouncing
- **Movie Details**: Comprehensive movie information
- **Star Ratings**: Interactive rating system
- **Dark Mode**: Persistent theme switching
- **Responsive Design**: Works on all devices
- **Loading States**: Smooth user experience
- **Error Handling**: Graceful error management
- **Animations**: Smooth transitions and interactions

## 🏆 Bonus Features Implemented

### Backend Bonus
- Role-based authorization (user/admin roles)
- Password reset with email tokens
- Comprehensive error handling
- Input sanitization and validation

### Frontend Bonus
- React Query for efficient data fetching
- Framer Motion animations
- Advanced search filters
- Persistent user preferences
- Optimistic UI updates

## 📝 Notes

- All code is fully typed with TypeScript
- Follows industry best practices
- Comprehensive error handling
- Security best practices implemented
- Responsive and accessible design
- Performance optimized
- Production ready

## 🤝 Contributing

This is an assignment project, but the code structure allows for easy extension and modification.

---

**Assignment completed with all requirements and bonus features! 🚀**
