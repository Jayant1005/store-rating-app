// backend/middleware/owner.js

module.exports = function (req, res, next) {
  if (req.user.role !== "Store Owner") {
    return res
      .status(403)
      .json({ message: "Access denied. Requires store owner role." });
  }
  next();
};
