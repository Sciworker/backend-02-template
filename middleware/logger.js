module.exports = (req, res, next) => {
    console.log(`Request to ${req.originalUrl}`);
    next();
  };