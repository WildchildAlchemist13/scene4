// REDESIGN IN PROGRESS — visual layer applied after design direction refs land.
// This is the blog hub. Article cards are placeholder — real articles ship via the
// content agent loop described in the marketing plan.

import { Link } from 'react-router-dom';

interface ArticleStub {
  slug: string;
  title: string;
  category: string;
  preview: string;
  readMin: number;
}

const PLACEHOLDER_ARTICLES: ArticleStub[] = [];  // empty until the content engine runs

export function Learn() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-widest mb-4">
          LEARN
        </h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          Hook teardowns, episode breakdowns, and craft notes from inside active vertical-drama production.
        </p>

        {PLACEHOLDER_ARTICLES.length === 0 ? (
          <div className="border border-gray-800 bg-gray-900/30 p-12 text-center">
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest mb-4">
              First teardowns shipping soon
            </p>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              In the meantime, get the HBC Framework cheat sheet — the one-page reference that anchors every article.
            </p>
            <Link
              to="/free/cheat-sheet"
              className="inline-flex items-center px-6 py-3 bg-neon-cyan text-black font-display font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
            >
              Get the cheat sheet
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {PLACEHOLDER_ARTICLES.map((a) => (
              <Link
                key={a.slug}
                to={`/learn/${a.slug}`}
                className="border border-gray-800 bg-gray-900/30 p-8 hover:border-neon-cyan transition-colors group"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                  {a.category} · {a.readMin} min read
                </p>
                <h2 className="text-xl font-display font-bold tracking-wide mb-3 group-hover:text-neon-cyan transition-colors">
                  {a.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">{a.preview}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
