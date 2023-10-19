import express from "express";
import {
  deleteReview,
  getReview,
  updateReview,
  getAllReviews,
  createReview,
} from "../controllers/reviewController.js";
import { validateToken } from "../middlewares/index.js";
const reviewRouter = express.Router();

reviewRouter.route("/").get(getAllReviews).post(createReview);
reviewRouter
  .route("/:reviewId")
  .get(getReview)
  .patch(validateToken, updateReview)
  .delete(validateToken, deleteReview);

export default reviewRouter;
