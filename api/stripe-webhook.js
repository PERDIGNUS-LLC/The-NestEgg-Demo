// api/stripe-webhook.js

import Stripe from "stripe";

export const config = {
  runtime: "nodejs"
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // Stripe requires the RAW request body for webhook verification
    const rawBody = await getRawBody(req);

    const signature = req.headers["stripe-signature"];

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET
    );

    // We only care about completed Checkout purchases
    if (event.type !== "checkout.session.completed") {
      return res.status(200).json({ received: true });
    }

    const session = event.data.object;

    // Extra safety: don't fulfill an unpaid transaction
    if (session.payment_status !== "paid") {
      return res.status(200).json({ received: true });
    }

    // Retrieve what was actually purchased
    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      { limit: 100 }
    );

    const customer = session.customer_details || {};
    const shipping = session.shipping_details || {};
    const address = shipping.address || {};

    const products = lineItems.data
      .map(item => `${item.description} × ${item.quantity}`)
      .join("\n");

    const money = cents =>
      typeof cents === "number"
        ? `$${(cents / 100).toFixed(2)}`
        : "$0.00";

    const subtotal = money(session.amount_subtotal);
    const discount = money(session.total_details?.amount_discount || 0);
    const shippingCharge = money(
      session.total_details?.amount_shipping || 0
    );
    const tax = money(session.total_details?.amount_tax || 0);
    const total = money(session.amount_total);

    const emailText = `
NEW TERRADIGNUS ORDER

Customer:
${shipping.name || customer.name || "Not provided"}

Email:
${customer.email || "Not provided"}

SHIP TO:
${shipping.name || customer.name || ""}
${address.line1 || ""}
${address.line2 || ""}
${address.city || ""}, ${address.state || ""} ${address.postal_code || ""}
${address.country || ""}

ORDER:
${products}

Subtotal: ${subtotal}
Discount: -${discount}
Shipping charged: ${shippingCharge}
Tax: ${tax}
TOTAL PAID: ${total}

Stripe Payment ID:
${session.payment_intent || "Not available"}

Stripe Checkout Session:
${session.id}
`.trim();

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.ORDER_FROM_EMAIL,
        to: [process.env.ORDER_NOTIFICATION_EMAIL],
        subject: `New TerraDignus Order — ${
          lineItems.data[0]?.description || "New Purchase"
        }`,
        text: emailText
      })
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Order email failed: ${error}`);
    }

    return res.status(200).json({ received: true });

  } catch (err) {
    console.error("Stripe webhook error:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
