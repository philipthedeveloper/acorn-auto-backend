import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide your rating"],
      min: [0, "{PATH} cannot be less than 0. Got {VALUE}"],
      max: [5, "{PATH} cannot be greater than 5. Got {VALUE}"],
    },
    message: {
      type: String,
      required: [true, "Please provide review message"],
      trim: true,
    },
    shopLocation: {
      type: String,
      required: [true, "Please provide shop location"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Reviews", ReviewSchema);
export default Review;
