import { ShieldAlert } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldAlert className="h-12 w-12 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Online Fraud Awareness Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Stay Safe from <span className="text-cyan-400">Online Scams</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Educate yourself about cyber fraud, learn to identify scams, and protect yourself from online criminals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#scam-types"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center space-x-2"
              >
                <span>Learn About Scams</span>
              </a>
              <a
                href="#safety-tips"
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200"
              >
                Safety Tips
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-cyan-500/10 rounded-full flex items-center justify-center border-4 border-cyan-500/30">
                <ShieldAlert className="h-32 w-32 md:h-40 md:w-40 text-cyan-400" />
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-500/20 rounded-full animate-pulse delay-75"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
