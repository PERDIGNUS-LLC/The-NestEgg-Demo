import Stripe from "stripe";

export const config = { runtime: "nodejs" };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const REWARDS = new Set(["none", "nestegg", "nuthatch"]);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const amount = Number(req.body?.amount);
    const reward = String(req.body?.reward || "none").toLowerCase();

    if (!Number.isFinite(amount) || amount < 1) {
      return res.status(400).json({ error: "Minimum contribution is $1." });
    }

    if (!REWARDS.has(reward)) {
      return res.status(400).json({ error: "Invalid supporter reward selection." });
    }

    if (reward !== "none" && amount < 10) {
      return res.status(400).json({
        error: "Supporter stickers are available with contributions of $10 or more."
      });
    }

    // Guard against accidental or malicious extreme values.
    if (amount > 10000) {
      return res.status(400).json({ error: "Please contact TerraDignus directly for contributions over $10,000." });
    }

    const cents = Math.round(amount * 100);

    const rewardLabels = {
      none: "No sticker requested",
      nestegg: "NestEgg Supporter Sticker",
      nuthatch: "NutHatch Supporter Sticker"
    };

    const productDescription =
      reward === "none"
        ? "Direct support for TerraDignus research, prototyping, testing, and development."
        : `Direct support for TerraDignus R&D. Includes one exclusive ${rewardLabels[reward]}.`;

    const sessionConfig = {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "TerraDignus R&D Support",
              description: productDescription
            },
            unit_amount: cents
          },
          quantity: 1
        }
      ],
      success_url: "https://terradignus.org/supporter-success.html",
      cancel_url: "https://terradignus.org/#support-rd",
      metadata: {
        purpose: "r_and_d_support",
        supporter_reward: reward,
        supporter_reward_label: rewardLabels[reward],
        support_amount_cents: String(cents)
      }
    };

    // Only collect a mailing address when a physical sticker is requested.
    if (reward !== "none") {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ["US"]
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Support checkout error:", err);
    return res.status(500).json({ error: "Unable to start supporter checkout." });
  }
}
