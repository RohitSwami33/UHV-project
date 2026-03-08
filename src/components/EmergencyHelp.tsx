import { Phone, Globe, Shield, AlertCircle } from 'lucide-react';

export default function EmergencyHelp() {
  const helplines = [
    {
      icon: Phone,
      service: 'Cyber Crime Helpline',
      contact: '1930',
      description: '24/7 helpline for reporting cyber crimes',
      color: 'text-red-400',
    },
    {
      icon: Globe,
      service: 'National Cyber Crime Portal',
      contact: 'cybercrime.gov.in',
      description: 'Online portal to report cyber crimes',
      color: 'text-cyan-400',
    },
    {
      icon: Shield,
      service: 'Police Emergency',
      contact: '112',
      description: 'Emergency police assistance',
      color: 'text-yellow-400',
    },
    {
      icon: AlertCircle,
      service: 'Consumer Helpline',
      contact: '1800-11-4000',
      description: 'For online shopping and payment frauds',
      color: 'text-green-400',
    },
  ];

  return (
    <section id="emergency" className="bg-slate-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Emergency Help Contacts</h2>
          <p className="text-gray-400 text-lg">Quick access to important helplines and resources</p>
        </div>

        <div className="bg-slate-900 border-2 border-cyan-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-cyan-400 font-bold">Service</th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-bold">Contact</th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                {helplines.map((helpline, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-700 hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <helpline.icon className={`h-6 w-6 ${helpline.color}`} />
                        <span className="text-white font-semibold">{helpline.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-cyan-400 font-mono font-bold text-lg">
                        {helpline.contact}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{helpline.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-red-500/10 border-2 border-red-500 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Important Notice</h3>
              <p className="text-gray-300">
                If you have fallen victim to a scam or notice suspicious activity, report it immediately.
                The sooner you report, the better the chances of preventing further damage and catching the perpetrators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
