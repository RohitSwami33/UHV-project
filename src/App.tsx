import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ScamTypes from './components/ScamTypes';
import SafetyTips from './components/SafetyTips';
import ScamAlerts from './components/ScamAlerts';
import ReportForm from './components/ReportForm';
import EmergencyHelp from './components/EmergencyHelp';
import PasswordChecker from './components/PasswordChecker';
import ScamQuiz from './components/ScamQuiz';
import Footer from './components/Footer';

function App() {
  const handleNavigate = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const handleReportClick = () => {
    handleNavigate('report');
  };

  useEffect(() => {
    document.title = 'ScamShield - Online Fraud Awareness Portal';
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation onNavigate={handleNavigate} />
      <Hero onReportClick={handleReportClick} />
      <ScamTypes />
      <SafetyTips />
      <ScamAlerts />
      <ReportForm />
      <EmergencyHelp />
      <PasswordChecker />
      <ScamQuiz />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
