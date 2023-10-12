import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Please provide job role"],
      trim: true,
    },
    careerLink: {
      type: String,
      required: [true, "Please provide career link"],
    },
    shopLocation: {
      type: String,
      required: [true, "Please provide shop location"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", CareerSchema);
export default Career;
