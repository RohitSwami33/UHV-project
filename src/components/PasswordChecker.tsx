import { useState } from 'react';
import { Lock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' });

  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };

    if (checks.length) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.special) score++;
    if (pwd.length >= 12) score++;

    let label = '';
    let color = '';

    if (score === 0) {
      label = 'Enter a password';
      color = 'text-gray-400';
    } else if (score <= 2) {
      label = 'Weak';
      color = 'text-red-400';
    } else if (score <= 4) {
      label = 'Medium';
      color = 'text-yellow-400';
    } else if (score <= 5) {
      label = 'Strong';
      color = 'text-green-400';
    } else {
      label = 'Very Strong';
      color = 'text-cyan-400';
    }

    return { score, label, color, checks };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const result = checkPasswordStrength(pwd);
    setStrength({ score: result.score, label: result.label, color: result.color });
  };

  const strengthDetails = password ? checkPasswordStrength(password) : null;

  return (
    <section className="bg-slate-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Lock className="h-8 w-8 text-cyan-400" />
            <h2 className="text-4xl font-bold text-white">Password Strength Checker</h2>
          </div>
          <p className="text-gray-400 text-lg">Test the security of your passwords</p>
        </div>

        <div className="bg-slate-800 border-2 border-cyan-500/20 rounded-xl p-8">
          <div className="mb-6">
            <label htmlFor="password" className="block text-white font-semibold mb-2">
              Enter Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Type a password to check its strength..."
            />
          </div>

          {password && (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Strength:</span>
                  <span className={`font-bold ${strength.color}`}>{strength.label}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength.score <= 2
                        ? 'bg-red-500'
                        : strength.score <= 4
                        ? 'bg-yellow-500'
                        : strength.score <= 5
                        ? 'bg-green-500'
                        : 'bg-cyan-500'
                    }`}
                    style={{ width: `${(strength.score / 6) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-semibold mb-3">Password Requirements:</h3>
                {strengthDetails && (
                  <>
                    <div className="flex items-center space-x-2">
                      {strengthDetails.checks.length ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                      <span className={strengthDetails.checks.length ? 'text-gray-300' : 'text-gray-500'}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {strengthDetails.checks.uppercase ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                      <span className={strengthDetails.checks.uppercase ? 'text-gray-300' : 'text-gray-500'}>
                        Contains uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {strengthDetails.checks.lowercase ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                      <span className={strengthDetails.checks.lowercase ? 'text-gray-300' : 'text-gray-500'}>
                        Contains lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {strengthDetails.checks.number ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                      <span className={strengthDetails.checks.number ? 'text-gray-300' : 'text-gray-500'}>
                        Contains number
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {strengthDetails.checks.special ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                      <span className={strengthDetails.checks.special ? 'text-gray-300' : 'text-gray-500'}>
                        Contains special character
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 bg-cyan-500/10 border border-cyan-500 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    This tool is for demonstration only. Never use your actual passwords on untrusted websites.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
