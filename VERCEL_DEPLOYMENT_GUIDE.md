# Vercel Deployment Guide for J.A.R.V.I.S. Interface

This guide provides detailed instructions for deploying the J.A.R.V.I.S. / F.R.I.D.A.Y. Interface to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git installed on your local machine

## Deployment Options

### Option 1: Deploy using the Vercel CLI (Recommended)

1. **Install the Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to your project directory**
   ```bash
   cd path/to/J.A.R.V.I.S
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```

5. **Follow the prompts**:
   - Set up and deploy "path/to/J.A.R.V.I.S"? [Y/n]: `Y`
   - Which scope do you want to deploy to? Select your account
   - Link to existing project? [y/N]: `N`
   - What's your project's name? `jarvis-interface` (or your preferred name)
   - In which directory is your code located? `./` (or press Enter)
   - Want to override the settings? [y/N]: `N`

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy from the Vercel Dashboard

1. **Push your project to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import your project in the Vercel Dashboard**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure your project:
     - Framework Preset: Other
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `public`
   - Click "Deploy"

### Option 3: Use the Automated Script

We've included a deployment script to simplify the process:

1. **Make the script executable**
   ```bash
   chmod +x deploy-to-vercel.sh
   ```

2. **Run the script**
   ```bash
   ./deploy-to-vercel.sh
   ```

## Verifying Your Deployment

After deployment, Vercel will provide you with a URL where your application is hosted. Visit this URL to ensure everything is working correctly.

## Troubleshooting

- **Camera/Microphone not working**: Make sure your site is served over HTTPS (Vercel does this by default) and that you've granted the necessary permissions in your browser.
- **Deployment fails**: Check the Vercel logs for specific error messages. Common issues include missing dependencies or build errors.
- **Custom domain**: You can add a custom domain to your project through the Vercel dashboard under the "Domains" section of your project settings.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Custom Domains on Vercel](https://vercel.com/docs/concepts/projects/domains)