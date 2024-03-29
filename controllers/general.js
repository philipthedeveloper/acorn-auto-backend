import { StatusCodes } from "http-status-codes";
import { createBadRequestError, createNotFoundError } from "../errors/index.js";
import emailSender from "../helpers/email-sender.js";
import { Email, Holiday } from "../models/index.js";

export const sendEmail = async (req, res) => {
  const text = req.body.heading || "New email for your business";
  const template = req.body.template;
  const formEmail = await Email.find({});
  const submissionEmail = formEmail[0]?.email;
  const email =
    process.env.NODE_ENV === "development"
      ? process.env.EMAIL
      : template === "job"
      ? submissionEmail
      : req.body.submissionEmail;
  console.log(text, email, template, req.body, req.files);
  await emailSender({
    email,
    data: req.body,
    files: req.files || [],
    template,
    text,
    res,
  });
};

export const createEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) throw createBadRequestError("Please provide email");
  const formEmail = await Email.create({ email });
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, formEmail, message: "Email created" });
};

export const updateEmail = async (req, res) => {
  const { email } = req.body;
  const { emailId } = req.params;
  if (!email) throw createBadRequestError("Please provide email");
  const formEmail = await Email.findByIdAndUpdate(
    emailId,
    { email },
    { new: true }
  );
  if (!formEmail) throw createNotFoundError("Email not found...");
  return res
    .status(StatusCodes.OK)
    .json({ success: true, formEmail, message: "Updated Successfully" });
};

export const getHoliday = async (req, res) => {
  let holiday;
  const { type, shopLocation } = req.query;
  let queryObject = {};
  if (type && type === "active") {
    const today = new Date();
    queryObject.holidayDate = { $gte: today };
    // holiday = await Holiday.find({ holidayDate: { $gte: today } });
  }
  if (shopLocation) {
    queryObject.shopLocation = shopLocation;
  }
  holiday = await Holiday.findOne(queryObject);
  return res.status(StatusCodes.OK).json({ success: true, holiday: holiday });
};

export const createHoliday = async (req, res) => {
  const { holidayText, holidayDate } = req.body;
  if (!holidayText || !holidayDate)
    throw createBadRequestError("Please provide holiday data");
  const holiday = await Holiday.create(req.body);
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, holiday, message: "Holiday created" });
};

export const updateHoliday = async (req, res) => {
  const data = req.body;
  const { holidayId } = req.params;
  const numOfKeys = Object.keys(data).length;
  if (numOfKeys === 0)
    throw createBadRequestError("Please provide holiday data");
  const holiday = await Holiday.findByIdAndUpdate(holidayId, data, {
    new: true,
  });
  if (!holiday) throw createNotFoundError("Holiday not found");
  return res
    .status(StatusCodes.OK)
    .json({ success: true, holiday, message: "Update Successfully" });
};
