import express from "express";
import {
  sendEmail,
  createEmail,
  updateEmail,
  createHoliday,
  updateHoliday,
  getHoliday,
} from "../controllers/general.js";
import validateToken from "../middlewares/validate-jwt.js";
const generalRouter = express.Router();

generalRouter.post("/send-email", sendEmail);
generalRouter.post("/create-email", validateToken, createEmail);
generalRouter.post("/update-email/:emailId", validateToken, updateEmail);
generalRouter.get("/get-holiday", getHoliday);
generalRouter.post("/create-holiday", validateToken, createHoliday);
generalRouter.post("/update-holiday/:holidayId", validateToken, updateHoliday);

export default generalRouter;
