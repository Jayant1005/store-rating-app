// backend/middleware/admin.js

module.exports = function (req, res, next) {
  if (req.user.role !== "System Administrator") {
    return res
      .status(403)
      .json({ message: "Access denied. Requires admin role." });
  }
  next();
};
