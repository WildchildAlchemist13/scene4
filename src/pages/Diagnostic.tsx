import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, FileText, AlertCircle } from 'lucide-react';

export function Diagnostic() {
  const [title, setTitle] = useState('');
  const [scriptText, setScriptText] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('scripts')
        .insert([
          { 
            user_id: user.id, 
            title, 
            script_text: scriptText,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      
      setStatus('success');
      setTitle('');
      setScriptText('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-12 border-b border-gray-800 pb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest mb-4">
          SCRIPT_DIAGNOSTIC
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Submit your 90-second script for professional feedback. Our analysts will evaluate your Hook, Beat, and Cliffhanger structure.
        </p>
      </div>

      <div className="bg-gray-900/30 border border-gray-800 rounded-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-xs font-display text-neon-cyan uppercase tracking-wider mb-2">
              Script Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors font-mono text-sm"
              placeholder="e.g., The Neon Alley - Ep 1"
            />
          </div>

          <div>
            <label htmlFor="script" className="block text-xs font-display text-neon-cyan uppercase tracking-wider mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Script Content (Max 90 seconds / ~150 words)
            </label>
            <textarea
              id="script"
              required
              rows={12}
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors font-mono text-sm resize-y"
              placeholder="[HOOK: 0-15s]&#10;INT. CYBER CAFE - NIGHT&#10;A glowing terminal screen reflects in Kael's eyes...&#10;&#10;[BEAT: 15-90s]&#10;..."
            />
          </div>

          {status === 'success' && (
            <div className="bg-neon-green/10 border border-neon-green text-neon-green p-4 rounded-sm flex items-start text-sm font-mono">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <p>TRANSMISSION SUCCESSFUL. Your script has been queued for diagnostic review.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-neon-magenta/10 border border-neon-magenta text-neon-magenta p-4 rounded-sm flex items-start text-sm font-mono">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <p>TRANSMISSION FAILED. Please check your connection and try again.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neon-cyan text-black font-display font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            {loading ? 'UPLOADING...' : 'SUBMIT SCRIPT'}
          </button>
        </form>
      </div>
    </div>
  );
}
