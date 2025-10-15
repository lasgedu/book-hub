# Book Hub - Complete Setup Guide

## ✅ BACKEND IS READY AND RUNNING!

Your backend is located at: `C:\Users\Admin\Desktop\book-hub\backend`

### Backend Status
- ✅ All files created
- ✅ Dependencies installed
- ✅ Database seeded with sample data
- ✅ Server running on http://localhost:4000

### Default Login Credentials
- **Email:** demo@bookhub.local
- **Password:** password123

## Backend Files Created

```
C:\Users\Admin\Desktop\book-hub\backend\
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables
├── .env.example         # Example env file
├── README.md            # Backend documentation
├── src/
│   ├── server.js        # Express server
│   ├── db.js            # Database connection & migrations
│   ├── seed.js          # Database seeder
│   └── routes/
│       ├── auth.js      # Authentication endpoints
│       └── books.js     # Books CRUD endpoints
└── data/
    └── bookhub.sqlite   # SQLite database (created after seed)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Books
- `GET /api/books` - Get books (with filtering, search, pagination)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Query Parameters for GET /api/books
- `query` - Search in title, author, description
- `genre` - Filter by genre
- `author` - Filter by author name
- `publishedFrom` - Filter by published date (from)
- `publishedTo` - Filter by published date (to)
- `sortBy` - Sort field (title, author, publishedDate, rating, createdAt)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number
- `pageSize` - Items per page (max 48)

## How to Run Backend

1. **Start development server:**
   ```bash
   cd C:\Users\Admin\Desktop\book-hub\backend
   npm run dev
   ```

2. **Run production server:**
   ```bash
   npm start
   ```

3. **Reseed database:**
   ```bash
   npm run seed
   ```

## Next Steps for Frontend

1. Navigate to frontend directory:
   ```bash
   cd C:\Users\Admin\Desktop\book-hub\frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start frontend dev server:
   ```bash
   npm run dev
   ```

4. Open browser: http://localhost:5173

## Testing the API

### Test with PowerShell:
```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:4000/api/health"

# Get books
Invoke-RestMethod -Uri "http://localhost:4000/api/books"

# Login
$body = @{email="demo@bookhub.local"; password="password123"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

## Troubleshooting

### If backend fails to start:
1. Check if port 4000 is available
2. Ensure all dependencies are installed: `npm install`
3. Check .env file exists with proper values

### If database errors occur:
1. Delete the database: `Remove-Item data\bookhub.sqlite`
2. Reseed: `npm run seed`

### To stop the server:
- Press `Ctrl+C` in the terminal

## Environment Variables (.env)
```
PORT=4000
JWT_SECRET=book-hub-secret-key-2024
SQLITE_PATH=./data/bookhub.sqlite
```

---

🎉 **Backend is complete and ready to use!**
