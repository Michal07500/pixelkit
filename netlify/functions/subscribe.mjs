// POST /api/subscribe  { email, consent: true, level?, website? }
//
// Called by the signup form on the website. Adds the email to the MailerLite group
// "Free lesson"; the MailerLite automation emails the free lesson right away and
// then sends the welcome sequence (texts in email/).
//
// Netlify environment variables:
//   MAILERLITE_API_KEY      MailerLite → Integrations → MailerLite API → Generate new token
//   MAILERLITE_GROUP_FREE   ID of the "Free lesson" group (MailerLite → Subscribers → Groups)

import { addToGroup, json } from "../lib/mailerlite.mjs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Invalid request" });
  }

  // Honeypot: the hidden "website" field is invisible to people, bots fill it in.
  if (body.website) return json(200, { ok: true });

  const email = String(body.email || "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return json(400, { error: "Invalid email" });
  if (body.consent !== true) return json(400, { error: "Consent is required" });

  try {
    await addToGroup(email, process.env.MAILERLITE_GROUP_FREE);
    return json(200, { ok: true });
  } catch (err) {
    console.error(err.message);
    return json(502, { error: "Could not subscribe right now" });
  }
};

export const config = { path: "/api/subscribe" };
