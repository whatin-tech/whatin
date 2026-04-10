module.exports = async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const url = "https://jooble.org/api/";
    
    // Server-side: The API key is hidden from the client browser
    // For even better security, you could use process.env.JOOBLE_API_KEY in Vercel.
    const key = "fc22a1fc-b330-43ce-aa52-fcba8a5f3307"; 
    
    // Get search parameters from frontend request
    const params = req.body || { keywords: 'it', location: 'India' };

    try {
        const fetch = (await import('node-fetch')).default || globalThis.fetch;
        
        const response = await fetch(url + key, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });

        const data = await response.json();
        
        // Return Jooble data securely to the frontend
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ error: 'Failed to fetch job data.' });
    }
}
