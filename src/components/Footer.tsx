import { Shield, Phone, Mail, Globe, Github, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-gray-400 py-12 px-4 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">ScamShield</span>
            </div>
            <p className="text-gray-400 mb-4">
              Protecting citizens from online fraud through education and awareness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scam-types')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Types of Scams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('safety-tips')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Safety Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scam-alerts')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Scam Alerts
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('report')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Report Fraud
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('emergency')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Emergency Help
                </button>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  National Cyber Crime Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Emergency Contacts</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>Cyber Crime: <span className="text-white font-semibold">1930</span></span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span>Police Emergency: <span className="text-white font-semibold">112</span></span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-cyan-400" />
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:text-cyan-400 transition-colors"
                >
                  cybercrime.gov.in
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-cyan-400" />
                <a
                  href="mailto:support@scamshield.gov.in"
                  className="text-white font-semibold hover:text-cyan-400 transition-colors"
                >
                  support@scamshield.gov.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2026 ScamShield. All rights reserved. A public awareness initiative.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Disclaimer
              </a>
              <button
                onClick={() => onNavigate('admin')}
                className="hover:text-cyan-400 transition-colors text-slate-700"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
