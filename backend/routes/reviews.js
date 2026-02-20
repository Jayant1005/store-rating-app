const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const verifyToken = require("../middleware/verifyToken");
const roleGuard = require("../middleware/roleGuard");

// Posting reviews
router.post("/:storeId", verifyToken, reviewController.postReview);

// Upvoting a review
router.post("/:id/upvote", verifyToken, reviewController.upvoteReview);

// Owner replying to a review
router.post("/:id/reply", verifyToken, roleGuard(["Store Owner"]), reviewController.replyToReview);

module.exports = router;
