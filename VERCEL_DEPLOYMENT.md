# Deploying J.A.R.V.I.S to Vercel

This guide explains how to deploy the J.A.R.V.I.S application to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)

## Deployment Steps

### 1. Fork or Clone the Repository

If you haven't already, fork or clone the J.A.R.V.I.S repository to your GitHub account.

### 2. Connect to Vercel

1. Log in to your Vercel account
2. Click "Add New..." and select "Project"
3. Import your GitHub repository (J.A.R.V.I.S)
4. Vercel will automatically detect the project configuration

### 3. Configure Environment Variables

Add the following environment variables in the Vercel project settings:

- `OPENAI_API_KEY`: Your OpenAI API key (if using OpenAI services)
- `WEATHER_API_KEY`: Your weather service API key (if using weather services)
- Any other API keys required by your implementation

### 4. Deploy

1. Click "Deploy" to start the deployment process
2. Vercel will build and deploy your application
3. Once complete, you'll receive a URL for your deployed application

## Project Structure for Vercel

The project has been configured for Vercel deployment with the following files:

- `vercel.json`: Configuration file for Vercel deployment
- `api/index.py`: Entry point for the FastAPI backend
- `api/requirements.txt`: Python dependencies for the backend
- `package.json`: Node.js configuration for the frontend

## Accessing Your Deployed Application

After deployment, you can access your application at:

- Frontend: `https://your-project-name.vercel.app/`
- Backend API: `https://your-project-name.vercel.app/api/`

## Troubleshooting

If you encounter issues with the deployment:

1. Check the Vercel deployment logs for errors
2. Ensure all required environment variables are set
3. Verify that the API paths in the frontend code are correctly configured
4. Check that all dependencies are properly listed in requirements.txt

## Local Development After Vercel Setup

The application is configured to work both locally and on Vercel without code changes:

- When running locally, the API base URL will be `http://localhost:12000`
- When deployed to Vercel, the API base URL will automatically switch to `https://your-project-name.vercel.app/api`

Run locally with:

```bash
./run.sh
```

Or:

```bash
npm run dev
```