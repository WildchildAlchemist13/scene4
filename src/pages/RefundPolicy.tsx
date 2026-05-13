// REDESIGN IN PROGRESS — visual layer applied after design direction refs land.
// Required by Lemon Squeezy + most digital storefronts. Keep prose plain and clear.

export function RefundPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-widest mb-4">
          REFUND POLICY
        </h1>
        <p className="text-gray-500 text-sm font-mono mb-12">Last updated: 2026-05-13</p>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p>
            Scene4 sells digital download products. The following policy applies to all purchases.
          </p>

          <h2 className="text-xl font-display font-bold tracking-wide text-white mt-8 mb-3">
            Eligibility
          </h2>
          <p>
            Refunds are available within <strong className="text-white">7 days of purchase</strong> in the following cases:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You did not receive the download link (delivery failure)</li>
            <li>The PDF you received is corrupted or unreadable</li>
            <li>The PDF contents materially differ from the product description on this site</li>
          </ul>

          <h2 className="text-xl font-display font-bold tracking-wide text-white mt-8 mb-3">
            Not eligible
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You changed your mind after downloading and consuming the content</li>
            <li>The content didn't match expectations not set by the product page (e.g. you assumed it was a video course)</li>
            <li>Requests submitted more than 7 days after purchase</li>
          </ul>

          <h2 className="text-xl font-display font-bold tracking-wide text-white mt-8 mb-3">
            How to request a refund
          </h2>
          <p>
            Email <a href="mailto:hello@scene4.tech" className="text-neon-cyan hover:underline">hello@scene4.tech</a> with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The email address you purchased with</li>
            <li>Your order number (in the delivery email)</li>
            <li>The reason for the refund</li>
          </ul>
          <p>
            Refunds are processed within 5 business days to the original payment method. Refunds are issued by Lemon Squeezy, our payment processor, in line with their merchant-of-record policy.
          </p>

          <h2 className="text-xl font-display font-bold tracking-wide text-white mt-8 mb-3">
            Disputes
          </h2>
          <p>
            If a payment dispute is opened with your card issuer before contacting us, we will provide the issuer with the order record and download logs. Please email us first — disputes resolved directly are faster for both sides.
          </p>
        </div>
      </div>
    </div>
  );
}
