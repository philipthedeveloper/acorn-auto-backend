import {
  checkEmptyRequestBody,
  sendSuccessResponse,
  throwRequestError,
} from "../helpers/index.js";
import { Review } from "../models/index.js";
import * as ERROR_TYPES from "../helpers/errorTypes.js";

export const getAllReviews = async (req, res) => {
  const { shopLocation } = req.query;
  let queryObject = {};
  if (shopLocation) {
    queryObject.shopLocation = shopLocation;
  }
  const reviews = await Review.find(queryObject);
  return sendSuccessResponse(res, { reviews, nbHits: reviews.length });
};

export const getReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) throwRequestError(ERROR_TYPES.NOT_FOUND, "Resource not found.");
  return sendSuccessResponse(res, { review, message: "Resource found" });
};

export const createReview = async (req, res) => {
  const isBodyEmpty = checkEmptyRequestBody(req.body);
  if (isBodyEmpty)
    throwRequestError(ERROR_TYPES.BAD_REQUEST, "Please provide review data");
  const review = await Review.create(req.body);
  return sendSuccessResponse(res, { review, message: "Review added" });
};

export const updateReview = async (req, res) => {
  const data = req.body;
  const { reviewId } = req.params;
  const isBodyEmpty = checkEmptyRequestBody(data);
  if (isBodyEmpty)
    throwRequestError(ERROR_TYPES.BAD_REQUEST, "Please provide review data");
  const review = await Review.findByIdAndUpdate(reviewId, data, { new: true });
  if (!review) throwRequestError(ERROR_TYPES.NOT_FOUND, "Review not found");
  return sendSuccessResponse(res, { review, message: "Update Successfully" });
};

export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) throwRequestError(ERROR_TYPES.NOT_FOUND, "Review not found");
  return sendSuccessResponse(res, { review, message: "Deleted Successfully" });
};
