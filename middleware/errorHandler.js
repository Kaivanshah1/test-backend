/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  // Default error response
  let error = {
    success: false,
    error: 'Internal server error',
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error.error = 'Validation error';
  } else if (err.name === 'CastError') {
    error.error = 'Invalid ID format';
  }

  // Send error response
  res.status(err.statusCode || 500).json(error);
};

module.exports = errorHandler;