import express from "express";
import { sendEmail, createEmail, updateEmail } from "../controllers/general.js";
import validateToken from "../middlewares/validate-jwt.js";
const generalRouter = express.Router();

generalRouter.post("/send-email", sendEmail);
generalRouter.post("/create-email", validateToken, createEmail);
generalRouter.post("/update-email/:emailId", validateToken, updateEmail);

export default generalRouter;
