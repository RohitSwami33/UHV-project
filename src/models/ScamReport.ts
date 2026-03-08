import mongoose, { Schema, Document } from 'mongoose';

export interface IScamReport extends Document {
  name: string;
  email: string;
  scamType: string;
  description: string;
  screenshotUrl?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
}

const ScamReportSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  scamType: { type: String, required: true },
  description: { type: String, required: true },
  screenshotUrl: { type: String },
  status: { type: String, default: 'pending', enum: ['pending', 'reviewed', 'resolved'] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ScamReport || mongoose.model<IScamReport>('ScamReport', ScamReportSchema);
