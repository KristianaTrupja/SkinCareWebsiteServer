const express = require("express");
const Rating = require("../model/reviews");
const router = express.Router();

// ✅ Get all reviews for a product
router.get("/:productId", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalReviews = await Rating.countDocuments({ productId: req.params.productId });
    const reviews = await Rating.find({ productId: req.params.productId }).skip(skip).limit(limit);
    
    res.status(200).json({
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: page,
      totalReviews,
      reviews
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Post a new review
router.post("/", async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newReview = new Rating({ productId, rating, comment });
    await newReview.save();

    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error submitting review" });
  }
});

module.exports = router;
