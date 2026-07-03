const express = require('express');
const cors = require('cors');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();

// Middlewares
app.use(cors()); // Isse frontend safely data fetch kar payega (CORS error nahi aayegi)
app.use(express.json());

// Routes Integration
app.use('/api', analyticsRoutes);

// Base Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Whatin Analytics Server is running smoothly." });
});

// Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Analytics Server running on port http://localhost:${PORT}`);
});
