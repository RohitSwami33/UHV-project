import { CheckCircle2, Shield, Lock, Eye, Wifi, CreditCard } from 'lucide-react';

export default function SafetyTips() {
  const tips = [
    {
      icon: Lock,
      title: 'Never Share OTPs',
      description: 'One-Time Passwords are for your use only. No legitimate organization will ever ask for your OTP.',
    },
    {
      icon: Eye,
      title: 'Verify Links Before Clicking',
      description: 'Hover over links to check the actual URL. Look for HTTPS and the correct domain name.',
    },
    {
      icon: Shield,
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security to your accounts by enabling 2FA wherever possible.',
    },
    {
      icon: Wifi,
      title: 'Avoid Public Wi-Fi for Banking',
      description: 'Never access banking or financial services on public Wi-Fi networks. Use your mobile data instead.',
    },
    {
      icon: CreditCard,
      title: 'Check Bank Statements Regularly',
      description: 'Review your transactions frequently to quickly spot any unauthorized activity.',
    },
    {
      icon: CheckCircle2,
      title: 'Trust Your Instincts',
      description: 'If something seems too good to be true or feels suspicious, it probably is a scam.',
    },
  ];

  return (
    <section id="safety-tips" className="bg-slate-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Essential Safety Tips</h2>
          <p className="text-gray-400 text-lg">Follow these guidelines to protect yourself from online fraud</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-slate-800 border-2 border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-cyan-500/20 p-3 rounded-lg">
                    <tip.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                  <p className="text-gray-400">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
