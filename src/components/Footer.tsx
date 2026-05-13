// REDESIGN IN PROGRESS — visual layer applied after design direction refs land.

import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 py-16 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-mono font-bold text-xl text-neon-cyan">&gt;_</span>
              <span className="font-display font-bold text-xl tracking-widest text-white">SCENE<span className="text-neon-cyan">4</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Vertical storytelling craft, written from inside active micro-drama productions.
            </p>
          </div>

          {/* Books */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-gray-400 mb-4">Books</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/books" className="hover:text-white transition-colors">All books</Link></li>
              <li><Link to="/books/916-storyteller" className="hover:text-white transition-colors">9:16 Storyteller</Link></li>
              <li><Link to="/books/grab-and-keep" className="hover:text-white transition-colors">Grab &amp; Keep</Link></li>
              <li><Link to="/books/story-mastery" className="hover:text-white transition-colors">Story Mastery</Link></li>
            </ul>
          </div>

          {/* Free */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-gray-400 mb-4">Free</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/free/cheat-sheet" className="hover:text-white transition-colors">HBC Cheat Sheet</Link></li>
              <li><Link to="/free/hooks" className="hover:text-white transition-colors">50 Best Hooks</Link></li>
              <li><Link to="/learn" className="hover:text-white transition-colors">Learn</Link></li>
            </ul>
          </div>

          {/* About + Policy */}
          <div>
            <h4 className="font-display text-xs uppercase tracking-widest text-gray-400 mb-4">Scene4</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund policy</Link></li>
              <li><a href="mailto:hello@scene4.tech" className="hover:text-white transition-colors">hello@scene4.tech</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono">
          <span>© {new Date().getFullYear()} Scene4. All rights reserved.</span>
          <span className="mt-2 md:mt-0">scene4.tech</span>
        </div>
      </div>
    </footer>
  );
}
