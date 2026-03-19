import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary'.v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'scam-reports',
    allowed_formats: ['jpg', 'png', 'pdf'],
  },
});

const upload = multer({ storage: storage });

// MongoDB Schema
const scamReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  scamType: { type: String, required: true },
  description: { type: String, required: true },
  screenshotUrl: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const ScamReport = mongoose.models.ScamReport || mongoose.model('ScamReport', scamReportSchema);

// Helper to parse multipart form data
const parseMultipart = (req: VercelRequest): Promise<void> => {
  return new Promise((resolve, reject) => {
    upload.single('screenshot')(req as any, {} as any, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Connect to MongoDB
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.VITE_MONGODB_URI || '');
  }

  if (req.method === 'POST') {
    try {
      // Parse multipart form data
      await parseMultipart(req);

      const { name, email, scamType, description } = req.body;
      const screenshotUrl = (req as any).file ? (req as any).file.path : null;

      const newReport = new ScamReport({
        name,
        email,
        scamType,
        description,
        screenshotUrl
      });

      await newReport.save();
      res.status(201).json({ message: 'Report submitted successfully', data: newReport });
    } catch (error: any) {
      console.error('Error saving report:', error);
      res.status(500).json({ error: 'Failed to submit report', details: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const reports = await ScamReport.find().sort({ createdAt: -1 });
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reports' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
