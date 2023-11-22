const errorLogger = (err, req, res, next) => {
  console.error(err);
  next(err); // pass to errorResponder
};

const errorResponder = (err, req, res, next) => {
  res.header("Content-Type", "application/json");
  res
    .status(err.statusCode || 500)
    .json({
      success: false,
      status: err.statusCode,
      message: err.message || "Server error",
    });
};

module.exports = { errorLogger, errorResponder };
