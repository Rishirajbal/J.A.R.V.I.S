#!/bin/bash

echo "Installing J.A.R.V.I.S..."

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file. Please edit it with your API keys."
fi

echo "Installation complete!"
echo "Run './run.sh' to start J.A.R.V.I.S"