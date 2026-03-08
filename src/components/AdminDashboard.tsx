import { useState, useEffect } from 'react';
import { Shield, ExternalLink, Clock, User, Mail, AlertCircle, FileText, ArrowLeft, Download } from 'lucide-react';

interface Report {
    _id: string;
    name: string;
    email: string;
    scamType: string;
    description: string;
    screenshotUrl?: string;
    status: string;
    createdAt: string;
}

export default function AdminDashboard({ onBack }: { onBack: () => void }) {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/reports');
            const data = await response.json();
            setReports(data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'password1') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid username or password');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchReports();
        }
    }, [isAuthenticated]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const exportForCyberpolice = (report: Report) => {
        const content = `
CASE REPORT FOR CYBERPOLICE
----------------------------
Reference ID: ${report._id}
Submission Date: ${new Date(report.createdAt).toLocaleString()}

REPORTER DETAILS
Name: ${report.name}
Email: ${report.email}

SCAM DETAILS
Type: ${report.scamType}
Status: ${report.status}

DESCRIPTION
${report.description}

EVIDENCE
Screenshot URL: ${report.screenshotUrl || 'No screenshot provided'}

----------------------------
Generated via ScamShield Portal
    `;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cyberpolice_report_${report._id}.txt`;
        a.click();
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-2xl border border-cyan-500/20 shadow-2xl w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="bg-cyan-500/10 p-4 rounded-full">
                            <Shield className="h-12 w-12 text-cyan-400" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white text-center mb-2">Admin Portal</h2>
                    <p className="text-gray-400 text-center mb-8 text-sm">Please enter your credentials</p>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 transition-all font-sans"
                                placeholder="admin"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 transition-all font-mono"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    if (loading && reports.length === 0) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100 p-4 md:p-8 flex flex-col items-center">
            <div className="max-w-7xl w-full">
                <header className="flex justify-between items-center mb-8 bg-slate-800 p-6 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-cyan-400"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Shield className="h-8 w-8 text-cyan-400" />
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-400">Review and manage reported scams</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-cyan-400">{reports.length}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Reports</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[600px]">
                    {/* Reports List */}
                    <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                        {reports.length === 0 ? (
                            <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
                                <p className="text-gray-500">No reports found</p>
                            </div>
                        ) : (
                            reports.map((report) => (
                                <div
                                    key={report._id}
                                    onClick={() => setSelectedReport(report)}
                                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedReport?._id === report._id
                                        ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/20'
                                        : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-700 text-cyan-400">
                                            {report.scamType}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-medium">
                                            {formatDate(report.createdAt)}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-white truncate mb-1">{report.name}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">{report.description}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Report Detail View */}
                    <div className="lg:col-span-2">
                        {selectedReport ? (
                            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl h-full">
                                <div className="p-8">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">{selectedReport.scamType} Report</h2>
                                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {formatDate(selectedReport.createdAt)}</span>
                                                <span className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-tight">
                                                    {selectedReport.status}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => exportForCyberpolice(selectedReport)}
                                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/30 w-full sm:w-auto justify-center"
                                        >
                                            <Download className="h-4 w-4" /> Export for Police
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-4">
                                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                                <div className="text-xs text-gray-500 font-bold uppercase mb-2 flex items-center gap-2">
                                                    <User className="h-3 w-3" /> Reporter Information
                                                </div>
                                                <div className="text-white font-semibold">{selectedReport.name}</div>
                                                <div className="text-cyan-400 text-sm flex items-center gap-1.5 mt-1">
                                                    <Mail className="h-3 w-3" /> {selectedReport.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {selectedReport.screenshotUrl && (
                                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                                    <div className="text-xs text-gray-500 font-bold uppercase mb-2 flex items-center gap-2">
                                                        <FileText className="h-3 w-3" /> Evidence Attached
                                                    </div>
                                                    <a
                                                        href={selectedReport.screenshotUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 text-sm font-medium"
                                                    >
                                                        View Original File <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-8">
                                        <div className="text-xs text-gray-500 font-bold uppercase mb-3 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" /> Case Description
                                        </div>
                                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                            {selectedReport.description}
                                        </p>
                                    </div>

                                    {selectedReport.screenshotUrl && (
                                        <div className="border border-slate-700 rounded-xl overflow-hidden">
                                            <div className="bg-slate-700/50 px-4 py-2 text-xs font-bold text-gray-400 border-b border-slate-700 uppercase tracking-widest">
                                                Metadata Preview
                                            </div>
                                            <div className="p-4 bg-slate-900/80">
                                                <img
                                                    src={selectedReport.screenshotUrl}
                                                    alt="Evidence"
                                                    className="max-w-full h-auto rounded-lg mx-auto shadow-xl"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center p-12 text-center text-gray-500 min-h-[400px]">
                                <div>
                                    <div className="bg-slate-800 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                        <Shield className="h-10 w-10 opacity-20" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-400 mb-2">No Report Selected</h3>
                                    <p className="max-w-xs mx-auto">Select a report from the list on the left to view detailed information and forensics.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
        </div>
    );
}
