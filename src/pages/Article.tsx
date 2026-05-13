// REDESIGN IN PROGRESS — visual layer applied after design direction refs land.
// Article placeholder. Real article content rendered from MDX/CMS in a follow-up
// iteration (after content engine ships first teardowns).

import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function Article() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/learn"
          className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-12 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO LEARN
        </Link>

        <div className="border border-gray-800 bg-gray-900/30 p-12 text-center">
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-4">
            Article: {slug ?? 'unknown'}
          </p>
          <p className="text-gray-400">
            Article rendering pipeline is being wired. Check back soon.
          </p>
        </div>
      </div>
    </div>
  );
}
