const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

/**
 * Express application setup
 */
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'https://test-frontend-qw3f.vercel.app',
  'http://localhost:5173',
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // only if you're using cookies or Authorization headers
};

app.use(cors(corsOptions));


// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/todos', todoRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;