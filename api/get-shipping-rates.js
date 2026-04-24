console.log("🚀 get-shipping-rates.js EXECUTED");

export const config = {
    runtime: "nodejs"
};

export default async function handler(req, res) {
    // 1. Enable CORS for GitHub Pages
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Respond immediately to CORS preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
    }

    try {
        const rawBody = await getRawBody(req);
        let parsed;

        try {
            parsed = rawBody ? JSON.parse(rawBody) : {};
        } catch (e) {
            return res.status(400).json({ error: 'Invalid JSON body.' });
        }

        const { customerAddress, product } = parsed;
        
        console.log("📦 Incoming Address:", customerAddress);

        if (!customerAddress || !product || !product.size) {
            return res.status(400).json({ error: 'Missing customerAddress or product.size.' });
        }

        const apiKey = process.env.EASYPOST_API_KEY;
        if (!apiKey) {
            throw new Error('EasyPost API key is not configured in Vercel.');
        }

        // 2. TerraDignus Parcel Profile
        const shippingProfiles = {
    NEST_EGG: { 
        weight: 75, // ounces
        length: 8, width: 8, height: 8 
    },
    NEST_EGG_MINI: { 
        weight: 50, // UPDATE THIS with your actual casted weight
        length: 6, width: 6, height: 6 // Update with Mini box dimensions
    }
};

      // Update the lookup logic to handle both names
const productKey = product.size.includes('Mini') ? 'NEST_EGG_MINI' : 'NEST_EGG';
const parcelData = shippingProfiles[productKey] || shippingProfiles.NEST_EGG;

        const fromAddress = {
            street1: '1520 LEFFINGWELL AVE NE',
            city: 'GRAND RAPIDS',
            state: 'MI',
            zip: '49525',
            country: 'US',
            company: 'PERDIGNUS LLC',
            phone: '6167196346'
        };

        // 3. Construct Base Shipment
        const shipmentPayload = {
            to_address: customerAddress,
            from_address: fromAddress,
            parcel: parcelData
        };

        // 4. Inject Customs Data for International (Canadian) Shipments
        if (customerAddress.country && customerAddress.country.toUpperCase() !== 'US') {
            console.log("🍁 International detected. Attaching customs_info...");
            shipmentPayload.customs_info = {
                customs_certify: true,
                customs_signer: 'Nicholas J. Law',
                contents_type: 'merchandise',
                non_delivery_option: 'return',
                restriction_type: 'none',
                customs_items: [{
                    description: 'TerraDignus Unit 01 Prototype',
                    quantity: 1,
                    value: 20.00, // Declared value in USD
                    weight: 75,
                    origin_country: 'US'
                }]
            };
        }

        const response = await fetch('https://api.easypost.com/v2/shipments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`
            },
            body: JSON.stringify({ shipment: shipmentPayload })
        });

        const data = await response.json();

        if (!response.ok) {
            const msg =
                (data && data.error && data.error.message) ||
                (Array.isArray(data?.errors) && data.errors[0]?.message) ||
                'EasyPost API error';
            throw new Error(msg);
        }

        return res.status(200).json(data.rates || []);

    } catch (error) {
        console.error('❌ Function Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}

function getRawBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => resolve(body));
        req.on('error', reject);
    });
}
