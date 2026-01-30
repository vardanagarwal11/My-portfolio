# Portfolio Contact Form Backend

Node.js backend server for handling contact form submissions with email notifications.

## Features

- ✅ Email notifications via Gmail SMTP
- ✅ Input validation and sanitization
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Auto-reply to sender (optional)
- ✅ Spam prevention with IP logging
- ✅ CORS enabled for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Gmail credentials:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail App Password (see instructions below)
   - `RECIPIENT_EMAIL`: Email where you want to receive messages (vardanagarwal11@gmail.com)

### 3. Get Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Factor Authentication** if not already enabled
3. Go to **Security** > **2-Step Verification** > **App passwords**
4. Select **Mail** and generate a password
5. Copy the 16-character password to `EMAIL_PASS` in `.env`

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### POST /api/contact
Submit contact form data

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

### GET /api/health
Health check endpoint

## Deployment Options

### Option 1: Vercel (Recommended for Serverless)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard

### Option 2: Railway
1. Connect your GitHub repo to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically

### Option 3: Traditional VPS (DigitalOcean, AWS, etc.)
1. SSH into your server
2. Clone the repository
3. Install Node.js and npm
4. Run `npm install`
5. Use PM2 to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start server.js --name portfolio-backend
   pm2 save
   pm2 startup
   ```

## Security Features

- **Rate Limiting**: Prevents spam by limiting requests per IP
- **Input Sanitization**: Removes potentially harmful characters
- **Email Validation**: Ensures valid email format
- **CORS**: Configured to accept requests from your domain
- **Environment Variables**: Sensitive data stored securely

## Troubleshooting

### Emails not sending?
- Check Gmail App Password is correct
- Ensure 2FA is enabled on your Google account
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASS in .env

### Port already in use?
- Change PORT in .env file
- Or kill the process using port 3000:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:3000 | xargs kill
  ```

## Support

For issues or questions, contact: vardanagarwal11@gmail.com
