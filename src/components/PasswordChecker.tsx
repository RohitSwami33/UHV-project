import { useState, useEffect } from 'react';
import { Lock, CheckCircle2, XCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    score: number;
    label: string;
    color: string;
    feedback: string;
  } | null>(null);

  const performAIAnalysis = async (pwd: string) => {
    if (!pwd) {
      setAnalysis(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd })
      });

      if (!response.ok) throw new Error('Failed to analyze');

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback local analysis if AI fails
      const localScore = Math.min(6, Math.floor(pwd.length / 2));
      setAnalysis({
        score: localScore,
        label: localScore > 4 ? 'Strong' : 'Weak',
        color: localScore > 4 ? '#4ade80' : '#f87171',
        feedback: 'AI analysis unavailable. Using basic estimation.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Debounced effect for AI analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      if (password) {
        performAIAnalysis(password);
      } else {
        setAnalysis(null);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [password]);

  const getRequirementChecks = (pwd: string) => {
    return {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
  };

  const checks = getRequirementChecks(password);

  return (
    <section className="bg-slate-900 py-16 px-4" id="password-checker">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Lock className="h-8 w-8 text-cyan-400" />
            <h2 className="text-4xl font-bold text-white">AI Password Guard</h2>
          </div>
          <p className="text-gray-400 text-lg flex items-center justify-center gap-2">
            Powered by DeepSeek AI <Sparkles className="h-4 w-4 text-cyan-400" />
          </p>
        </div>

        <div className="bg-slate-800 border-2 border-cyan-500/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {loading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-700 overflow-hidden">
              <div className="h-full bg-cyan-400 animate-progress origin-left"></div>
            </div>
          )}

          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-400 font-bold uppercase text-xs tracking-widest mb-3 ml-1">
              Test your password
            </label>
            <div className="relative">
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-slate-900 text-white border-2 border-slate-700 rounded-xl focus:outline-none focus:border-cyan-500 transition-all text-lg font-mono placeholder:text-slate-700"
                placeholder="Type a password to analyze..."
              />
              {loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                </div>
              )}
            </div>
          </div>

          {password && analysis && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="mb-8 p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-bold text-xs uppercase tracking-tighter">AI Assessment</span>
                  <span className="font-black italic text-xl" style={{ color: analysis.color }}>
                    {analysis.label}
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden mb-4 border border-slate-700 p-0.5">
                  <div
                    className="h-full transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{
                      width: `${(analysis.score / 6) * 100}%`,
                      backgroundColor: analysis.color,
                      boxShadow: `0 0 15px ${analysis.color}66`
                    }}
                  />
                </div>

                <p className="text-gray-300 font-medium leading-relaxed italic">
                  "{analysis.feedback}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-4">Base Requirements</h3>
                  {[
                    { key: 'length', text: 'At least 8 characters' },
                    { key: 'uppercase', text: 'Uppercase letter' },
                    { key: 'lowercase', text: 'Lowercase letter' },
                    { key: 'number', text: 'Number' },
                    { key: 'special', text: 'Special character' }
                  ].map((req) => (
                    <div key={req.key} className="flex items-center space-x-3 bg-slate-900/30 p-2 rounded-lg border border-slate-800/50">
                      {checks[req.key as keyof typeof checks] ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-slate-700" />
                      )}
                      <span className={`text-sm ${checks[req.key as keyof typeof checks] ? 'text-gray-300' : 'text-slate-600'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-5 flex flex-col justify-center">
                  <div className="flex items-start space-x-3 text-cyan-400 mb-2">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="font-bold text-sm">Security Note</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This AI analysis evaluates complexity, common patterns, and potential dictionary attacks. However, never expose actual passwords to any tool.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 2s infinite linear;
        }
      `}</style>
    </section>
  );
}
