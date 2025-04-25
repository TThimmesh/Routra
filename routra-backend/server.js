// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Routes
const roadmapRoutes = require('./routes/roadmap');
app.use('/api/roadmap', roadmapRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Routra backend is up!');
});

// Catch-all debug route for undefined paths
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} request to: ${req.originalUrl}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
