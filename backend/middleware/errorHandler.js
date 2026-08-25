export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  let message = err.message || "Server error";

  if (err.name === "CastError") {
    message = "Resource not found";
  }
  if (err.code === 11000) {
    message = "Duplicate field value entered";
  }
  if (err.name === "ValidationError") {
    message = Object.values(err.errors).map((val) => val.message).join(", ");
  }

  res.status(statusCode >= 400 ? statusCode : 500).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
