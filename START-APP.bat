@echo off
echo ========================================
echo Starting Book Hub Application
echo ========================================
echo.

echo Stopping any existing servers...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo Starting Backend Server (Port 5000)...
start "Book Hub Backend" cmd /k "cd backend && node src/server.js"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend Server (Port 5173)...
start "Book Hub Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Waiting for frontend to start...
timeout /t 8 /nobreak >nul

echo.
echo ========================================
echo Opening Book Hub in browser...
echo ========================================
start http://localhost:5173

echo.
echo Both servers are running!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Login with: demo@bookhub.local / password123
echo.
pause
