import express from "express";
import { sendEmail } from "../controllers/general.js";
const generalRouter = express.Router();

generalRouter.post("/send-email", sendEmail);

export default generalRouter;
