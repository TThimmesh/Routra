// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Enable CORS for all routes
app.use(cors());

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ Main route for roadmap generation
const roadmapRoutes = require('./routes/roadmap');
app.use('/api/roadmap', roadmapRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Routra backend is up!');
});

// ✅ Catch-all debug route for undefined paths
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} request to: ${req.originalUrl}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
