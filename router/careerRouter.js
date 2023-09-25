import express from "express";
import {
  deleteCareer,
  getCareer,
  updateCareer,
  getAllCareers,
  createCareer,
} from "../controllers/careerController.js";
import { validateToken } from "../middlewares/index.js";
const careerRouter = express.Router();

careerRouter.route("/").get(getAllCareers).post(validateToken, createCareer);
careerRouter
  .route("/:careerId")
  .get(getCareer)
  .patch(validateToken, updateCareer)
  .delete(validateToken, deleteCareer);

export default careerRouter;
