import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-2xl text-neon-cyan">&gt;_</span>
              <span className="font-display font-bold text-2xl tracking-widest text-white">SCENE<span className="text-neon-cyan">4</span></span>
            </div>
            <p className="text-gray-500 mt-2 text-sm max-w-xs">
              The futuristic storytelling lab for 9:16 vertical content creators.
            </p>
          </div>
          <div className="flex space-x-8 text-sm text-gray-400">
            <Link to="/#framework" className="hover:text-neon-cyan transition-colors">Framework</Link>
            <Link to="/books" className="hover:text-neon-magenta transition-colors">Products</Link>
            <Link to="/diagnostic" className="hover:text-neon-green transition-colors">Diagnostic</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-900 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Scene4. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
