export const notFoundError = (req, res, next) => {
  res.status(404);
  const error = new Error(` Not Found - ${req.originalUrl}`);
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const handleError = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
