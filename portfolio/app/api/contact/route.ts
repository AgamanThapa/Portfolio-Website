import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Contact form handler.
 *
 * Validates the payload, then forwards it to the endpoint in
 * CONTACT_FORM_ENDPOINT (e.g. a Formspree / Web3Forms / your own webhook URL).
 * Until that variable is set the route answers 501 "not_configured" so the UI
 * can say so honestly instead of pretending a message was delivered.
 */

const hits = new Map<string, { n: number; t: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > WINDOW_MS) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > MAX_HITS;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = str("name");
  const email = str("email");
  const subject = str("subject");
  const message = str("message");

  // honeypot: bots fill the hidden "website" field
  if (str("website")) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 100) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email.";
  if (subject.length < 3 || subject.length > 150) errors.subject = "Please add a short subject.";
  if (message.length < 10 || message.length > 4000) errors.message = "Message should be 10–4000 characters.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 501 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream_failed" }, { status: 502 });
  }
}
