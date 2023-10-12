import { StatusCodes } from "http-status-codes";
import AboutPage from "../models/About.js";
import {
  checkEmptyRequestBody,
  sendSuccessResponse,
  throwRequestError,
} from "../helpers/index.js";
import * as ERROR_TYPE from "../helpers/errorTypes.js";

export const getAboutPage = async (req, res) => {
  const aboutPage = await AboutPage.findOne({});
  return sendSuccessResponse(res, { aboutPage, message: "Successful" });
};

export const createAboutPage = async (req, res) => {
  const isBodyEmpty = checkEmptyRequestBody(req.body);
  if (isBodyEmpty)
    throwRequestError(ERROR_TYPE.BAD_REQUEST, "Please provide request data");
  const aboutPage = await AboutPage.create(req.body);
  return sendSuccessResponse(res, {
    aboutPage,
    message: "Page created successfully",
  });
};

export const updateAboutPage = async (req, res) => {
  const { pageId } = req.params;
  if (!req.body.contents)
    throwRequestError(
      ERROR_TYPE.UNPROCESSABLE_ENTITY,
      "No page content provided"
    );
  const isBodyEmpty = checkEmptyRequestBody(req.body);
  if (isBodyEmpty)
    throwRequestError(ERROR_TYPE.BAD_REQUEST, "Please provide request data");
  const aboutPage = await AboutPage.findById(pageId);
  if (!aboutPage) throwRequestError(ERROR_TYPE.NOT_FOUND, "Page not found!");
  aboutPage.contents = req.body.contents;
  await aboutPage.save();
  return sendSuccessResponse(res, {
    aboutPage,
    message: "Page updated successfully",
  });
};
