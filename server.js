import express from 'express';
import logger from './logging.config.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for logging requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  
  try {
    res.send(healthcheck);
  } catch (error) {
    logger.error('Health check failed', error);
    res.status(503).send();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
