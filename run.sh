#!/bin/bash

# Start the backend server
echo "Starting J.A.R.V.I.S backend server..."
cd backend
python main.py &
BACKEND_PID=$!

# Wait for the backend to start
sleep 2

# Start a simple HTTP server for the frontend
echo "Starting HTTP server for the frontend..."
cd ../MCU
python -m http.server 12001 &
FRONTEND_PID=$!

echo "J.A.R.V.I.S is now running!"
echo "Backend API: http://localhost:12000"
echo "Frontend UI: http://localhost:12001/MCU.html"
echo "API Test Page: http://localhost:12001/test-api.html"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait