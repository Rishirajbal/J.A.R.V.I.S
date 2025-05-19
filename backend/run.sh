#!/bin/bash

# Install dependencies if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# Run the FastAPI server
echo "Starting J.A.R.V.I.S backend server..."
python main.py