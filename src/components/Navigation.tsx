import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'scam-types', label: 'Types of Scams' },
    { id: 'safety-tips', label: 'Safety Tips' },
    { id: 'scam-alerts', label: 'Scam Alerts' },
    { id: 'report', label: 'Report Fraud' },
    { id: 'emergency', label: 'Emergency Help' },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 border-b border-cyan-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">ScamShield</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
