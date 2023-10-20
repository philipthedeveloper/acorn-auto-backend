import {
  checkEmptyRequestBody,
  sendSuccessResponse,
  throwRequestError,
} from "../helpers/index.js";
import { News } from "../models/index.js";
import * as ERROR_TYPES from "../helpers/errorTypes.js";
export const getAllNews = async (req, res) => {
  const { shopLocation, sort } = req.query;
  let queryObject = {};
  if (shopLocation) {
    queryObject.shopLocation = shopLocation;
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const news = News.find(queryObject).limit(limit).skip(skip);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    news = news.sort(sortList);
  } else {
    news = news.sort("createdAt");
  }

  return sendSuccessResponse(res, { news, nbHits: news.length });
};

export const getNews = async (req, res) => {
  const { newsId } = req.params;
  const news = await News.findById(newsId);
  if (!news) throwRequestError(ERROR_TYPES.NOT_FOUND, "Resource not found.");
  return sendSuccessResponse(res, { news, message: "Resource found" });
};

export const createNews = async (req, res) => {
  const isBodyEmpty = checkEmptyRequestBody(req.body);
  if (isBodyEmpty)
    throwRequestError(ERROR_TYPES.BAD_REQUEST, "Please provide news data");
  const news = await News.create(req.body);
  return sendSuccessResponse(res, { news, message: "News added" });
};

export const updateNews = async (req, res) => {
  const data = req.body;
  const { newsId } = req.params;
  const isBodyEmpty = checkEmptyRequestBody(data);
  if (isBodyEmpty)
    throwRequestError(ERROR_TYPES.BAD_REQUEST, "Please provide news data");
  const news = await News.findByIdAndUpdate(newsId, data, { new: true });
  if (!news) throwRequestError(ERROR_TYPES.NOT_FOUND, "News not found");
  return sendSuccessResponse(res, { news, message: "Update Successfully" });
};

export const deleteNews = async (req, res) => {
  const { newsId } = req.params;
  const news = await News.findByIdAndDelete(newsId);
  if (!news) throwRequestError(ERROR_TYPES.NOT_FOUND, "News not found");
  return sendSuccessResponse(res, { news, message: "Deleted Successfully" });
};
