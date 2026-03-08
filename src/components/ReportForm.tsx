import { useState, useRef } from 'react';
import { Send, Upload, CheckCircle2, FileText } from 'lucide-react';

export default function ReportForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scamType: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scamTypes = [
    'Phishing Emails',
    'Fake Job Offers',
    'UPI Payment Scams',
    'OTP Fraud',
    'Lottery Scams',
    'Fake Shopping Websites',
    'Investment Scams',
    'Romance Scams',
    'Tech Support Scams',
    'Other',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.scamType) {
      newErrors.scamType = 'Please select a scam type';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File size must be less than 5MB' }));
        return;
      }
      setFile(selectedFile);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('scamType', formData.scamType);
      formDataToSend.append('description', formData.description);
      if (file) {
        formDataToSend.append('screenshot', file);
      }

      const response = await fetch('/api/reports', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', scamType: '', description: '' });
      setFile(null);

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting report:', error);
      setErrors({ submit: 'Failed to submit report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (isSuccess) {
    return (
      <section id="report" className="bg-slate-900 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-500/10 border-2 border-green-500 rounded-xl p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Report Submitted Successfully!</h3>
            <p className="text-gray-300">
              Thank you for reporting this scam. Your information helps protect others from fraud.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="report" className="bg-slate-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Report a Scam</h2>
          <p className="text-gray-400 text-lg">
            Help us track and prevent fraud by reporting suspicious activities
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 border-2 border-cyan-500/20 rounded-xl p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-white font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-white font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="scamType" className="block text-white font-semibold mb-2">
              Type of Scam *
            </label>
            <select
              id="scamType"
              name="scamType"
              value={formData.scamType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="">Select a scam type</option>
              {scamTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.scamType && <p className="text-red-400 text-sm mt-1">{errors.scamType}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-white font-semibold mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              placeholder="Please provide detailed information about the scam..."
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Upload Screenshot (Optional)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer"
            >
              {file ? (
                <div className="flex flex-col items-center">
                  <FileText className="h-12 w-12 text-cyan-400 mb-2" />
                  <p className="text-cyan-400 font-medium">{file.name}</p>
                  <p className="text-gray-500 text-sm mt-1">Click to change file</p>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-sm mt-1">PNG, JPG or PDF (Max 5MB)</p>
                </>
              )}
            </div>
            {errors.file && <p className="text-red-400 text-sm mt-1">{errors.file}</p>}
          </div>

          {errors.submit && (
            <div className="mb-6 bg-red-500/10 border border-red-500 rounded-lg p-4">
              <p className="text-red-400">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
