import { Mail, Briefcase, Smartphone, Key, Gift, ShoppingCart } from 'lucide-react';

export default function ScamTypes() {
  const scams = [
    {
      icon: Mail,
      title: 'Phishing Emails',
      description: 'Fraudulent emails pretending to be from legitimate companies to steal your personal information.',
      color: 'bg-red-500/10 border-red-500/30',
      iconColor: 'text-red-400',
    },
    {
      icon: Briefcase,
      title: 'Fake Job Offers',
      description: 'Scammers offering high-paying jobs that require upfront fees or personal information.',
      color: 'bg-yellow-500/10 border-yellow-500/30',
      iconColor: 'text-yellow-400',
    },
    {
      icon: Smartphone,
      title: 'UPI Payment Scams',
      description: 'Fraudsters tricking victims into sending money through UPI by posing as officials or relatives.',
      color: 'bg-purple-500/10 border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: Key,
      title: 'OTP Fraud',
      description: 'Criminals calling to obtain your one-time password to access your bank accounts or online services.',
      color: 'bg-blue-500/10 border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      icon: Gift,
      title: 'Lottery Scams',
      description: 'Fake lottery or prize notifications asking for fees or personal details to claim winnings.',
      color: 'bg-green-500/10 border-green-500/30',
      iconColor: 'text-green-400',
    },
    {
      icon: ShoppingCart,
      title: 'Fake Shopping Websites',
      description: 'Counterfeit e-commerce sites offering products at unbelievable prices to steal payment information.',
      color: 'bg-cyan-500/10 border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
  ];

  return (
    <section id="scam-types" className="bg-slate-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Common Types of Scams</h2>
          <p className="text-gray-400 text-lg">Learn to identify and protect yourself from these prevalent online frauds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scams.map((scam, index) => (
            <div
              key={index}
              className={`${scam.color} border-2 rounded-xl p-6 hover:scale-105 transition-all duration-300 backdrop-blur-sm`}
            >
              <div className={`${scam.iconColor} mb-4`}>
                <scam.icon className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{scam.title}</h3>
              <p className="text-gray-300">{scam.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
