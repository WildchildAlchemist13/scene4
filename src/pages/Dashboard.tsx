import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Book, Download, Clock } from 'lucide-react';

export function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-gray-800 pb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest mb-2">
          USER_TERMINAL
        </h1>
        <p className="text-neon-cyan font-mono text-sm">
          ID: {user?.id || 'UNKNOWN'} | STATUS: ACTIVE
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-display text-white tracking-wider mb-6 flex items-center">
              <Book className="w-5 h-5 mr-3 text-neon-magenta" />
              DIGITAL_ASSETS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Dummy Data for UI */}
              <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-sm hover:border-neon-cyan/50 transition-colors group">
                <h3 className="font-bold text-lg mb-2 group-hover:text-neon-cyan transition-colors">The 9:16 Storyteller</h3>
                <p className="text-gray-400 text-sm mb-4">PDF Format • 45 Pages</p>
                <button className="flex items-center text-xs font-display uppercase tracking-wider text-neon-cyan hover:text-white transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download Asset
                </button>
              </div>
              <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-sm hover:border-neon-cyan/50 transition-colors group">
                <h3 className="font-bold text-lg mb-2 group-hover:text-neon-cyan transition-colors">Grab & Keep</h3>
                <p className="text-gray-400 text-sm mb-4">PDF Format • 120 Pages</p>
                <button className="flex items-center text-xs font-display uppercase tracking-wider text-neon-cyan hover:text-white transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download Asset
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display text-white tracking-wider mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-3 text-neon-green" />
              DIAGNOSTIC_HISTORY
            </h2>
            <div className="bg-gray-900/40 border border-gray-800 rounded-sm overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase bg-black border-b border-gray-800 font-display tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Script Title</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-900/50">
                    <td className="px-6 py-4 font-medium text-white">The Neon Alley</td>
                    <td className="px-6 py-4 text-gray-400">2026-03-15</td>
                    <td className="px-6 py-4 text-neon-green">COMPLETED</td>
                  </tr>
                  <tr className="hover:bg-gray-900/50">
                    <td className="px-6 py-4 font-medium text-white">Cyber Heartbreak</td>
                    <td className="px-6 py-4 text-gray-400">2026-04-01</td>
                    <td className="px-6 py-4 text-neon-cyan">IN_REVIEW</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-black border border-gray-800 p-6 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-neon-magenta/10 blur-2xl"></div>
            <h3 className="font-display text-lg tracking-wider mb-4 text-white">SYSTEM_STATUS</h3>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">AUTH_TOKEN</span>
                <span className="text-neon-green">VALID</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">STORAGE_LINK</span>
                <span className="text-neon-green">CONNECTED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">DIAGNOSTIC_QUEUE</span>
                <span className="text-neon-cyan">NORMAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
