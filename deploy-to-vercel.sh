#!/bin/bash

# J.A.R.V.I.S. / F.R.I.D.A.Y. Interface Vercel Deployment Script

echo "J.A.R.V.I.S. / F.R.I.D.A.Y. Interface Deployment"
echo "=============================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
echo "Checking Vercel login status..."
if ! vercel whoami &> /dev/null; then
    echo "Please log in to Vercel:"
    vercel login
fi

# Deploy to Vercel
echo ""
echo "Deploying J.A.R.V.I.S. / F.R.I.D.A.Y. Interface to Vercel..."
vercel --prod

echo ""
echo "Deployment complete! Your J.A.R.V.I.S. / F.R.I.D.A.Y. Interface is now online."
echo "You can access your deployment URL from the output above."
echo ""
echo "Thank you for using J.A.R.V.I.S. / F.R.I.D.A.Y. Interface!"