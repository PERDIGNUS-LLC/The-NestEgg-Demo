// File: api/create-checkout-session.js
import Stripe from "stripe";

// Ensure Node.js runtime
export const config = { runtime: "nodejs" };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { cart, shippingRate } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        // Map frontend cart to Stripe line items
        const line_items = cart.map(item => ({
            price: item.priceId, 
            quantity: item.quantity || 1
        }));

        // Add shipping rate as a separate item
        if (shippingRate && shippingRate.rate) {
            const shippingAmount = Math.round(Number(shippingRate.rate) * 100);
            line_items.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `${shippingRate.carrier} ${shippingRate.service} Shipping`
                    },
                    unit_amount: shippingAmount
                },
                quantity: 1
            });
        }

        // Create Checkout Session with Hardcoded URLs
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items,
            success_url: "https://terradignus.org/success.html",
            cancel_url: "https://terradignus.org/Birds.html",
            shipping_address_collection: { allowed_countries: ["US", "CA"] },
        });

        return res.status(200).json({ url: session.url });

    } catch (err) {
        console.error("Stripe Error:", err.message);
        return res.status(500).json({ error: err.message });
    }
}
