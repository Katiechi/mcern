// Cloudflare Worker entry.
//
// Serves the static SPA from /dist (via the ASSETS binding, with single-page-app
// fallback configured in wrangler.jsonc) and handles the contact form at
// POST /api/contact, sending email through the Resend API (https://resend.com).
//
// Configure these in the Worker dashboard under Settings → Variables and Secrets
// (mark RESEND_API_KEY as a Secret):
//
//   RESEND_API_KEY   re_xxx                                 (required)
//   CONTACT_TO       info@mcern.org                          (optional)
//   CONTACT_FROM     "M-CERN Website <noreply@mcern.org>"    (optional, Resend-verified domain)
//
// If RESEND_API_KEY is unset the endpoint returns 503 and the frontend falls
// back to opening the visitor's email client (mailto).

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

const SUBJECTS = ["General Inquiry", "Volunteer", "Partnership", "Donate", "Media"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  // Honeypot — bots fill hidden fields; humans never see them.
  const honeypot = data["bot-field"];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: true });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const subject = String(data.subject ?? "").trim();
  const message = String(data.message ?? "").trim();

  const fields: string[] = [];
  if (!name || name.length > 100) fields.push("name");
  if (!EMAIL_RE.test(email) || email.length > 255) fields.push("email");
  if (phone.length > 30) fields.push("phone");
  if (!SUBJECTS.includes(subject)) fields.push("subject");
  if (message.length < 10 || message.length > 1000) fields.push("message");
  if (fields.length) return json({ error: "Validation failed.", fields }, 422);

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: "Email service not configured." }, 503);
  }

  const to = env.CONTACT_TO || "info@mcern.org";
  const from = env.CONTACT_FROM || "M-CERN Website <noreply@mcern.org>";
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[M-CERN] ${subject} — ${name}`,
      text,
    }),
  });

  if (!resp.ok) {
    console.error("Resend send failed:", resp.status, await resp.text().catch(() => ""));
    return json({ error: "Failed to send message." }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
      return handleContact(request, env);
    }

    // Everything else: static assets, with SPA fallback to index.html.
    return env.ASSETS.fetch(request);
  },
};
