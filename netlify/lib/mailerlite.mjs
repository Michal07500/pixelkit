// Shared helper: adds (or updates) a subscriber in MailerLite and puts them in a group.
// A MailerLite automation ("when a subscriber joins group …") then sends the emails.
// The API key only lives in Netlify's environment variables, never in the website code.

export async function addToGroup(email, groupId, fields) {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key || !groupId) throw new Error("MailerLite is not configured (MAILERLITE_API_KEY / group ID missing)");
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, groups: [String(groupId)], ...(fields ? { fields } : {}) }),
  });
  if (!res.ok) {
    // Log the status and MailerLite's message (never the key) so it shows up in Netlify → Logs → Functions.
    const text = await res.text().catch(() => "");
    throw new Error(`MailerLite responded ${res.status}: ${text.slice(0, 300)}`);
  }
}

export function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}
