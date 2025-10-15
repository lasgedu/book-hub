# 🚀 Book Hub - Start Guide

## ✅ EVERYTHING IS READY!

Both backend and frontend are currently running!

## 🌐 Access the App

**Frontend:** http://localhost:5173  
**Backend API:** http://localhost:5000/api  

## 🔑 Login Credentials

- **Email:** demo@bookhub.local
- **Password:** password123

---

## 📋 How to Start the App (Step by Step)

### Option 1: Both Running (Current Status)
Both servers are already running! Just open http://localhost:5173

### Option 2: Start from Scratch

**Terminal 1 - Backend:**
```powershell
cd C:\Users\Admin\Desktop\book-hub\backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\Admin\Desktop\book-hub\frontend
npm run dev
```

### Option 3: Quick Start Script

Create `start.bat` in `C:\Users\Admin\Desktop\book-hub\`:
```batch
@echo off
start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak
start "Frontend" cmd /k "cd frontend && npm run dev"
echo Opening browser...
timeout /t 5 /nobreak
start http://localhost:5173
```

Then just double-click `start.bat`!

---

## 🎯 Features to Try

1. **Browse Books** - Homepage shows all books
2. **Search** - Type in search bar to find books
3. **Filter by Genre** - Select from dropdown
4. **Filter by Author** - Type author name
5. **Filter by Date** - Select date range
6. **Sort** - Change sort order and field
7. **Pagination** - Navigate through pages
8. **View Details** - Click any book card
9. **Login** - Test authentication
10. **Protected Routes** - Try /admin route

---

## 🔧 Important Ports

- **Backend:** Port 5000 (changed from 4000 to avoid conflicts)
- **Frontend:** Port 5173

**Note:** If you see "Request failed with status code 500", make sure:
1. Backend is running on port 5000
2. Database is seeded: `npm run seed` in backend folder
3. Frontend vite.config.ts proxies to port 5000

---

## 📁 File Structure Summary

```
book-hub/
├── backend/
│   ├── src/
│   │   ├── server.js          ← Express server
│   │   ├── db.js              ← Database setup
│   │   ├── seed.js            ← Database seeder
│   │   └── routes/
│   │       ├── auth.js        ← Login/Register
│   │       └── books.js       ← Books CRUD
│   ├── data/
│   │   └── bookhub.sqlite     ← SQLite database
│   ├── .env                   ← Backend config
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx           ← Entry point
│   │   ├── App.tsx            ← Main app
│   │   ├── pages/             ← All pages
│   │   ├── components/        ← UI components
│   │   ├── state/             ← Redux & Context
│   │   └── utils/             ← API clients
│   ├── vite.config.ts         ← Vite config (proxy to port 5000)
│   └── package.json
│
└── README.md                  ← Full documentation
```

---

## 🐛 Quick Troubleshooting

### Error: "Request failed with status code 500"
**Fix:** 
```powershell
cd C:\Users\Admin\Desktop\book-hub\backend
npm run seed
npm run dev
```

### Error: "Cannot connect to backend"
**Fix:** Check backend is running on port 5000

### Error: Frontend won't start
**Fix:**
```powershell
cd C:\Users\Admin\Desktop\book-hub\frontend
npm install
npm run dev
```

### Error: Port already in use
**Fix:** Kill processes:
```powershell
Stop-Process -Name node -Force
```

---

## ✨ Everything You Need is Ready!

1. ✅ Backend API with authentication
2. ✅ Frontend with Redux and Context
3. ✅ Database seeded with sample books
4. ✅ All CRUD operations working
5. ✅ Filtering, search, pagination
6. ✅ Responsive Material-UI design
7. ✅ TypeScript throughout
8. ✅ Complete documentation

**Just open http://localhost:5173 and enjoy!** 🎉
