import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Auth flow begins    // For demo purposes, we'll just sign in with a dummy password if it's not magic link
    // In a real app, you'd use magic links or proper password auth
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/#/dashboard',
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900/50 border border-gray-800 p-8 rounded-sm backdrop-blur-sm">
        <div className="flex justify-center mb-8">
          <Terminal className="w-12 h-12 text-neon-cyan" />
        </div>
        <h2 className="text-center text-2xl font-display font-bold text-white tracking-widest mb-2">ACCESS TERMINAL</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Enter your credentials to access the lab.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-display text-neon-cyan uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors font-mono text-sm"
              placeholder="writer@example.com"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neon-cyan text-black font-display font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Send Magic Link'}
          </button>
          
          {message && (
            <div className="mt-4 text-center text-sm font-mono text-neon-magenta">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
