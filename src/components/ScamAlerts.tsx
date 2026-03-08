import { AlertTriangle, TrendingUp } from 'lucide-react';

export default function ScamAlerts() {
  const alerts = [
    {
      title: 'Fake Courier Message Scam',
      description: 'Scammers are sending fake courier delivery messages with malicious links claiming packages are held at customs. Do not click on these links or share personal information.',
      date: 'March 5, 2026',
      severity: 'high',
    },
    {
      title: 'Fake Bank KYC Updates',
      description: 'Fraudsters are impersonating banks and asking customers to update KYC details through WhatsApp links. Banks never ask for sensitive information via messaging apps.',
      date: 'March 3, 2026',
      severity: 'critical',
    },
    {
      title: 'AI Voice Cloning for Fraud',
      description: 'Criminals are using AI to clone voices of family members and friends to request urgent money transfers. Always verify such requests through a video call.',
      date: 'March 1, 2026',
      severity: 'high',
    },
    {
      title: 'Fake Government Subsidy Schemes',
      description: 'Scammers are creating fake websites claiming to offer government subsidies and grants. Verify all government schemes through official portals only.',
      date: 'February 28, 2026',
      severity: 'medium',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 border-red-500 text-red-400';
      case 'high':
        return 'bg-orange-500/20 border-orange-500 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
      default:
        return 'bg-blue-500/20 border-blue-500 text-blue-400';
    }
  };

  return (
    <section id="scam-alerts" className="bg-slate-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-8 w-8 text-red-400" />
            <h2 className="text-4xl font-bold text-white">Latest Scam Alerts</h2>
          </div>
          <p className="text-gray-400 text-lg">Stay informed about the newest fraud tactics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="bg-slate-900 border-2 border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(alert.severity)} uppercase`}>
                    {alert.severity}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{alert.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{alert.title}</h3>
              <p className="text-gray-400">{alert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
