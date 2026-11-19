# CareVanta AI — Production Deployment Guide

### Frontend Deployment (Vercel)
1. Push codebase to GitHub/GitLab.
2. Connect repository to Vercel.
3. Set **Root Directory** to `client`.
4. Configure Build Command: `npm run build` and Output Directory: `dist`.
5. Set Environment Variable: `VITE_API_URL=https://your-backend-domain.com/api`.

### Backend Deployment (Render / Railway / AWS EC2)
1. Deploy from the `server` directory.
2. Set Environment Variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `CLIENT_URL=https://your-frontend-domain.com`
   - `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/carevanta-ai`
   - `JWT_SECRET=your_production_secret`
   - `RAZORPAY_KEY_ID=your_razorpay_id`
   - `RAZORPAY_KEY_SECRET=your_razorpay_secret`
3. Run `node utils/seed.js` to seed initial specializations and demo accounts.
4. Start command: `node server.js`.
