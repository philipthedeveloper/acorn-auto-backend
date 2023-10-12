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

const AboutPageSchema = new mongoose.Schema(
  {
    contents: {
      type: [ContentSchema],
      default: undefined,
      required: [true, "Please provide page contents"],
    },
  },
  { timestamps: true }
);

const AboutPage = mongoose.model("AboutPage", AboutPageSchema);
export default AboutPage;
