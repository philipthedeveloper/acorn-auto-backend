import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    contentType: {
      type: String,
      enum: {
        values: ["para", "heading"],
        message: "Invalid {PATH} of {VALUE}",
      },
      required: [true, "Please provide content type"],
      trim: true,
    },
    index: {
      type: Number,
      required: [true, "Please provide content index"],
    },
    content: {
      type: String,
      required: [true, "Please provide page content"],
    },
  },
  { timestamps: true }
);

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide news title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please provide news author"],
      trim: true,
    },
    imgUrl: {
      type: String,
      required: [true, "Please provide news image url"],
      trim: true,
    },
    contents: {
      type: [ContentSchema],
      default: undefined,
      required: [true, "Must provide news contents"],
    },
    shopLocation: {
      type: String,
      required: [true, "Please provide shop location"],
      trim: true,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", NewsSchema);
export default News;
