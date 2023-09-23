import { StatusCodes } from "http-status-codes";
import { createBadRequestError } from "../errors/BadRequest.js";
import emailSender from "../helpers/email-sender.js";
import { Email } from "../models/index.js";

export const sendEmail = async (req, res) => {
  const text = req.body.heading || "New email for your business";
  const email =
    process.env.NODE_ENV === "development"
      ? process.env.EMAIL
      : "willc@acornauto.org";
  const template = req.body.template;
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
  cons = await Email.create({ email });
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, formEmail, message: "Email created" });
};
