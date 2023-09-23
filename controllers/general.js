import { StatusCodes } from "http-status-codes";
import { createBadRequestError } from "../errors/BadRequest.js";
import emailSender from "../helpers/email-sender.js";
import { Email } from "../models/index.js";
import { createNotFoundError } from "../errors/NotFound.js";

export const sendEmail = async (req, res) => {
  const text = req.body.heading || "New email for your business";
  const template = req.body.template;
  const formEmail = await Email.find({});
  const submissionEmail = formEmail[0]?.email;
  const email =
    process.env.NODE_ENV === "development"
      ? process.env.EMAIL
      : template === "contact"
      ? "willc@acornauto.org"
      : submissionEmail;
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
    .json({ success: true, formEmail, message: "Updated Successfully." });
};
