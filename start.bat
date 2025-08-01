@echo off
echo Starting Newari Grain Hub Application...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Development Server...
start cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin
echo.
echo Press any key to exit...
pause >nul
