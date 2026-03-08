const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { upload } = require('./cloudinary');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.VITE_MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Mongoose Schema
const scamReportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    scamType: { type: String, required: true },
    description: { type: String, required: true },
    screenshotUrl: { type: String },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const ScamReport = mongoose.model('ScamReport', scamReportSchema);

// Routes
app.post('/api/reports', upload.single('screenshot'), async (req, res) => {
    try {
        const { name, email, scamType, description } = req.body;
        const screenshotUrl = req.file ? req.file.path : null;

        const newReport = new ScamReport({
            name,
            email,
            scamType,
            description,
            screenshotUrl
        });

        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully', data: newReport });
    } catch (error) {
        console.error('Error saving report:', error);
        res.status(500).json({ error: 'Failed to submit report' });
    }
});

app.get('/api/reports', async (req, res) => {
    try {
        const reports = await ScamReport.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

app.post('/api/check-password', async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a cybersecurity expert. Analyze the strength of the provided password. Return a JSON object with: 'score' (0-6), 'label' (e.g., 'Weak', 'Strong'), 'color' (hex code or CSS color), and 'feedback' (a short sentence explaining the strength/improvements). BE CONCISE."
                    },
                    {
                        role: "user",
                        content: `Analyze this password: ${password}`
                    }
                ],
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API error: ${response.statusText}`);
        }

        const data = await response.json();
        const analysis = JSON.parse(data.choices[0].message.content);
        res.json(analysis);
    } catch (error) {
        console.error('DeepSeek API Error:', error);
        res.status(500).json({ error: 'Error analyzing password strength' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
