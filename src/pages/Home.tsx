import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, BookOpen, PenTool, Download, CheckCircle, ShieldCheck, Star, Quote } from 'lucide-react';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

function LeadMagnetSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([{ name, email }]);
      if (error) throw error;
      setStatus('success');
      // Trigger download (simulated)
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'HBC_Framework_Blueprint.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="blueprint" className="py-24 bg-black border-b border-gray-900 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-neon-magenta/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-widest mb-6">GET THE HBC FRAMEWORK BLUEPRINT</h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Download the exact Hook → Beat → Cliffhanger framework used to design high-retention vertical stories.
        </p>
        
        {status === 'success' ? (
          <div className="bg-neon-green/10 border border-neon-green p-6 rounded-sm flex flex-col items-center justify-center">
            <CheckCircle className="w-12 h-12 text-neon-green mb-4" />
            <h3 className="text-xl font-display text-white mb-2">TRANSMISSION SUCCESSFUL</h3>
            <p className="text-neon-green font-mono text-sm">Your blueprint download has started.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neon-magenta transition-colors font-mono text-sm"
            />
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neon-magenta transition-colors font-mono text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-neon-magenta text-black font-display font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              {status === 'loading' ? 'PROCESSING...' : 'SEND ME THE FRAMEWORK'}
            </button>
            {status === 'error' && (
              <p className="text-neon-magenta font-mono text-xs mt-2">Error capturing lead. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          {/* Abstract background representing 9:16 frame */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[533px] md:w-[400px] md:h-[711px] border border-gray-800/50 rounded-sm flex items-center justify-center">
            <div className="w-[98%] h-[98%] border border-gray-800/30 rounded-sm"></div>
          </div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-magenta/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 glitch-effect" data-text="MASTER VERTICAL STORYTELLING">
              MASTER VERTICAL<br />STORYTELLING
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
              Learn the <span className="text-neon-cyan font-medium">Hook</span> → <span className="text-neon-magenta font-medium">Beat</span> → <span className="text-neon-green font-medium">Cliffhanger</span> framework used to build addictive short-form stories for TikTok, Reels, and mobile-first micro-dramas.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#blueprint" className="inline-flex items-center justify-center px-8 py-4 text-base font-display font-bold text-black bg-neon-cyan hover:bg-white transition-colors rounded-sm uppercase tracking-widest">
                Explore Framework
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <Link to="/books" className="inline-flex items-center justify-center px-8 py-4 text-base font-display font-bold text-white border border-gray-700 hover:border-neon-magenta transition-colors rounded-sm uppercase tracking-widest">
                View Books
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="py-8 border-b border-gray-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-6">Trusted by creators featured on</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            <div className="font-display font-bold text-xl tracking-widest">TIKTOK CREATORS</div>
            <div className="font-display font-bold text-xl tracking-widest">REELS ACADEMY</div>
            <div className="font-display font-bold text-xl tracking-widest">INDIE SHORT FEST</div>
            <div className="font-display font-bold text-xl tracking-widest">MICRO-DRAMA STUDIOS</div>
          </div>
        </div>
      </section>

      {/* HBC Framework Section */}
      <section id="framework" className="py-24 bg-gray-900/20 border-y border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-widest mb-4">THE HBC FRAMEWORK</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">The proprietary architecture behind high-retention micro-drama and short-form video.</p>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2 z-0"></div>
            
            {/* Hook */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-black border border-neon-cyan/30 p-6 relative z-10 w-full md:w-[30%] mb-8 md:mb-0 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-display font-bold text-white">HOOK</h3>
                <div className="text-neon-cyan font-mono text-sm bg-neon-cyan/10 px-2 py-1 rounded-sm">0–15s</div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The moment that captures attention. Disrupt the scroll with an immediate visual or narrative paradox.
              </p>
            </motion.div>

            {/* Beat */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-black border border-neon-magenta/30 p-6 relative z-10 w-full md:w-[30%] mb-8 md:mb-0 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-neon-magenta transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-display font-bold text-white">BEAT</h3>
                <div className="text-neon-magenta font-mono text-sm bg-neon-magenta/10 px-2 py-1 rounded-sm">15–90s</div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Emotional escalation. Build tension through rapid conflict development and rising stakes.
              </p>
            </motion.div>

            {/* Cliffhanger */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-black border border-neon-green/30 p-6 relative z-10 w-full md:w-[30%] group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-neon-green transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-display font-bold text-white">CLIFFHANGER</h3>
                <div className="text-neon-green font-mono text-sm bg-neon-green/10 px-2 py-1 rounded-sm">90–120s</div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The moment that forces the viewer to stay. An unresolved question that demands the next episode.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <LeadMagnetSection />

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-900/20 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-widest mb-4">TRANSMISSIONS</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Field reports from creators using the HBC Framework.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-black border border-gray-800 p-8 rounded-sm relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-800" />
              <div className="flex text-neon-cyan mb-4">
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">"The HBC Framework completely changed how I write. My retention rate on TikTok doubled within a week. The beat escalation tactics are lethal."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-800 rounded-full mr-4 overflow-hidden">
                  <img src="https://picsum.photos/seed/sarah/100/100" alt="Sarah J." className="w-full h-full object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm">Sarah J.</div>
                  <div className="font-mono text-xs text-neon-cyan">Screenwriter</div>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-black border border-gray-800 p-8 rounded-sm relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-800" />
              <div className="flex text-neon-magenta mb-4">
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">"The Master Collection is the best investment I've made for my micro-drama studio. The ROI is insane. We use this for every script now."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-800 rounded-full mr-4 overflow-hidden">
                  <img src="https://picsum.photos/seed/marcus/100/100" alt="Marcus T." className="w-full h-full object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm">Marcus T.</div>
                  <div className="font-mono text-xs text-neon-magenta">Director</div>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-black border border-gray-800 p-8 rounded-sm relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-800" />
              <div className="flex text-neon-green mb-4">
                <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">"The script diagnostic service pointed out exactly where my beats were dragging. The feedback was brutal but exactly what I needed."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-800 rounded-full mr-4 overflow-hidden">
                  <img src="https://picsum.photos/seed/elena/100/100" alt="Elena R." className="w-full h-full object-cover grayscale opacity-80" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm">Elena R.</div>
                  <div className="font-mono text-xs text-neon-green">Content Creator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black border-t border-gray-900 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-widest mb-6">PROFESSIONAL SCRIPT DIAGNOSTICS</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Submit your 90-second script and receive structured feedback using the Hook → Beat → Cliffhanger framework.
              </p>
              <ul className="space-y-4 mb-8 font-mono text-sm text-gray-300">
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-neon-cyan mr-2" /> 48-hour turnaround</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-neon-cyan mr-2" /> Actionable structural feedback</li>
                <li className="flex items-center"><ChevronRight className="w-4 h-4 text-neon-cyan mr-2" /> Retention probability score</li>
              </ul>
              <Link to="/diagnostic" className="inline-flex items-center justify-center px-8 py-4 text-base font-display font-bold text-black bg-neon-cyan hover:bg-white transition-colors rounded-sm uppercase tracking-widest">
                <PenTool className="w-5 h-5 mr-3" />
                Submit Script
              </Link>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="aspect-video bg-gray-900 border border-gray-800 rounded-sm relative flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/cyberpunk/800/450')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="w-16 h-16 rounded-full border-2 border-neon-cyan flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 text-neon-cyan ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
