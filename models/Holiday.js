import mongoose from "mongoose";

const HolidaySchema = new mongoose.Schema(
  {
    holidayText: {
      type: String,
      required: [true, "Please provide holiday text"],
      trim: true,
    },
    holidayDate: {
      type: Date,
      required: [true, "Please provide holiday date"],
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

const Holiday = mongoose.model("Holiday", HolidaySchema);

export default Holiday;
