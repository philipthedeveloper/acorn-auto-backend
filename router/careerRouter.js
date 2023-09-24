import express from "express";
import {
  deleteCareer,
  getCareer,
  updateCareer,
  getAllCareers,
  createCareer,
} from "../controllers/careerController.js";
const careerRouter = express.Router();

careerRouter.route("/").get(getAllCareers).post(createCareer);
careerRouter
  .route("/:careerId")
  .get(getCareer)
  .patch(updateCareer)
  .delete(deleteCareer);

export default careerRouter;
