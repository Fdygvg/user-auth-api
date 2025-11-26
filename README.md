```markdown
# User Authentication API

A complete Node.js authentication system built with Express, JWT, and MongoDB. Features user registration, login, protected routes, and secure logout functionality.

## 🚀 Features

- **User Registration** - Create new accounts with email and password
- **JWT Authentication** - Secure login with JSON Web Tokens
- **Protected Routes** - Middleware to verify tokens for secure endpoints
- **Password Hashing** - BCrypt for secure password storage
- **Logout System** - Token blacklisting for immediate session termination
- **MongoDB Integration** - Persistent user data storage
- **Error Handling** - Comprehensive error responses and validation

## 📋 API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user and get token | Public |
| POST | `/api/auth/logout` | Logout user (invalidates token) | Protected |
| GET | `/api/user/profile` | Get user profile | Protected |

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/user-auth-api.git
   cd user-auth-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📝 API Usage

### Register a User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Access Protected Route
```http
GET /api/user/profile
Authorization: Bearer your_jwt_token_here
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer your_jwt_token_here
```

## 🏗️ Project Structure

```
user-auth-api/
├── controllers/
│   └── authController.js
├── middleware/
│   └── auth.js
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── .env.example
├── server.js
└── package.json
```

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **BCrypt** - Password hashing
- **dotenv** - Environment variables

## 🧪 Testing with Postman

1. Import the collection from `/postman` folder
2. Set environment variables:
   - `base_url`: Your server URL
   - `token`: Will auto-populate after login

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with BCrypt
- Token blacklisting for logout
- Protected route middleware
- Input validation and sanitization
