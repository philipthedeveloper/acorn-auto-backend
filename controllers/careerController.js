import { Career } from "../models/index.js";
import { createBadRequestError, createNotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

export const createCareer = async (req, res) => {
  const data = req.body;
  const numOfKeys = Object.keys(data).length;
  if (numOfKeys === 0 || !data)
    throw createBadRequestError("Please provide career data");
  const career = await Career.create(data);
  return res
    .status(StatusCodes.CREATED)
    .json({ success: true, career, message: "Career added" });
};

export const getAllCareers = async (req, res) => {
  const { shopLocation } = req.query;
  let queryObject = {};
  if (shopLocation) {
    queryObject.shopLocation = shopLocation;
  }
  const careers = await Career.find(queryObject);
  return res
    .status(StatusCodes.OK)
    .json({ success: true, careers, nbHits: careers.length });
};

export const getCareer = async (req, res) => {
  const { careerId } = req.params;
  const career = await Career.findById(careerId);
  if (!career) throw createNotFoundError("Career not found");
  return res
    .status(StatusCodes.OK)
    .json({ success: true, career, message: "Found" });
};

export const updateCareer = async (req, res) => {
  const data = req.body;
  const { careerId } = req.params;
  const numOfKeys = Object.keys(data).length;
  if (numOfKeys === 0)
    throw createBadRequestError("Please provide career data");
  const career = await Career.findByIdAndUpdate(careerId, data, { new: true });
  if (!career) throw createNotFoundError("Career not found");
  return res
    .status(StatusCodes.OK)
    .json({ success: true, career, message: "Update Successfully" });
};

export const deleteCareer = async (req, res) => {
  const { careerId } = req.params;
  const career = await Career.findByIdAndDelete(careerId);
  if (!career) throw createNotFoundError("Career not found");
  return res
    .status(StatusCodes.OK)
    .json({ success: true, career, message: "Deleted Successfully" });
};
