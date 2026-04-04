import { BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Books() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-widest mb-4">DIGITAL ARTIFACTS</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Premium guides and frameworks for the modern storyteller.</p>
        </div>

        {/* Launch Offer Banner */}
        <div className="max-w-3xl mx-auto mb-16 bg-neon-cyan/10 border border-neon-cyan p-4 rounded-sm text-center">
          <p className="text-neon-cyan font-display font-bold tracking-widest uppercase">
            Launch Offer — 50% Off (First 30 Days)
          </p>
        </div>

        {/* Individual Books */}
        <div className="mb-24">
          <h2 className="text-2xl font-display font-bold tracking-widest mb-8 border-b border-gray-800 pb-4">INDIVIDUAL BOOKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book 1 */}
            <div className="bg-gray-900/30 border border-gray-800 p-6 flex flex-col">
              <div className="aspect-[3/4] bg-gray-800 mb-6 relative overflow-hidden flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">The 9:16 Storyteller</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">The foundational guide to adapting traditional screenwriting for vertical platforms.</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through font-mono">$27</span>
                  <span className="text-2xl font-mono text-white">$13</span>
                </div>
                <Link to="/checkout/916-storyteller" className="px-4 py-2 bg-white text-black font-display text-sm font-bold uppercase hover:bg-neon-cyan transition-colors">Purchase</Link>
              </div>
            </div>

            {/* Book 2 */}
            <div className="bg-gray-900/30 border border-gray-800 p-6 flex flex-col">
              <div className="aspect-[3/4] bg-gray-800 mb-6 relative overflow-hidden flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Grab & Keep</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">Advanced retention tactics and psychological hooks for micro-drama series.</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through font-mono">$57</span>
                  <span className="text-2xl font-mono text-white">$29</span>
                </div>
                <Link to="/checkout/grab-and-keep" className="px-4 py-2 bg-white text-black font-display text-sm font-bold uppercase hover:bg-neon-cyan transition-colors">Purchase</Link>
              </div>
            </div>

            {/* Book 3 */}
            <div className="bg-gray-900/30 border border-gray-800 p-6 flex flex-col">
              <div className="aspect-[3/4] bg-gray-800 mb-6 relative overflow-hidden flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-2">Story & Screenplay Mastery</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">The complete curriculum. From concept to final draft for multi-season vertical shows.</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through font-mono">$159</span>
                  <span className="text-2xl font-mono text-white">$79</span>
                </div>
                <Link to="/checkout/story-mastery" className="px-4 py-2 bg-white text-black font-display text-sm font-bold uppercase hover:bg-neon-cyan transition-colors">Purchase</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bundles */}
        <div>
          <h2 className="text-2xl font-display font-bold tracking-widest mb-8 border-b border-gray-800 pb-4">BUNDLE OFFERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Creator Bundle */}
            <div className="bg-gray-900/30 border border-neon-magenta/50 p-8 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-magenta text-black text-xs font-display font-bold px-3 py-1 uppercase tracking-widest whitespace-nowrap">Most Popular</div>
              <h3 className="text-2xl font-display font-bold mb-2 text-neon-magenta">CREATOR BUNDLE</h3>
              <p className="text-gray-400 text-sm mb-6">Includes: The 9:16 Storyteller + Grab & Keep</p>
              
              <div className="space-y-2 mb-8 flex-grow">
                <div className="flex items-center text-sm"><ShieldCheck className="w-4 h-4 text-neon-magenta mr-2"/> Foundational vertical screenwriting</div>
                <div className="flex items-center text-sm"><ShieldCheck className="w-4 h-4 text-neon-magenta mr-2"/> Advanced retention tactics</div>
              </div>

              <div className="mb-6 text-sm font-mono text-gray-400 space-y-1 border-t border-gray-800 pt-4">
                <div className="flex justify-between"><span>Value:</span> <span className="line-through">$84</span></div>
                <div className="flex justify-between text-neon-magenta"><span>Savings:</span> <span>$17</span></div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through font-mono">$67</span>
                  <span className="text-3xl font-mono text-white">$33</span>
                </div>
                <Link to="/checkout/creator-bundle" className="px-6 py-3 bg-neon-magenta text-black font-display text-sm font-bold uppercase hover:bg-white transition-colors">Purchase Bundle</Link>
              </div>
            </div>

            {/* Master Collection */}
            <div className="bg-gray-900/30 border-2 border-neon-green p-8 flex flex-col relative shadow-[0_0_15px_rgba(0,255,0,0.15)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-green text-black text-xs font-display font-bold px-3 py-1 uppercase tracking-widest whitespace-nowrap">Best Value</div>
              <h3 className="text-2xl font-display font-bold mb-2 text-neon-green">MASTER COLLECTION</h3>
              <p className="text-gray-400 text-sm mb-6">The Complete Curriculum (All 3 Books)</p>
              
              <div className="space-y-2 mb-8 flex-grow">
                <div className="flex items-center text-sm"><ShieldCheck className="w-4 h-4 text-neon-green mr-2"/> The 9:16 Storyteller</div>
                <div className="flex items-center text-sm"><ShieldCheck className="w-4 h-4 text-neon-green mr-2"/> Grab & Keep</div>
                <div className="flex items-center text-sm"><ShieldCheck className="w-4 h-4 text-neon-green mr-2"/> Story & Screenplay Mastery</div>
              </div>

              <div className="mb-6 text-sm font-mono text-gray-400 space-y-1 border-t border-gray-800 pt-4">
                <div className="flex justify-between"><span>Total Value:</span> <span className="line-through">$243</span></div>
                <div className="flex justify-between text-neon-green"><span>Savings:</span> <span>$44</span></div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through font-mono">$199</span>
                  <span className="text-3xl font-mono text-white">$99</span>
                </div>
                <Link to="/checkout/master-collection" className="px-6 py-3 bg-neon-green text-black font-display text-sm font-bold uppercase hover:bg-white transition-colors">Purchase Collection</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-24 flex items-center justify-center text-gray-400 bg-gray-900/30 py-4 px-6 rounded-sm border border-gray-800 max-w-2xl mx-auto">
          <ShieldCheck className="w-6 h-6 text-neon-green mr-3 flex-shrink-0" />
          <span className="font-mono text-sm">30-Day Money-Back Guarantee on all digital artifacts. No questions asked.</span>
        </div>
      </div>
    </div>
  );
}
