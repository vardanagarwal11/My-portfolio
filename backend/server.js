const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting to prevent spam
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many contact form submissions, please try again later.'
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Email transporter error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Contact form endpoint
app.post('/api/contact', limiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields.'
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.'
            });
        }

        if (message.length < 10) {
            return res.status(400).json({
                success: false,
                message: 'Message must be at least 10 characters long.'
            });
        }

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name);
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedMessage = sanitizeInput(message);

        // Get client IP for spam prevention
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || 'vardanagarwal11@gmail.com',
            subject: `Portfolio Contact: Message from ${sanitizedName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
                        <p style="margin: 10px 0;"><strong>Message:</strong></p>
                        <div style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px;">
                            ${sanitizedMessage.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="font-size: 12px; color: #666; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <p><strong>Submission Details:</strong></p>
                        <p>Time: ${new Date().toLocaleString()}</p>
                        <p>IP Address: ${clientIP}</p>
                    </div>
                </div>
            `,
            replyTo: sanitizedEmail
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Optional: Send auto-reply to the sender
        if (process.env.SEND_AUTO_REPLY === 'true') {
            const autoReplyOptions = {
                from: process.env.EMAIL_USER,
                to: sanitizedEmail,
                subject: 'Thank you for contacting Vardan Agarwal',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Thank you for reaching out!</h2>
                        <p>Hi ${sanitizedName},</p>
                        <p>I've received your message and will get back to you as soon as possible.</p>
                        <p>Best regards,<br><strong>Vardan Agarwal</strong><br>Web3 & Full-Stack Developer</p>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                        <p style="font-size: 12px; color: #666;">This is an automated response. Please do not reply to this email.</p>
                    </div>
                `
            };
            await transporter.sendMail(autoReplyOptions);
        }

        res.status(200).json({
            success: true,
            message: 'Thank you for your message! I will get back to you soon.'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Email will be sent to: ${process.env.RECIPIENT_EMAIL || 'vardanagarwal11@gmail.com'}`);
});
