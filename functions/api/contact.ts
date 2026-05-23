// Cloudflare Pages Function — handles POST /api/contact
//
// Sends contact-form submissions as email via the Resend API
// (https://resend.com). Configure these in the Cloudflare Pages project under
// Settings → Environment variables (mark RESEND_API_KEY as a Secret):
//
//   RESEND_API_KEY   re_xxx               (required — get it from resend.com)
//   CONTACT_TO       info@mcern.org       (optional — defaults to info@mcern.org)
//   CONTACT_FROM     "M-CERN Website <noreply@mcern.org>"
//                                         (optional — must be a Resend-verified domain)
//
// If RESEND_API_KEY is not set the function returns 503 and the frontend
// gracefully falls back to opening the visitor's email client (mailto).

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
};

type Context = {
  request: Request;
  env: Env;
};

const SUBJECTS = ["General Inquiry", "Volunteer", "Partnership", "Donate", "Media"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost(context: Context): Promise<Response> {
  const { request, env } = context;

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
    // Not configured yet — let the frontend fall back to mailto.
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
    const detail = await resp.text().catch(() => "");
    console.error("Resend send failed:", resp.status, detail);
    return json({ error: "Failed to send message." }, 502);
  }

  return json({ ok: true });
}
