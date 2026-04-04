import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CreditCard, Lock } from 'lucide-react';

const products = {
  '916-storyteller': {
    title: 'The 9:16 Storyteller',
    price: 13,
    originalPrice: 27,
    theme: 'neon-cyan',
    desc: 'The foundational guide to adapting traditional screenwriting for vertical platforms.'
  },
  'grab-and-keep': {
    title: 'Grab & Keep',
    price: 29,
    originalPrice: 57,
    theme: 'neon-cyan',
    desc: 'Advanced retention tactics and psychological hooks for micro-drama series.'
  },
  'story-mastery': {
    title: 'Story & Screenplay Mastery',
    price: 79,
    originalPrice: 159,
    theme: 'neon-cyan',
    desc: 'The complete curriculum. From concept to final draft for multi-season vertical shows.'
  },
  'creator-bundle': {
    title: 'CREATOR BUNDLE',
    price: 33,
    originalPrice: 84,
    theme: 'neon-magenta',
    desc: 'Includes: The 9:16 Storyteller + Grab & Keep'
  },
  'master-collection': {
    title: 'MASTER COLLECTION',
    price: 99,
    originalPrice: 243,
    theme: 'neon-green',
    desc: 'The Complete Curriculum (All 3 Books)'
  }
};

export function Checkout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const product = id ? products[id as keyof typeof products] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      navigate('/books');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleRazorpayRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Placeholder Razorpay routing. Once the user generates real Payment Links in their dashboard, 
    // we would map them here. E.g., `window.location.href = 'https://rzp.io/l/my-actual-link';`
    setTimeout(() => {
      alert("Razorpay Integration Active: This will instantly redirect the user to your official Razorpay Payment Page for $" + product.price + "!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/books')}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          RETURN TO ARTIFACTS
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Order Summary (Left side on Desktop) */}
          <div>
            <h2 className="text-2xl font-display font-bold tracking-widest mb-6 border-b border-gray-800 pb-4">YOUR CART</h2>
            
            <div className={`bg-gray-900/40 border border-${product.theme} p-6 mb-6 rounded-sm relative overflow-hidden`}>
              {/* Subtle accent glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${product.theme}/10 blur-[50px] pointer-events-none rounded-full`}></div>
              
              <h3 className={`text-xl font-bold mb-2 text-${product.theme}`}>{product.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{product.desc}</p>
              
              <div className="flex items-end justify-between border-t border-gray-800 pt-4 mt-6">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-mono block mb-1">Total (USD)</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm text-gray-600 line-through font-mono">${product.originalPrice}</span>
                    <span className="text-3xl font-mono text-white">${product.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start text-gray-400 py-4 px-4 rounded-sm border border-gray-800 bg-gray-900/30">
              <ShieldCheck className={`w-5 h-5 text-${product.theme} mr-3 flex-shrink-0 mt-0.5`} />
              <div>
                <p className="text-sm font-bold text-white mb-1">Instant Digital Access</p>
                <p className="text-xs font-mono text-gray-500">Your artifacts will be emailed instantly after payment via Razorpay's secure global gateway.</p>
              </div>
            </div>
          </div>

          {/* Secure Checkout Form (Right Side) */}
          <div>
            <h2 className="text-2xl font-display font-bold tracking-widest mb-6 border-b border-gray-800 pb-4">SECURE CHECKOUT</h2>
            
            <form onSubmit={handleRazorpayRedirect} className="space-y-6 bg-black border border-gray-800 p-8 rounded-sm">
              <div className="flex justify-center mb-6">
                <Lock className={`w-8 h-8 text-${product.theme} opacity-80`} />
              </div>
              
              <div>
                <label htmlFor="email" className={`block text-xs font-display text-${product.theme} uppercase tracking-wider mb-2`}>
                  Delivery Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-gray-900/50 border border-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-${product.theme} transition-colors font-mono text-sm`}
                  placeholder="name@example.com"
                />
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-sm p-4 text-center mt-6">
                <CreditCard className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500 font-mono">Payment is securely processed by Razorpay. All major international cards supported.</p>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-${product.theme} text-black font-display font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-white transition-all duration-300 disabled:opacity-50 flex justify-center items-center`}
              >
                {loading ? 'Processing...' : 'Proceed to Razorpay'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
