import Stripe from "stripe";

export const config = { runtime: "nodejs" };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // 1. Correct Vercel-native CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // 2. Handle the Preflight Request (The CORS check)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { cart, shippingRate } = req.body;

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const line_items = cart.map(item => ({
            price: item.priceId, 
            quantity: item.quantity || 1
        }));

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

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items,
            success_url: "https://terradignus.org/success.html",
            cancel_url: "https://terradignus.org/Birds.html",
            shipping_address_collection: { allowed_countries: ["US", "CA"] },
        });

        // 3. Successful response
        return res.status(200).json({ url: session.url });

    } catch (err) {
        console.error("Stripe Error:", err.message);
        return res.status(500).json({ error: err.message });
    }
}
