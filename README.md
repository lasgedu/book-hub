# Book Hub: A React Discovery App

A full-stack book discovery application built with React, TypeScript, Redux, and Express.js.

## Project Overview

Book Hub is a web application that allows users to browse, search, filter, and discover books. It features user authentication, advanced filtering capabilities, and a responsive interface.

## Features

- Advanced book filtering (genre, author, date range)
- Full-text search across books
- User authentication with JWT
- Pagination and sorting
- Responsive Material-UI design
- Protected admin routes for adding books

## Technologies Used

- **React with TypeScript** - Frontend UI and type safety
- **Redux Toolkit** - State management
- **Material-UI** - UI components and styling
- **Express.js with SQLite** - Backend API and database

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm

### Installation

1. **Setup Backend:**
   ```bash
   cd backend
   npm install
   npm run seed
   npm run dev
   ```
   Backend runs on http://localhost:5000

2. **Setup Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on http://localhost:5173

3. **Access the application:**
   Open http://localhost:5173 in your browser

### Login Credentials
- **Email:** heynedu@gmail.com
- **Password:** 000000

## API Endpoints

### Authentication

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "heynedu@gmail.com",
  "password": "000000"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "heynedu@gmail.com"
  }
}
```

**Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### Books

**Get All Books**
```http
GET /api/books?query=search&genre=Fiction&sortBy=rating&page=1
```

**Get Single Book**
```http
GET /api/books/:id
```

**Create Book** (requires authentication)
```http
POST /api/books
Authorization: Bearer <token>
```

**Update Book** (requires authentication)
```http
PUT /api/books/:id
Authorization: Bearer <token>
```

**Delete Book** (requires authentication)
```http
DELETE /api/books/:id
Authorization: Bearer <token>
```

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration

## Troubleshooting

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check vite.config.ts proxy settings

**Database errors:**
- Delete `backend/data/bookhub.sqlite`
- Run `npm run seed` again

**Port already in use:**
- Kill the process using the port or change port in configuration

---

**Book Hub - Your Ultimate Book Discovery Platform**
