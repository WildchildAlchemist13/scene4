import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="font-mono font-bold text-xl text-neon-cyan group-hover:text-neon-magenta transition-colors">&gt;_</span>
            <span className="font-display font-bold text-xl tracking-widest text-white">SCENE<span className="text-neon-cyan">4</span></span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/books" className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors px-3 py-2">
              Books
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors px-3 py-2">
                  Dashboard
                </Link>
                <Link to="/diagnostic" className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors px-3 py-2">
                  Diagnostic
                </Link>
                <button 
                  onClick={() => supabase.auth.signOut()}
                  className="text-sm font-medium text-neon-magenta hover:text-white transition-colors px-3 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium text-black bg-neon-cyan hover:bg-white transition-colors px-4 py-2 rounded-sm uppercase tracking-wider font-display">
                Access Terminal
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
