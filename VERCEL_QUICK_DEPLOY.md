# Quick Vercel Deployment Guide

## One-Click Deployment

The fastest way to deploy the J.A.R.V.I.S. Interface is to use the Deploy button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRishirajbal%2FJ.A.R.V.I.S)

## Manual Deployment (5 minutes)

1. **Fork the repository**
   - Go to [github.com/Rishirajbal/J.A.R.V.I.S](https://github.com/Rishirajbal/J.A.R.V.I.S)
   - Click "Fork" in the top right

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your forked repository
   - Configure project:
     - Framework Preset: Other
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `public`
   - Click "Deploy"

3. **Access your deployed site**
   - Vercel will provide a URL (e.g., `jarvis-interface.vercel.app`)
   - Open the URL in your browser
   - Grant camera and microphone permissions when prompted

## CLI Deployment (for developers)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to project directory
cd path/to/J.A.R.V.I.S

# Deploy
vercel --prod
```

For detailed instructions, see [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)