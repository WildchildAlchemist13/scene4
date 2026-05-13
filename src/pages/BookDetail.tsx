// REDESIGN IN PROGRESS — visual layer applied after design direction refs land.
// Per-book product page. Replaces the thin "Books index only" sales path.
// Each book gets: hero, what's inside (chapter list), who-it's-for, sample
// excerpt, FAQ, sticky-feeling CTA at the bottom. Real depth so a $99 book
// can convert.

import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';

interface BookDef {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  theme: 'neon-cyan' | 'neon-magenta' | 'neon-green';
  price: number;
  originalPrice: number;
  whoItsFor: string[];
  whoItsNotFor: string;
  whatYoullLearn: string[];
  chapters: { num: string; title: string; preview: string }[];
  excerpt: string;
}

const BOOKS: Record<string, BookDef> = {
  '916-storyteller': {
    slug: '916-storyteller',
    title: 'The 9:16 Storyteller',
    tagline: 'The complete micro-drama writing framework — written from inside active vertical-format productions.',
    cover: '/covers/storyteller.png',
    theme: 'neon-cyan',
    price: 19,
    originalPrice: 39,
    whoItsFor: [
      'Aspiring micro-drama writers targeting DramaBox, ReelShort, ShortMax',
      'Content creators who make short-form video and want real narrative architecture behind it',
      'Screenwriters crossing over from long-form into the fastest-growing format in entertainment',
      'Writers tired of staring at a blank page who want a system that works',
    ],
    whoItsNotFor:
      'If you want vague inspiration or "tips for better writing," this is not that. These are working frameworks from active production. They require you to write.',
    whatYoullLearn: [
      'The HBC Architecture — Hook, Beat, Cliffhanger structure for every 90-second episode',
      'The 5-Type Cliffhanger Rotation so your exits are never predictable',
      'The Velocity Framework — five energy zones that map an 80-episode arc',
      'The Tentpole System — placing irreversible cultural/legal events to anchor long arcs',
      'The Paywall Strategy — engineering Episodes 6–8 so viewers pay to continue',
    ],
    chapters: [
      { num: '01', title: 'Hooking Your Viewers from Second One', preview: 'The HBC Architecture. Hook timing, the "weather forecast" test, the three reliable hook types.' },
      { num: '02', title: 'Developing Memorable Archetypes', preview: 'Eight archetypes that build instant attachment. Familiar exterior + surprising interior.' },
      { num: '03', title: 'Writing Dialogue that Crackles in 90 Seconds', preview: 'The 45-second dialogue test. Subtext rules. "Arrive late, leave early" in practice.' },
      { num: '04', title: 'Pacing for Swipe-Stopping Tension', preview: 'The Velocity Framework. RAPID → INCREASING → FAST → BREAKNECK → RESOLVED.' },
      { num: '05', title: 'Crafting Irresistible 80-Episode Plots', preview: 'The Tentpole System. Cultural/legal milestones as structural engines.' },
      { num: '06', title: 'Visualising for Vertical (9:16)', preview: 'What does and does not work on a phone screen. Writing for extreme close-ups.' },
      { num: '07', title: 'Editing and Revising for Maximum Retention', preview: 'The Paywall Strategy. Engineering Episodes 6–8 so the viewer pays.' },
      { num: '08', title: 'Conclusion — Your First 10 Episodes Start Now', preview: 'Where to go from here. How to outline your first ten episodes today.' },
    ],
    excerpt:
      '"It was a beautiful morning in Lagos." — Weather forecast. Rewrite. "She had never lied to a dying woman before. She was about to." — Hook. Keep it.',
  },
  'grab-and-keep': {
    slug: 'grab-and-keep',
    title: 'Grab & Keep',
    tagline: 'Writing stories for the short attention span era — the craft that fills the architecture.',
    cover: '/covers/grabkeep.png',
    theme: 'neon-magenta',
    price: 39,
    originalPrice: 79,
    whoItsFor: [
      'Writers building multi-episode vertical drama who already understand the basics',
      'Anyone who finished The 9:16 Storyteller and wants the craft underneath the architecture',
      'Producers who want to fight viewer drop-off rates with specific, testable craft moves',
    ],
    whoItsNotFor:
      'If you have not yet written or studied a vertical episode, start with The 9:16 Storyteller. Grab & Keep assumes the architecture and goes deep on the craft.',
    whatYoullLearn: [
      'Hook mastery — opening any scene, episode, or story so stopping feels impossible',
      'Character psychology for fast formats — making an audience invested in eight seconds',
      'Emotional pacing — engineering tension across both 90 seconds and 80 episodes',
      'Snappy, purposeful prose — the difference between writing that moves and writing that drags',
      'The short-attention-span reader — what changed about how audiences process story',
    ],
    chapters: [
      { num: '01', title: 'Hooking Your Viewers from Second One', preview: 'The craft of stopping a thumb. The Hook Spectrum. Common opening mistakes.' },
      { num: '02', title: 'Developing Memorable Characters', preview: 'The Five-Layer Character Formula. Wound, want, need, flaw, surface.' },
      { num: '03', title: 'Writing Dialogue that Crackles', preview: 'Voice as wound made audible. The differentiation test. The 45-second rule.' },
      { num: '04', title: 'Pacing for Swipe-Stopping Tension', preview: 'Build, release, build higher, lock. The micro-rhythm inside the Beat.' },
      { num: '05', title: 'Crafting Irresistible Plots', preview: 'The Three-Layer Plot. The Escalation Ladder. Subplots as structural support.' },
      { num: '06', title: "Show, Don't Tell — Writing Visually", preview: 'Micro-expressions, single telling details, emotion through environment.' },
      { num: '07', title: 'Editing and Revising for Maximum Retention', preview: 'The 3-Second Audit. The Fat-Trimming Pass. The Cliffhanger Check.' },
      { num: '08', title: 'Conclusion and Next Steps', preview: 'Seven craft tools, integrated. The path from frameworks to fluency.' },
    ],
    excerpt:
      '"If my grandmother finds out I lied to her on her deathbed, the stroke won\'t kill her — I will." This line does not contain action. It contains three questions. The viewer who hears this cannot leave until they know.',
  },
  'story-mastery': {
    slug: 'story-mastery',
    title: 'Story & Screenplay Mastery',
    tagline: 'A modern, no-bullshit guide to writing stories people actually want to watch.',
    cover: '/covers/mastery.png',
    theme: 'neon-green',
    price: 99,
    originalPrice: 199,
    whoItsFor: [
      'Serious writers and showrunners building original IP for vertical platforms',
      'Screenwriters moving into the micro-drama space who want both new format education and the craft foundation',
      'Anyone who wants the most comprehensive writing education Scene4 publishes',
    ],
    whoItsNotFor:
      'If you want a quick reference, the standalone books are tighter. Story & Screenplay Mastery is a full curriculum and rewards a careful read alongside writing the work.',
    whatYoullLearn: [
      'Theme — what your story is actually about beneath the plot, and how to make it felt',
      'Character — desire, wound, flaw, arc, voice — the techniques that make a fictional person realer than most real people',
      'Conflict — internal and external, escalation ladders, raising stakes without it feeling cheap',
      'Plot & structure — three-act, story circle, micro-drama formula, beat sheets',
      'Dialogue mastery — subtext, rhythm, humour, exposition that hides in conflict',
      'Writing for the short-attention-span era — micro-drama hooks, emotional compression, retention pacing',
      'Story development — from idea → logline → synopsis → treatment → step outline',
      'Screenwriting basics — scene headings, action lines, character slugs, formatting without drama',
      'Revision and editing — pacing fixes, dialogue polishing, brutal cutting',
      'Plus a full case study (Dangal) and a workbook of templates, exercises, scorecards',
    ],
    chapters: [
      { num: '01', title: 'Why Stories Matter', preview: 'Attention span is dead. Why this is great for writers who can grab it.' },
      { num: '02', title: 'Theme: The Invisible Spine', preview: 'What theme is, vs. message vs. moral. How famous films nail it.' },
      { num: '03', title: 'Characters: The Beating Heart', preview: 'Wants vs needs, flaws, fears, ghosts. Arcs that break and heal.' },
      { num: '04', title: 'Conflict: Without It, Your Story Is a Nap', preview: 'Conflict ladders, internal vs external, raising stakes without cringe.' },
      { num: '05', title: 'Plot & Structure (The Not-Boring Edition)', preview: '3-act, hero\'s journey, story circle, non-linear, micro-drama formula.' },
      { num: '06', title: 'Scene Writing Mastery', preview: 'Scene goals, beats, emotional movement. Show don\'t tell without being annoying.' },
      { num: '07', title: 'Dialogue Mastery', preview: 'Subtext, rhythm, timing. Avoiding exposition dumps.' },
      { num: '08', title: 'Writing for the Short Attention-Span Era', preview: 'Micro-drama hooks, emotional compression, OTT vs Reels pacing.' },
      { num: '09', title: 'Story Development Pipeline', preview: 'From idea → logline → synopsis → treatment → step outline.' },
      { num: '10', title: 'Screenwriting Basics', preview: 'Scene headings, action lines, character slugs, formatting.' },
      { num: '11', title: 'Revision, Editing & the Art of Not Crying', preview: 'Cut without mercy. Pacing fixes. Dialogue polishing. Surviving feedback.' },
      { num: '12', title: 'Case Study: Dangal', preview: 'Logline → synopsis → treatment → step outline. Why it works.' },
      { num: '13', title: 'Bonus Tools, Templates & Challenges', preview: 'Logline generator, beat sheets, character worksheet, 30-day challenge.' },
      { num: '14', title: 'Final Words', preview: "You're officially a storyteller now." },
    ],
    excerpt:
      'Modern storytelling demands instant engagement. People want a hook NOW, conflict NOW, emotions NOW. Not after 20 pages of setup. If Family Man took 40 minutes to get to the point, Raj & DK themselves would walk out of the writer\'s room.',
  },
};

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = id ? BOOKS[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!book) navigate('/books');
  }, [book, navigate]);

  if (!book) return null;

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/books"
          className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-12 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK TO ALL BOOKS
        </Link>

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-start">
          <div className={`aspect-[3/4] bg-gray-900 border border-${book.theme}/30 relative overflow-hidden`}>
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          <div>
            <h1 className={`text-4xl md:text-5xl font-display font-bold tracking-widest mb-6 leading-tight text-${book.theme}`}>
              {book.title}
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{book.tagline}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-sm text-gray-600 line-through font-mono">${book.originalPrice}</span>
              <span className="text-4xl font-mono text-white">${book.price}</span>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">USD · Instant download</span>
            </div>

            <Link
              to={`/checkout/${book.slug}`}
              className={`inline-flex items-center justify-center w-full px-8 py-4 bg-${book.theme} text-black font-display font-bold uppercase tracking-widest hover:bg-white transition-colors mb-4`}
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Buy now
            </Link>

            <div className="flex items-center text-gray-500 text-xs font-mono">
              <ShieldCheck className={`w-4 h-4 text-${book.theme} mr-2`} />
              7-day refund window. PDF delivered to your inbox in &lt;60 seconds.
            </div>
          </div>
        </div>

        {/* What you'll learn */}
        <section className="mb-24">
          <h2 className="text-2xl font-display font-bold tracking-widest mb-8 border-b border-gray-800 pb-4">
            WHAT YOU'LL LEARN
          </h2>
          <ul className="space-y-4">
            {book.whatYoullLearn.map((item, i) => (
              <li key={i} className="flex items-start text-gray-300">
                <ChevronRight className={`w-5 h-5 text-${book.theme} mr-3 mt-0.5 flex-shrink-0`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What's inside (chapter list) */}
        <section className="mb-24">
          <h2 className="text-2xl font-display font-bold tracking-widest mb-8 border-b border-gray-800 pb-4">
            WHAT'S INSIDE
          </h2>
          <div className="space-y-4">
            {book.chapters.map((ch) => (
              <div key={ch.num} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-900">
                <div className={`col-span-1 font-mono text-${book.theme}`}>{ch.num}</div>
                <div className="col-span-11">
                  <h3 className="text-white font-display font-bold tracking-wide mb-1">{ch.title}</h3>
                  <p className="text-gray-500 text-sm">{ch.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sample excerpt */}
        <section className="mb-24">
          <h2 className="text-2xl font-display font-bold tracking-widest mb-8 border-b border-gray-800 pb-4">
            FROM THE BOOK
          </h2>
          <blockquote className={`border-l-4 border-${book.theme} pl-6 py-2 text-xl text-gray-200 italic leading-relaxed`}>
            {book.excerpt}
          </blockquote>
        </section>

        {/* Who it's for / not for */}
        <section className="mb-24 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-display font-bold tracking-widest mb-6">WHO IT'S FOR</h2>
            <ul className="space-y-3">
              {book.whoItsFor.map((item, i) => (
                <li key={i} className="text-gray-400 text-sm leading-relaxed">→ {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold tracking-widest mb-6">WHO IT'S NOT FOR</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{book.whoItsNotFor}</p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className={`bg-gray-900/40 border border-${book.theme}/40 p-12 text-center`}>
          <h2 className="text-2xl font-display font-bold tracking-widest mb-3">
            READY?
          </h2>
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <span className="text-sm text-gray-600 line-through font-mono">${book.originalPrice}</span>
            <span className="text-4xl font-mono text-white">${book.price}</span>
          </div>
          <Link
            to={`/checkout/${book.slug}`}
            className={`inline-flex items-center justify-center px-10 py-4 bg-${book.theme} text-black font-display font-bold uppercase tracking-widest hover:bg-white transition-colors`}
          >
            <BookOpen className="w-5 h-5 mr-3" />
            Buy {book.title}
          </Link>
        </section>
      </div>
    </div>
  );
}
