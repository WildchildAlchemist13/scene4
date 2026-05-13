// REDESIGN IN PROGRESS — visual layer applied after design direction refs land.

import React, { useState } from 'react';
import { CheckCircle, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Hooks() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([
        { email, source: 'free-50-hooks', metadata: { name } },
      ]);
      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-neon-magenta mb-4">FREE · TEARDOWN</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-widest mb-6 leading-tight">
              50 BEST VERTICAL-DRAMA HOOKS
            </h1>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              The fifty most scroll-stopping hooks from the past year of vertical micro-drama — broken down frame-by-frame so you can see exactly why they work.
            </p>
            <ul className="space-y-3 text-sm text-gray-300 mb-8">
              <li className="flex items-start"><span className="text-neon-cyan mr-2">→</span> 50 hook examples grouped by type (Conflict, Mystery, Earned Shock)</li>
              <li className="flex items-start"><span className="text-neon-magenta mr-2">→</span> What each hook does in the first 3 seconds</li>
              <li className="flex items-start"><span className="text-neon-green mr-2">→</span> The pattern you can apply to your own scripts</li>
            </ul>
          </div>

          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-sm">
            {status === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-neon-green mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold tracking-widest mb-2">CHECK YOUR INBOX</h3>
                <p className="text-gray-400 text-sm">The teardown is on its way to {email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-neon-magenta transition-colors font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-neon-magenta transition-colors font-mono text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-neon-magenta text-black font-display font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {status === 'loading' ? 'Sending…' : 'Send me the teardown'}
                </button>
                {status === 'error' && (
                  <p className="text-xs font-mono text-red-400">Something went wrong. Please try again.</p>
                )}
                <p className="text-xs font-mono text-gray-500 text-center pt-2">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
