// REDESIGN IN PROGRESS — visual layer applied after design direction refs land.
// Content here is the real story; styling will get a full pass in the redesign commit.

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-widest mb-12">
          ABOUT SCENE4
        </h1>

        <section className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p className="text-xl text-gray-200">
            Scene4 is a vertical-storytelling education imprint, written from inside active micro-drama productions.
          </p>

          <p>
            The frameworks in these books — HBC Architecture, Velocity Framework, Tentpole System, the 5-Type Cliffhanger Rotation, the Paywall Strategy — are not theoretical. They are the working systems used to develop original IP for vertical micro-drama platforms (DramaBox, ReelShort, ShortMax, Hoichoi, Klip Digital).
          </p>

          <p>
            Scene4 exists because when I started writing for the format, nothing like this existed. I had to figure it out the hard way — one failed hook, one flat cliffhanger, one episode-six viewer drop-off at a time.
          </p>

          <h2 className="text-2xl font-display font-bold tracking-widest mt-12 mb-4 text-white">
            REVANTH SHARMA
          </h2>
          <p>
            Founder, Scene4. I run a micro-drama production studio developing vertical IP for global platforms. The books are the externalized version of the writing manual our team uses internally on every project.
          </p>

          <h2 className="text-2xl font-display font-bold tracking-widest mt-12 mb-4 text-white">
            WHY THESE BOOKS
          </h2>
          <p>
            The micro-drama industry crossed $6 billion in 2024 and is projected to reach $30 billion by 2028. Platforms are licensing hundreds of series a year. They pay real money for writers who understand the format.
          </p>
          <p>
            But "the format" isn't intuitive. It has its own rules, its own architecture, its own physics. Most writers learn it by burning through 80-episode commissions until something works. These books are the shortcut.
          </p>
        </section>

        <div className="mt-16 flex gap-4">
          <Link
            to="/books"
            className="inline-flex items-center px-6 py-3 bg-neon-cyan text-black font-display font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors"
          >
            Browse the books
            <ChevronRight className="ml-2 w-4 h-4" />
          </Link>
          <Link
            to="/free/cheat-sheet"
            className="inline-flex items-center px-6 py-3 border border-gray-700 text-white font-display font-bold uppercase tracking-widest text-sm hover:border-neon-magenta transition-colors"
          >
            Get the cheat sheet
          </Link>
        </div>
      </div>
    </div>
  );
}
