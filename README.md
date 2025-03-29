# User Profile Management API

A RESTful API for managing user profiles with JWT authentication.

# Find the live link [here](https://user-profile-api.vercel.app)

## Features

- User registration and authentication
- JWT-based protected routes
- Profile management (create, retrieve, update)
- MongoDB integration
- Basic frontend with React and Tailwind CSS

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

**Frontend:**
- React
- Tailwind CSS
- React Router

## Project Structure

```
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Middleware functions
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
├── .env            # Environment variables
└── server.js       # Entry point
```

## API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register a new user | Public |
| POST | /api/auth/login | Authenticate user & get token | Public |
| GET | /api/users/:id | Get user profile by ID | Private (own profile only) |
| PUT | /api/users/:id | Update user profile | Private (own profile only) |

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/user-profile-api.git
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables (use `.env.example` as a template).

4. Start the server:
   ```
   node server.js
   ```

### Setting up the frontend

1. Navigate to the frontend directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Testing the API with Postman

A Postman collection is included in the repository. To use it:

1. Import the collection into Postman
2. Set up an environment with the following variables:
   - `baseUrl`: Your API URL (default: http://localhost:3000)
   - `token`: Will be automatically set after login

## License

This project is licensed under the MIT License.