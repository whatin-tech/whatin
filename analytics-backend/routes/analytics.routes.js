const express = require('express');
const router = express.Router();
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// Google Analytics Client initialize karein
const analyticsClient = new BetaAnalyticsDataClient({
    keyFilename: './analytics-key.json', // Path to your credentials JSON file
});

const PROPERTY_ID = '500812224'; // Aapki GA4 Property ID

/**
 * @route   GET /api/live-traffic
 * @desc    Fetch real-time active users from Google Analytics 4
 * @access  Public
 */
router.get('/live-traffic', async (req, res) => {
    try {
        const [response] = await analyticsClient.runRealtimeReport({
            property: `properties/${PROPERTY_ID}`,
            dimensions: [{ name: 'country' }],
            metrics: [{ name: 'activeUsers' }],
        });

        let totalActiveUsers = 0;
        const countryWiseBreakdown = [];

        // Response rows traverse karke data structure ready karein
        if (response.rows && response.rows.length > 0) {
            response.rows.forEach(row => {
                const country = row.dimensionValues[0].value;
                const activeUsers = parseInt(row.metricValues[0].value, 10);
                
                totalActiveUsers += activeUsers;
                countryWiseBreakdown.push({ country, activeUsers });
            });
        }

        // Standard JSON response send karein
        return res.status(200).json({
            success: true,
            data: {
                activeUsers: totalActiveUsers,
                breakdown: countryWiseBreakdown,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error("Google Analytics Realtime API Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch live analytics data.",
            error: error.message
        });
    }
});

module.exports = router;
