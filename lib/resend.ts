import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = process.env.RESEND_FROM ?? 'Scene4 <deliver@scene4.tech>';

export async function sendDeliveryEmail(params: {
  to: string;
  productTitle: string;
  downloadUrls: string[];
}) {
  const { to, productTitle, downloadUrls } = params;

  const linkRows = downloadUrls
    .map(
      (url, i) =>
        `<p style="margin:0 0 12px"><a href="${url}" style="color:#00f5ff;font-weight:bold;text-decoration:none">↓ Download File ${i + 1}</a> <span style="color:#555;font-size:11px">&nbsp;(link expires in 1 hour)</span></p>`
    )
    .join('\n');

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: `Your Scene4 artifact — ${productTitle}`,
    html: `
      <div style="background:#0a0a0a;color:#e0e0e0;font-family:'Courier New',monospace;padding:48px 40px;max-width:600px;margin:0 auto;border:1px solid #1a1a1a">
        <p style="color:#00f5ff;font-size:11px;letter-spacing:6px;text-transform:uppercase;margin:0 0 24px">TRANSMISSION COMPLETE</p>
        <h1 style="color:#fff;font-size:24px;margin:0 0 8px;font-weight:700">${productTitle}</h1>
        <p style="color:#888;font-size:14px;margin:0 0 32px">Your artifact is ready for immediate download.</p>
        <div style="background:#111;border:1px solid #222;padding:24px;margin-bottom:32px">${linkRows}</div>
        <p style="color:#555;font-size:12px;line-height:1.6;margin:0 0 8px">Download links expire in <strong style="color:#888">1 hour</strong>. Save your files immediately.</p>
        <p style="color:#555;font-size:12px;line-height:1.6;margin:0 0 32px">Need a re-send? Reply to this email.</p>
        <hr style="border:none;border-top:1px solid #1a1a1a;margin:32px 0"/>
        <p style="color:#333;font-size:11px;letter-spacing:2px;text-transform:uppercase">Scene4 — Vertical Storytelling Education</p>
      </div>
    `,
  });

  if (error) {
    console.error('[resend] delivery email failed:', error);
    throw new Error(`Email delivery failed: ${error.message}`);
  }
}

export async function sendWelcomeEmail(to: string) {
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: 'You are on the Scene4 radar',
    html: `
      <div style="background:#0a0a0a;color:#e0e0e0;font-family:'Courier New',monospace;padding:48px 40px;max-width:600px;margin:0 auto;border:1px solid #1a1a1a">
        <p style="color:#00f5ff;font-size:11px;letter-spacing:6px;text-transform:uppercase;margin:0 0 24px">ACCESS GRANTED</p>
        <h1 style="color:#fff;font-size:24px;margin:0 0 8px;font-weight:700">You are on the Scene4 radar.</h1>
        <p style="color:#888;font-size:14px;margin:0 0 32px;line-height:1.7">Scene4 teaches the craft of vertical storytelling — the HBC framework, micro-drama structure, and the business of selling stories on 9:16 platforms.</p>
        <p style="color:#888;font-size:14px;margin:0 0 16px;line-height:1.7">Three beats. Every 90-second story is built on them.</p>
        <ul style="color:#888;font-size:14px;line-height:2;margin:0 0 32px;padding-left:20px">
          <li><strong style="color:#00f5ff">Hook</strong> — 0–15s. Force them to stay.</li>
          <li><strong style="color:#ff00ff">Beat</strong> — 15–90s. Escalate every 20s.</li>
          <li><strong style="color:#00ff88">Cliffhanger</strong> — final 5s. Make the next episode mandatory.</li>
        </ul>
        <a href="https://scene4.tech/books" style="display:inline-block;background:#00f5ff;color:#000;font-family:'Courier New',monospace;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 28px">Browse the Artifacts →</a>
        <hr style="border:none;border-top:1px solid #1a1a1a;margin:40px 0"/>
        <p style="color:#333;font-size:11px;letter-spacing:2px;text-transform:uppercase">Scene4 — Vertical Storytelling Education</p>
      </div>
    `,
  });

  if (error) console.error('[resend] welcome email failed:', error);
}
