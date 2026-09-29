// POST /api/lemon-webhook  (called by Lemon Squeezy after every order)
//
// Lemon Squeezy already emails the buyer their receipt with the download links
// (files attached to the product). This webhook additionally adds the buyer to the
// MailerLite group "Customers", which triggers the customer welcome email and
// stops the sales emails of the free-lesson sequence.
//
// Netlify environment variables:
//   LEMON_WEBHOOK_SECRET        the "Signing secret" you type when creating the webhook in Lemon Squeezy
//   MAILERLITE_API_KEY          same as for /api/subscribe
//   MAILERLITE_GROUP_CUSTOMERS  ID of the "Customers" group

import { createHmac, timingSafeEqual } from "node:crypto";
import { addToGroup, json } from "../lib/mailerlite.mjs";

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  const secret = process.env.LEMON_WEBHOOK_SECRET;
  if (!secret) {
    console.error("LEMON_WEBHOOK_SECRET is not set");
    return json(500, { error: "Not configured" });
  }

  // Verify the request really comes from Lemon Squeezy (HMAC-SHA256 of the raw body).
  const raw = await req.text();
  const expected = Buffer.from(createHmac("sha256", secret).update(raw).digest("hex"));
  const received = Buffer.from(req.headers.get("x-signature") || "");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return json(401, { error: "Invalid signature" });
  }

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const name = event?.meta?.event_name;
  const order = event?.data?.attributes || {};
  if (name !== "order_created" || order.status !== "paid" || !order.user_email) {
    return json(200, { ok: true, ignored: true });
  }

  try {
    await addToGroup(order.user_email, process.env.MAILERLITE_GROUP_CUSTOMERS);
    return json(200, { ok: true });
  } catch (err) {
    console.error(err.message);
    // 500 makes Lemon Squeezy retry the webhook later.
    return json(500, { error: "Could not add customer" });
  }
};

export const config = { path: "/api/lemon-webhook" };
