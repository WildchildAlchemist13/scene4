// REDESIGN IN PROGRESS — visual layer applied after design direction refs land.

const FAQS: { q: string; a: string }[] = [
  {
    q: "What format are the books in?",
    a: "All books are PDFs delivered instantly via email after purchase. They open on any device — phone, tablet, laptop. No DRM. The download link is signed and expires after one hour for security; reply to the delivery email if you need it re-sent.",
  },
  {
    q: "Do I get lifetime access?",
    a: "Yes. The PDF is yours permanently. You can re-download via the link in your purchase email or by signing into your dashboard at scene4.tech.",
  },
  {
    q: "Will the books update over time?",
    a: "Substantial revisions go out as a new edition with version notes. Past purchasers get the updated edition free of charge — sent automatically to the email you purchased with.",
  },
  {
    q: "What if I'm new to writing?",
    a: "The 9:16 Storyteller assumes you can write a sentence and have an idea worth telling. It does not assume you've taken a screenwriting class or read books on three-act structure. Start there if you're new.",
  },
  {
    q: "I already write traditional screenplays. Where do I start?",
    a: "Start with The 9:16 Storyteller. It's specifically about the differences between long-form and vertical micro-drama format. The frameworks will look familiar but the application is different.",
  },
  {
    q: "Are the bundles a real discount?",
    a: "Yes. Creator Bundle saves $9 vs buying Books 1+2 individually. Master Collection saves $28 vs buying all three individually. The bundle prices are the only place you get those savings.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — see the refund policy page. Digital products are refundable within 7 days if there's a delivery issue or material defect. Email hello@scene4.tech.",
  },
  {
    q: "Can I share the PDF with my writing room / co-writer?",
    a: "The license is for individual use. If you're a studio or production company that wants to license the books for a writers' room, email hello@scene4.tech for a team license.",
  },
  {
    q: "Will you make a print edition?",
    a: "Maybe eventually. Right now Scene4 is digital-only because the books update too frequently for print to make sense.",
  },
  {
    q: "I have a question that isn't answered here.",
    a: "Email hello@scene4.tech and I'll personally reply within 48 hours.",
  },
];

export function FAQ() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-widest mb-12">
          QUESTIONS
        </h1>

        <div className="space-y-10">
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-gray-800 pb-10 last:border-0">
              <h2 className="text-lg font-display font-bold tracking-wide text-white mb-3">
                {item.q}
              </h2>
              <p className="text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
