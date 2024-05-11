import InvoiceItem from "../models/InvoiceItemModel.js";
import Review from "../models/ReviewModel.js";
import mongoose from "mongoose";


const createReview = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  const { ratingStar, content } = req.body;

  try {
    // Check if the user has purchased the course
    const hasPurchased = await InvoiceItem.findOne({ courseId }).populate({
      path: "invoiceId",
      match: { userId: new mongoose.Types.ObjectId(userId) },
    });

    if (!hasPurchased || !hasPurchased.invoiceId) {
      return res
        .status(403)
        .json({ message: "You must purchase the course to review it." });
    }

    // Check if the user has already reviewed this course
    const alreadyReviewed = await Review.findOne({ userId, courseId });
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this course." });
    }

    // Create the review
    const review = new Review({
      userId,
      courseId,
      ratingStar,
      content,
    });

    await review.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
  }
};

const getReviewCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const reviews = await Review.find({ courseId }).populate({
      path: "userId",
      select: "name", // Giả sử bạn muốn hiển thị tên của người dùng đánh giá, điều chỉnh các trường cần lấy theo nhu cầu
    });

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this course." });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve reviews", error: error.message });
  }
};

export { createReview,getReviewCourse };
